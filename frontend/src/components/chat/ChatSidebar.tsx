"use client";

import { useChatContext, AGENTS } from "@/lib/chat-context";
import { useState } from "react";

export function ChatSidebar() {
  const {
    conversations,
    activeConversation,
    activeAgent,
    setActiveConversation,
    setActiveAgent,
    createConversation,
    deleteConversation,
  } = useChatContext();
  const [showAgents, setShowAgents] = useState(false);

  return (
    <aside className="flex h-full w-64 flex-col border-r border-white/[0.07] bg-[#0d1017]">
      {/* New chat button */}
      <div className="p-3">
        <button
          onClick={() => createConversation()}
          className="flex w-full items-center gap-2 rounded-[7px] bg-[#d4af37] px-3 py-2 text-sm font-semibold text-[#080a0e] transition-opacity hover:opacity-90"
        >
          <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path d="M12 5v14M5 12h14" />
          </svg>
          Nueva conversación
        </button>
      </div>

      {/* Agent selector */}
      <div className="px-3 pb-2">
        <button
          onClick={() => setShowAgents(!showAgents)}
          className="flex w-full items-center gap-2 rounded-[7px] border border-white/[0.07] px-3 py-2 text-left text-sm text-[#f1f5f9] transition-colors hover:bg-white/5"
        >
          <span>{activeAgent.icon}</span>
          <span className="flex-1 truncate">{activeAgent.name}</span>
          <svg
            width="12"
            height="12"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
            className={`transition-transform ${showAgents ? "rotate-180" : ""}`}
          >
            <path d="M6 9l6 6 6-6" />
          </svg>
        </button>

        {showAgents && (
          <div className="mt-1 rounded-[10px] border border-white/[0.07] bg-[#080a0e] p-1">
            {AGENTS.map((agent) => (
              <button
                key={agent.id}
                onClick={() => {
                  setActiveAgent(agent.id);
                  createConversation(agent.id);
                  setShowAgents(false);
                }}
                className={`flex w-full items-center gap-2 rounded-[7px] px-3 py-2 text-left text-sm transition-colors hover:bg-white/5 ${
                  agent.id === activeAgent.id ? "bg-white/10 text-[#d4af37]" : "text-[#f1f5f9]"
                }`}
              >
                <span>{agent.icon}</span>
                <div className="flex-1">
                  <div className="font-medium">{agent.name}</div>
                  <div className="text-xs text-[#94a3b8]">{agent.description}</div>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Conversation list */}
      <div className="flex-1 overflow-y-auto px-3">
        <div className="mb-1 text-xs font-medium uppercase tracking-wider text-[#94a3b8]">
          Conversaciones
        </div>
        {conversations.length === 0 && (
          <p className="mt-4 text-center text-xs text-[#94a3b8]">Sin conversaciones</p>
        )}
        {conversations.map((convo) => {
          const agent = AGENTS.find((a) => a.id === convo.agentId);
          return (
            <div
              key={convo.id}
              className={`group mb-1 flex items-center gap-2 rounded-[7px] px-3 py-2 text-sm transition-colors ${
                convo.id === activeConversation?.id
                  ? "bg-white/10 text-[#f1f5f9]"
                  : "text-[#94a3b8] hover:bg-white/5 hover:text-[#f1f5f9]"
              }`}
            >
              <button
                onClick={() => setActiveConversation(convo.id)}
                className="flex flex-1 items-center gap-2 text-left"
              >
                <span className="text-xs">{agent?.icon ?? "💬"}</span>
                <span className="flex-1 truncate">{convo.title}</span>
              </button>
              <button
                onClick={() => deleteConversation(convo.id)}
                className="hidden text-[#94a3b8] transition-colors hover:text-[#e11d48] group-hover:block"
                title="Eliminar"
              >
                <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              </button>
            </div>
          );
        })}
      </div>

      {/* Settings link at bottom */}
      <div className="border-t border-white/[0.07] p-3">
        <div className="text-xs text-[#94a3b8]">
          DOS2A Studio • Chat-First
        </div>
      </div>
    </aside>
  );
}
