"use client";

import { useChatContext, type Message } from "@/lib/chat-context";
import { useEffect, useRef } from "react";

function MessageBubble({ message }: { message: Message }) {
  const isUser = message.role === "user";
  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-[80%] rounded-[10px] px-4 py-3 text-sm leading-relaxed ${
          isUser
            ? "bg-[#d4af37] text-[#080a0e]"
            : "border border-white/[0.07] bg-[#0d1017] text-[#f1f5f9]"
        }`}
      >
        {message.content ? (
          <div className="whitespace-pre-wrap">{message.content}</div>
        ) : (
          <div className="flex items-center gap-1">
            <span className="h-2 w-2 animate-pulse rounded-full bg-[#d4af37]" />
            <span className="animation-delay-150 h-2 w-2 animate-pulse rounded-full bg-[#d4af37]" />
            <span className="animation-delay-300 h-2 w-2 animate-pulse rounded-full bg-[#d4af37]" />
          </div>
        )}
        <div className={`mt-1 text-[10px] ${isUser ? "text-[#080a0e]/50" : "text-[#94a3b8]"}`}>
          {new Date(message.timestamp).toLocaleTimeString("es-MX", {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </div>
      </div>
    </div>
  );
}

export function ChatMessages() {
  const { activeConversation, activeAgent, isStreaming } = useChatContext();
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [activeConversation?.messages]);

  if (!activeConversation) {
    return (
      <div className="flex flex-1 flex-col items-center justify-center gap-4 text-center">
        <div className="text-5xl">{activeAgent.icon}</div>
        <h2 className="font-[Sora] text-xl font-bold text-[#f1f5f9]">{activeAgent.name}</h2>
        <p className="max-w-sm text-sm text-[#94a3b8]">{activeAgent.description}</p>
        <p className="text-xs text-[#94a3b8]/60">
          Escribe un mensaje para empezar
        </p>
      </div>
    );
  }

  if (activeConversation.messages.length === 0) {
    return (
      <div className="flex flex-1 flex-col items-center justify-center gap-4 text-center">
        <div className="text-5xl">{activeAgent.icon}</div>
        <h2 className="font-[Sora] text-xl font-bold text-[#f1f5f9]">{activeAgent.name}</h2>
        <p className="text-sm text-[#94a3b8]">¿En qué te puedo ayudar?</p>
      </div>
    );
  }

  return (
    <div className="flex flex-1 flex-col gap-3 overflow-y-auto p-4">
      {activeConversation.messages.map((msg) => (
        <MessageBubble key={msg.id} message={msg} />
      ))}
      {isStreaming && (
        <div className="text-xs text-[#94a3b8]">
          {activeAgent.name} está escribiendo…
        </div>
      )}
      <div ref={bottomRef} />
    </div>
  );
}
