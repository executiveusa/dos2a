"use client";

import { useState } from "react";
import { ChatProvider, useChatContext } from "@/lib/chat-context";
import { ChatSidebar } from "@/components/chat/ChatSidebar";
import { ChatMessages } from "@/components/chat/ChatMessages";
import { ChatInput } from "@/components/chat/ChatInput";
import { ProviderSettings } from "@/components/chat/ProviderSettings";

function ChatDashboardInner() {
  const { activeAgent, providerConfig } = useChatContext();
  const [showSettings, setShowSettings] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="flex h-screen bg-[#080a0e]">
      {/* Sidebar */}
      {sidebarOpen && <ChatSidebar />}

      {/* Main */}
      <div className="flex flex-1 flex-col">
        {/* Header */}
        <header className="flex items-center justify-between border-b border-white/[0.07] bg-[#0d1017] px-4 py-3">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="text-[#94a3b8] hover:text-[#f1f5f9]"
            >
              <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M3 12h18M3 6h18M3 18h18" />
              </svg>
            </button>
            <div>
              <h1 className="font-[Sora] text-sm font-bold text-[#f1f5f9]">
                {activeAgent.icon} {activeAgent.name}
              </h1>
              <p className="text-xs text-[#94a3b8]">{activeAgent.description}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {providerConfig && (
              <span className="rounded-full bg-green-500/20 px-2 py-0.5 text-[10px] font-medium text-green-400">
                {providerConfig.provider} • {providerConfig.model}
              </span>
            )}
            <button
              onClick={() => setShowSettings(true)}
              className="flex items-center gap-1.5 rounded-[7px] border border-white/[0.07] px-3 py-1.5 text-xs text-[#94a3b8] transition-colors hover:border-[#d4af37]/30 hover:text-[#d4af37]"
            >
              <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="3" />
                <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-2 2 2 2 0 01-2-2v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 01-2-2 2 2 0 012-2h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 010-2.83 2 2 0 012.83 0l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 012-2 2 2 0 012 2v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 0 2 2 0 010 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 012 2 2 2 0 01-2 2h-.09a1.65 1.65 0 00-1.51 1z" />
              </svg>
              ⚙️ Proveedor
            </button>
            <a
              href="/"
              className="rounded-[7px] border border-white/[0.07] px-3 py-1.5 text-xs text-[#94a3b8] transition-colors hover:text-[#f1f5f9]"
            >
              ← Sitio
            </a>
          </div>
        </header>

        {/* Messages */}
        <ChatMessages />

        {/* Input */}
        <ChatInput />
      </div>

      {/* Settings modal */}
      {showSettings && <ProviderSettings onClose={() => setShowSettings(false)} />}
    </div>
  );
}

export default function ChatPage() {
  return (
    <ChatProvider>
      <ChatDashboardInner />
    </ChatProvider>
  );
}
