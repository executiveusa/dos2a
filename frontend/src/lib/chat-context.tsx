"use client";

import { createContext, useContext, useState, useCallback, type ReactNode } from "react";

// --- Types ---

export type Provider = "openai" | "anthropic" | "google" | "groq" | "openrouter" | "ollama";

export interface ProviderConfig {
  provider: Provider;
  apiKey: string;
  baseUrl?: string;
  model: string;
}

export interface Message {
  id: string;
  role: "user" | "assistant" | "system" | "tool";
  content: string;
  toolCall?: { name: string; args: Record<string, unknown>; result?: string };
  timestamp: number;
}

export interface Conversation {
  id: string;
  title: string;
  messages: Message[];
  agentId?: string;
  createdAt: number;
  updatedAt: number;
}

export interface AgentDef {
  id: string;
  name: string;
  description: string;
  systemPrompt: string;
  tools: string[];
  icon: string;
  color: string;
}

// --- Built-in Agents ---

export const AGENTS: AgentDef[] = [
  {
    id: "general",
    name: "DOS2A Chat",
    description: "Asistente general — pregunta cualquier cosa",
    systemPrompt: `Eres el asistente de DOS2A, una empresa de audio, iluminación y producción audiovisual en Ciudad de México. Responde en español por defecto. Sé directo, profesional y cálido. Nunca uses lenguaje corporativo vacío.`,
    tools: ["quote", "search", "booking"],
    icon: "🎛️",
    color: "#d4af37",
  },
  {
    id: "quote",
    name: "Cotizador",
    description: "Genera cotizaciones de audio e iluminación",
    systemPrompt: `Eres el agente de cotizaciones de DOS2A. Tu trabajo es generar cotizaciones detalladas para eventos. Siempre pregunta: tipo de evento, fecha, ubicación, número de asistentes, necesidades específicas. Responde con precios reales basados en el equipo disponible. Formato: lista de equipo + precio unitario + total.`,
    tools: ["quote", "booking"],
    icon: "💰",
    color: "#d4af37",
  },
  {
    id: "audio",
    name: "Audio",
    description: "Especialista en sistemas de sonido",
    systemPrompt: `Eres el ingeniero de audio de DOS2A. Diseñas sistemas de sonido para eventos. Recomiendas equipo específico basado en el tamaño del venue, número de asistentes, y tipo de evento. Conoces marcas: JBL, QSC, EV, Shure, Sennheiser. Siempre piensa en cobertura, claridad y potencia.`,
    tools: ["search"],
    icon: "🔊",
    color: "#38bdf8",
  },
  {
    id: "lighting",
    name: "Iluminación",
    description: "Diseño de iluminación escénica",
    systemPrompt: `Eres el diseñador de iluminación de DOS2A. Creas planos de iluminación para eventos. Recomiendas equipo: moving heads, wash lights, par cans, barras LED. Siempre piensas en ambiente, temperatura de color, y sincronización con la música.`,
    tools: ["search"],
    icon: "💡",
    color: "#d4af37",
  },
  {
    id: "content",
    name: "Contenido",
    description: "Genera copy, posts y marketing",
    systemPrompt: `Eres el creador de contenido de DOS2A. Generas copy para Instagram, WhatsApp marketing, y textos de la web. TODO en español mexicano natural. Aplica el skill humanizer: nunca uses lenguaje de IA, nunca em dashes excesivos, nunca "en el ámbito de". Sé directo, con personalidad.`,
    tools: ["search"],
    icon: "✍️",
    color: "#38bdf8",
  },
  {
    id: "course",
    name: "Explainer",
    description: "Convierte código en cursos interactivos",
    systemPrompt: `Eres el agente educativo de DOS2A. Tu trabajo es explicar cómo funciona la app y generar cursos interactivos. Usa el skill codebase-to-course: analiza el código, identifica actores principales, y genera módulos con diagramas animados, quizzes, y traducciones código-a-español. El público son vibe coders que construyen con IA pero quieren entender el código.`,
    tools: ["search"],
    icon: "🎓",
    color: "#38bdf8",
  },
];

// --- Provider helpers ---

const PROVIDER_URLS: Record<Provider, string> = {
  openai: "https://api.openai.com/v1",
  anthropic: "https://api.anthropic.com/v1",
  google: "https://generativelanguage.googleapis.com/v1beta",
  groq: "https://api.groq.com/openai/v1",
  openrouter: "https://openrouter.ai/api/v1",
  ollama: "http://localhost:11434/v1",
};

export function detectProvider(model: string): Provider {
  if (model.startsWith("gpt-") || model.startsWith("o1") || model.startsWith("o3") || model.startsWith("o4")) return "openai";
  if (model.startsWith("claude-")) return "anthropic";
  if (model.startsWith("gemini-")) return "google";
  if (model.startsWith("llama") || model.startsWith("mixtral")) return "groq";
  if (model.startsWith("openrouter/")) return "openrouter";
  if (model.startsWith("ollama/")) return "ollama";
  return "openrouter"; // fallback
}

