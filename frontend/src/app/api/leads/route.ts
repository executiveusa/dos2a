import { handleLeadRequest } from "@/lib/lead-intake/core";
import { BackendNotConfiguredError, createMysqlPool, MysqlLeadStore } from "@/lib/lead-intake/mysql-store";
import { SmtpLeadMailer } from "@/lib/lead-intake/smtp-mailer";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// Rollback: keep the existing Supabase dosa-lead-intake function as the endpoint until cutover is verified.
export async function POST(request: Request) {
  try {
    const pool = createMysqlPool();
    const result = await handleLeadRequest(request, { store: new MysqlLeadStore(pool), mailer: new SmtpLeadMailer() });
    await pool.end();
    return Response.json(result.body, { status: result.status, headers: { "cache-control": "no-store" } });
  } catch (error) {
    if (error instanceof BackendNotConfiguredError) {
      return Response.json({ error: "backend_not_configured" }, { status: 503, headers: { "cache-control": "no-store" } });
    }
    return Response.json({ error: "persistence_failed" }, { status: 500, headers: { "cache-control": "no-store" } });
  }
}
