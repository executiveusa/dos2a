import mysql, { type Pool, type PoolConnection, type RowDataPacket } from "mysql2/promise";
import { RATE_LIMIT_PER_HOUR, type LeadStore, type PersistResult, type StoredLead } from "./core";

type ExistingRow = RowDataPacket & {
  id: string | number;
  request_id: string;
  payload_hash: string;
  email_sent: number;
  email_error: string | null;
};

type CountRow = RowDataPacket & { total: number };

export class BackendNotConfiguredError extends Error {}

function required(name: string) {
  const value = process.env[name];
  if (!value) throw new BackendNotConfiguredError(name);
  return value;
}

export function createMysqlPool(): Pool {
  return mysql.createPool({
    host: required("DB_HOST"),
    port: Number(process.env.DB_PORT || "3306"),
    database: required("DB_NAME"),
    user: required("DB_USER"),
    password: required("DB_PASSWORD"),
    connectionLimit: 5,
    charset: "utf8mb4",
    timezone: "Z",
  });
}

async function rollbackQuietly(connection: PoolConnection) {
  try { await connection.rollback(); } catch { /* no-op */ }
}

export class MysqlLeadStore implements LeadStore {
  constructor(private readonly pool: Pool) {}

  async persist(lead: StoredLead): Promise<PersistResult> {
    const connection = await this.pool.getConnection();
    try {
      await connection.beginTransaction();
      const [existingRows] = await connection.execute<ExistingRow[]>(
        "SELECT id, request_id, payload_hash, email_sent, email_error FROM leads WHERE idempotency_key = ? FOR UPDATE",
        [lead.idempotencyKey],
      );
      const existing = existingRows[0];
      if (existing) {
        await connection.commit();
        if (existing.payload_hash !== lead.payloadHash) return { kind: "conflict" };
        return {
          kind: "duplicate",
          leadId: existing.id,
          requestId: existing.request_id,
          emailSent: Boolean(existing.email_sent),
          ...(existing.email_error ? { emailError: existing.email_error } : {}),
        };
      }

      if (lead.ipHash) {
        const [counts] = await connection.execute<CountRow[]>(
          "SELECT COUNT(*) AS total FROM leads WHERE ip_hash = ? AND created_at >= UTC_TIMESTAMP() - INTERVAL 1 HOUR",
          [lead.ipHash],
        );
        if (Number(counts[0]?.total || 0) >= RATE_LIMIT_PER_HOUR) {
          await connection.rollback();
          return { kind: "rate_limited" };
        }
      }

      try {
        const [result] = await connection.execute<mysql.ResultSetHeader>(
          `INSERT INTO leads
            (request_id, idempotency_key, payload_hash, name, email, phone, company, event_type,
             event_date, location, guests, needs, locale, ip_hash, email_sent, email_error)
           VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 0, NULL)`,
          [
            lead.requestId, lead.idempotencyKey, lead.payloadHash, lead.name, lead.email,
            lead.phone || null, lead.company || null, lead.eventType, lead.eventDate || null,
            lead.location, lead.guestCount == null ? null : String(lead.guestCount), lead.needs,
            lead.locale, lead.ipHash || null,
          ],
        );
        await connection.commit();
        return { kind: "created", leadId: result.insertId };
      } catch (error) {
        if ((error as { code?: string }).code !== "ER_DUP_ENTRY") throw error;
        await rollbackQuietly(connection);
        const [racedRows] = await this.pool.execute<ExistingRow[]>(
          "SELECT id, request_id, payload_hash, email_sent, email_error FROM leads WHERE idempotency_key = ?",
          [lead.idempotencyKey],
        );
        const raced = racedRows[0];
        if (!raced || raced.payload_hash !== lead.payloadHash) return { kind: "conflict" };
        return {
          kind: "duplicate",
          leadId: raced.id,
          requestId: raced.request_id,
          emailSent: Boolean(raced.email_sent),
          ...(raced.email_error ? { emailError: raced.email_error } : {}),
        };
      }
    } catch (error) {
      await rollbackQuietly(connection);
      throw error;
    } finally {
      connection.release();
    }
  }

  async updateEmailResult(leadId: string | number, sent: boolean, error?: string) {
    await this.pool.execute(
      "UPDATE leads SET email_sent = ?, email_error = ? WHERE id = ?",
      [sent ? 1 : 0, error || null, leadId],
    );
  }
}