export function getBaseUrl(provider: Provider, custom?: string): string {
  return custom || PROVIDER_URLS[provider];
}

// --- Storage ---

const STORAGE_KEY_CONVERSATIONS = "dos2a-conversations";
const STORAGE_KEY_PROVIDER = "dos2a-provider";

function loadConversations(): Conversation[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY_CONVERSATIONS);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveConversations(conversations: Conversation[]) {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY_CONVERSATIONS, JSON.stringify(conversations));
}

export function loadProviderConfig(): ProviderConfig | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(STORAGE_KEY_PROVIDER);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function saveProviderConfig(config: ProviderConfig) {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY_PROVIDER, JSON.stringify(config));
}

// --- Context ---

interface ChatContextValue {
  conversations: Conversation[];
  activeConversation: Conversation | null;
  activeAgent: AgentDef;
  providerConfig: ProviderConfig | null;
  isStreaming: boolean;
  setActiveConversation: (id: string | null) => void;
  setActiveAgent: (agentId: string) => void;
  setProviderConfig: (config: ProviderConfig) => void;
  createConversation: (agentId?: string) => string;
  sendMessage: (content: string) => Promise<void>;
  deleteConversation: (id: string) => void;
}

const ChatContext = createContext<ChatContextValue | null>(null);

export function useChatContext() {
  const ctx = useContext(ChatContext);
  if (!ctx) throw new Error("useChatContext must be used inside ChatProvider");
  return ctx;
}

// --- Provider ---

