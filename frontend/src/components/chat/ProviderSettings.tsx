"use client";

import { useState } from "react";
import {
  useChatContext,
  type Provider,
  type ProviderConfig,
  detectProvider,
} from "@/lib/chat-context";

const PROVIDERS: { id: Provider; name: string; placeholder: string; defaultModel: string }[] = [
  { id: "openai", name: "OpenAI", placeholder: "sk-...", defaultModel: "gpt-4o" },
  { id: "anthropic", name: "Anthropic", placeholder: "sk-ant-...", defaultModel: "claude-sonnet-4-20250514" },
  { id: "google", name: "Google AI", placeholder: "AIza...", defaultModel: "gemini-2.0-flash" },
  { id: "groq", name: "Groq", placeholder: "gsk_...", defaultModel: "llama-3.3-70b-versatile" },
  { id: "openrouter", name: "OpenRouter", placeholder: "sk-or-...", defaultModel: "openrouter/auto" },
  { id: "ollama", name: "Ollama (local)", placeholder: "no key needed", defaultModel: "ollama/llama3" },
];

export function ProviderSettings({ onClose }: { onClose: () => void }) {
  const { providerConfig, setProviderConfig } = useChatContext();
  const [provider, setProvider] = useState<Provider>(providerConfig?.provider ?? "openrouter");
  const [apiKey, setApiKey] = useState(providerConfig?.apiKey ?? "");
  const [model, setModel] = useState(providerConfig?.model ?? "");
  const [baseUrl, setBaseUrl] = useState(providerConfig?.baseUrl ?? "");

  const selectedProvider = PROVIDERS.find((p) => p.id === provider)!;

  const handleSave = () => {
    const config: ProviderConfig = {
      provider,
      apiKey,
      model: model || selectedProvider.defaultModel,
      baseUrl: baseUrl || undefined,
    };
    setProviderConfig(config);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="w-full max-w-md rounded-[10px] border border-white/[0.07] bg-[#0d1017] p-6">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="font-[Sora] text-lg font-bold text-[#f1f5f9]">Configuración de IA</h2>
          <button onClick={onClose} className="text-[#94a3b8] hover:text-[#f1f5f9]">
            <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        </div>

        <p className="mb-4 text-xs text-[#94a3b8]">
          Usa tu propia suscripción. Tu API key se guarda solo en tu navegador.
        </p>

        {/* Provider select */}
        <label className="mb-1 block text-xs font-medium text-[#94a3b8]">Proveedor</label>
        <div className="mb-4 grid grid-cols-3 gap-2">
          {PROVIDERS.map((p) => (
            <button
              key={p.id}
              onClick={() => {
                setProvider(p.id);
                setModel(p.defaultModel);
                setBaseUrl("");
              }}
              className={`rounded-[7px] border px-3 py-2 text-xs font-medium transition-colors ${
                provider === p.id
                  ? "border-[#d4af37] bg-[#d4af37]/10 text-[#d4af37]"
                  : "border-white/[0.07] text-[#94a3b8] hover:border-white/20"
              }`}
            >
              {p.name}
            </button>
          ))}
        </div>

        {/* API Key */}
        <label className="mb-1 block text-xs font-medium text-[#94a3b8]">API Key</label>
        <input
          type="password"
          value={apiKey}
          onChange={(e) => setApiKey(e.target.value)}
          placeholder={selectedProvider.placeholder}
          className="mb-4 w-full rounded-[7px] border border-white/[0.07] bg-[#080a0e] px-3 py-2 text-sm text-[#f1f5f9] outline-none focus:border-[#d4af37]/50"
        />

        {/* Model */}
        <label className="mb-1 block text-xs font-medium text-[#94a3b8]">Modelo</label>
        <input
          type="text"
          value={model}
          onChange={(e) => setModel(e.target.value)}
          placeholder={selectedProvider.defaultModel}
          className="mb-4 w-full rounded-[7px] border border-white/[0.07] bg-[#080a0e] px-3 py-2 text-sm text-[#f1f5f9] outline-none focus:border-[#d4af37]/50"
        />

        {/* Custom base URL */}
        <label className="mb-1 block text-xs font-medium text-[#94a3b8]">
          URL personalizada <span className="text-[#94a3b8]/50">(opcional)</span>
        </label>
        <input
          type="text"
          value={baseUrl}
          onChange={(e) => setBaseUrl(e.target.value)}
          placeholder="Dejar vacío para usar la URL por defecto"
          className="mb-6 w-full rounded-[7px] border border-white/[0.07] bg-[#080a0e] px-3 py-2 text-sm text-[#f1f5f9] outline-none focus:border-[#d4af37]/50"
        />

        <button
          onClick={handleSave}
          disabled={!apiKey && provider !== "ollama"}
          className="w-full rounded-[7px] bg-[#d4af37] py-2.5 text-sm font-semibold text-[#080a0e] transition-opacity hover:opacity-90 disabled:opacity-30"
        >
          Guardar configuración
        </button>
      </div>
    </div>
  );
}
