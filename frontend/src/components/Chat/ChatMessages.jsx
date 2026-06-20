import { useLayoutEffect, useRef } from "react";
import ChatMessage from "./ChatMessage";

function ChatMessages({ messages, isTyping }) {
  const messagesEndRef = useRef(null);

  useLayoutEffect(() => {
    // Scroll down when a new message arrives OR when the typing indicator appears
    requestAnimationFrame(() => {
      messagesEndRef.current?.scrollIntoView({ behavior: "auto" });
    });
  }, [messages, isTyping]); 

  if (messages.length === 0 && !isTyping) {
    return (
      <div className="flex flex-1 items-center justify-center bg-[#0f121b]/40 p-5">
        <div className="text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-purple-500/20 text-purple-400">
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
            </svg>
          </div>
          <p className="text-sm font-medium text-slate-400">
            No messages yet. Start by describing the system goal.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 space-y-6 overflow-y-auto bg-[#0f121b]/40 p-5">
      {messages.map((message) => (
        <ChatMessage key={message._id} message={message} />
      ))}
      
      {/* NEW: The Bot Typing Animation Bubble */}
      {isTyping && (
        <div className="flex w-full justify-start animate-in fade-in slide-in-from-bottom-2 duration-300" dir="ltr">
          <div className="flex w-fit items-center gap-1.5 rounded-2xl rounded-tl-none border border-white/5 bg-[#2a2f42] px-5 py-4 shadow-md">
            <span className="h-2 w-2 animate-bounce rounded-full bg-purple-400"></span>
            <span className="h-2 w-2 animate-bounce rounded-full bg-purple-400" style={{ animationDelay: '0.15s' }}></span>
            <span className="h-2 w-2 animate-bounce rounded-full bg-purple-400" style={{ animationDelay: '0.3s' }}></span>
          </div>
        </div>
      )}

      {/* The invisible anchor at the bottom of the list! */}
      <div ref={messagesEndRef} />
    </div>
  );
}

export default ChatMessages;