export function ChatProvider({ children }: { children: ReactNode }) {
  const [conversations, setConversations] = useState<Conversation[]>(() => loadConversations());
  const [activeId, setActiveId] = useState<string | null>(null);
  const [activeAgentId, setActiveAgentId] = useState("general");
  const [providerConfig, setProviderConfigState] = useState<ProviderConfig | null>(() => loadProviderConfig());
  const [isStreaming, setIsStreaming] = useState(false);

  const activeConversation = conversations.find((c) => c.id === activeId) ?? null;
  const activeAgent = AGENTS.find((a) => a.id === activeAgentId) ?? AGENTS[0];

  const persist = useCallback((convos: Conversation[]) => {
    setConversations(convos);
    saveConversations(convos);
  }, []);

  const setProviderConfig = useCallback((config: ProviderConfig) => {
    setProviderConfigState(config);
    saveProviderConfig(config);
  }, []);

  const createConversation = useCallback(
    (agentId?: string) => {
      const id = crypto.randomUUID();
      const agent = AGENTS.find((a) => a.id === (agentId ?? activeAgentId)) ?? AGENTS[0];
      const newConvo: Conversation = {
        id,
        title: `${agent.name} — ${new Date().toLocaleDateString("es-MX")}`,
        messages: [],
        agentId: agent.id,
        createdAt: Date.now(),
        updatedAt: Date.now(),
      };
      persist([newConvo, ...conversations]);
      setActiveId(id);
      if (agentId) setActiveAgentId(agentId);
      return id;
    },
    [conversations, activeAgentId, persist]
  );

  const deleteConversation = useCallback(
    (id: string) => {
      const updated = conversations.filter((c) => c.id !== id);
      persist(updated);
      if (activeId === id) setActiveId(updated[0]?.id ?? null);
    },
    [conversations, activeId, persist]
  );

  const setActiveConversation = useCallback((id: string | null) => {
    setActiveId(id);
    if (id) {
      const convo = conversations.find((c) => c.id === id);
      if (convo?.agentId) setActiveAgentId(convo.agentId);
    }
  }, [conversations]);

  const setActiveAgent = useCallback((agentId: string) => {
    setActiveAgentId(agentId);
  }, []);

  // --- Send message & stream response ---
  const sendMessage = useCallback(
    async (content: string) => {
      if (!providerConfig) return;
      if (isStreaming) return;

      let convoId = activeId;
      let currentConvos = conversations;

      // Auto-create conversation if none active
      if (!convoId) {
        convoId = crypto.randomUUID();
        const agent = AGENTS.find((a) => a.id === activeAgentId) ?? AGENTS[0];
        const newConvo: Conversation = {
          id: convoId,
          title: content.slice(0, 60),
          messages: [],
          agentId: agent.id,
          createdAt: Date.now(),
          updatedAt: Date.now(),
        };
        currentConvos = [newConvo, ...currentConvos];
        setActiveId(convoId);
      }

      const userMsg: Message = {
        id: crypto.randomUUID(),
        role: "user",
        content,
        timestamp: Date.now(),
      };

      const assistantMsg: Message = {
        id: crypto.randomUUID(),
        role: "assistant",
        content: "",
        timestamp: Date.now(),
      };

      // Add user message + empty assistant message
      const addMsg = (convos: Conversation[]) =>
        convos.map((c) =>
          c.id === convoId
            ? { ...c, messages: [...c.messages, userMsg, assistantMsg], updatedAt: Date.now() }
            : c
        );

      currentConvos = addMsg(currentConvos);
      persist(currentConvos);
      setIsStreaming(true);

      try {
        const agent = AGENTS.find((a) => a.id === activeAgentId) ?? AGENTS[0];
        const { provider, apiKey, baseUrl, model } = providerConfig;
        const url = getBaseUrl(provider, baseUrl);

        // Build messages for API
        const apiMessages = [
          { role: "system" as const, content: agent.systemPrompt },
          ...currentConvos
            .find((c) => c.id === convoId)!
            .messages.filter((m) => m.role !== "system" && m.id !== assistantMsg.id)
            .map((m) => ({ role: m.role as "user" | "assistant", content: m.content })),
        ];

        // Handle Anthropic differently
        if (provider === "anthropic") {
          const resp = await fetch(`${url}/messages`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "x-api-key": apiKey,
              "anthropic-version": "2023-06-01",
              "anthropic-dangerous-direct-browser-access": "true",
            },
            body: JSON.stringify({
              model,
              max_tokens: 4096,
              system: agent.systemPrompt,
              messages: apiMessages.filter((m) => m.role !== "system"),
              stream: true,
            }),
          });

          const reader = resp.body?.getReader();
          const decoder = new TextDecoder();
          let accumulated = "";

          if (reader) {
            while (true) {
              const { done, value } = await reader.read();
              if (done) break;
              const chunk = decoder.decode(value, { stream: true });
              const lines = chunk.split("\n");
              for (const line of lines) {
                if (line.startsWith("data: ")) {
                  const data = line.slice(6);
                  if (data === "[DONE]") break;
                  try {
                    const parsed = JSON.parse(data);
                    if (parsed.type === "content_block_delta" && parsed.delta?.text) {
                      accumulated += parsed.delta.text;
                      const updated = currentConvos.map((c) =>
                        c.id === convoId
                          ? {
                              ...c,
                              messages: c.messages.map((m) =>
                                m.id === assistantMsg.id ? { ...m, content: accumulated } : m
                              ),
                            }
                          : c
                      );
                      currentConvos = updated;
                      setConversations(updated);
                    }
                  } catch {}
                }
              }
            }
          }
        } else {
          // OpenAI-compatible (OpenAI, Groq, OpenRouter, Ollama, Google via proxy)
          const resp = await fetch(`${url}/chat/completions`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${apiKey}`,
            },
            body: JSON.stringify({
              model,
              messages: apiMessages,
              stream: true,
            }),
          });

          const reader = resp.body?.getReader();
          const decoder = new TextDecoder();
          let accumulated = "";

          if (reader) {
            while (true) {
              const { done, value } = await reader.read();
              if (done) break;
              const chunk = decoder.decode(value, { stream: true });
              const lines = chunk.split("\n");
              for (const line of lines) {
                if (line.startsWith("data: ")) {
                  const data = line.slice(6);
                  if (data === "[DONE]") break;
                  try {
                    const parsed = JSON.parse(data);
                    const delta = parsed.choices?.[0]?.delta?.content;
                    if (delta) {
                      accumulated += delta;
                      const updated = currentConvos.map((c) =>
                        c.id === convoId
                          ? {
                              ...c,
                              messages: c.messages.map((m) =>
                                m.id === assistantMsg.id ? { ...m, content: accumulated } : m
                              ),
                            }
                          : c
                      );
                      currentConvos = updated;
                      setConversations(updated);
                    }
                  } catch {}
                }
              }
            }
          }
        }

        // Final save
        persist(currentConvos);
      } catch (err) {
        // Update assistant message with error
        const errMsg = err instanceof Error ? err.message : "Unknown error";
        const updated = currentConvos.map((c) =>
          c.id === convoId
            ? {
                ...c,
                messages: c.messages.map((m) =>
                  m.id === assistantMsg.id ? { ...m, content: `Error: ${errMsg}` } : m
                ),
              }
            : c
        );
        persist(updated);
      } finally {
        setIsStreaming(false);
      }
    },
    [activeId, activeAgentId, conversations, providerConfig, isStreaming, persist]
  );

  return (
    <ChatContext.Provider
      value={{
        conversations,
        activeConversation,
        activeAgent,
        providerConfig,
        isStreaming,
        setActiveConversation,
        setActiveAgent,
        setProviderConfig,
        createConversation,
        sendMessage,
        deleteConversation,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
}
