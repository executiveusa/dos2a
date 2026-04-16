"use client";

import { useChatContext } from "@/lib/chat-context";
import { useState, useRef, useEffect } from "react";

export function ChatInput() {
  const { sendMessage, isStreaming, providerConfig } = useChatContext();
  const [value, setValue] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Auto-resize textarea
  useEffect(() => {
    const ta = textareaRef.current;
    if (ta) {
      ta.style.height = "auto";
      ta.style.height = `${Math.min(ta.scrollHeight, 200)}px`;
    }
  }, [value]);

  const handleSubmit = () => {
    const trimmed = value.trim();
    if (!trimmed || isStreaming) return;
    sendMessage(trimmed);
    setValue("");
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const noProvider = !providerConfig;

  return (
    <div className="border-t border-white/[0.07] bg-[#0d1017] p-4">
      {noProvider && (
        <div className="mb-2 rounded-[7px] border border-[#d4af37]/30 bg-[#d4af37]/10 px-3 py-2 text-xs text-[#d4af37]">
          Configura tu proveedor de IA primero (⚙️ arriba a la derecha)
        </div>
      )}
      <div className="flex items-end gap-2">
        <textarea
          ref={textareaRef}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={noProvider ? "Configura tu API key…" : "Escribe un mensaje…"}
          disabled={noProvider}
          rows={1}
          className="flex-1 resize-none rounded-[10px] border border-white/[0.07] bg-[#080a0e] px-4 py-3 text-sm text-[#f1f5f9] placeholder-[#94a3b8]/50 outline-none transition-colors focus:border-[#d4af37]/50 disabled:opacity-50"
        />
        <button
          onClick={handleSubmit}
          disabled={!value.trim() || isStreaming || noProvider}
          className="flex h-[44px] w-[44px] shrink-0 items-center justify-center rounded-[7px] bg-[#d4af37] text-[#080a0e] transition-opacity hover:opacity-90 disabled:opacity-30"
        >
          {isStreaming ? (
            <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
              <rect x="6" y="6" width="12" height="12" rx="2" />
            </svg>
          ) : (
            <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" />
            </svg>
          )}
        </button>
      </div>
      <div className="mt-2 text-[10px] text-[#94a3b8]/40">
        Enter para enviar • Shift+Enter para nueva línea
      </div>
    </div>
  );
}
