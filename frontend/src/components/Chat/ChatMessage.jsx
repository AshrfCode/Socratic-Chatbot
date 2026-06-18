function ChatMessage({ message }) {
  const isUser = message.sender === "user";
  const isSystem = message.sender === "system";

  // Special style for the F-08 timer reminders
  if (isSystem) {
    return (
      <div className="my-4 flex w-full justify-center">
        <span className="rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-medium tracking-wide text-slate-400 backdrop-blur-md">
          ⏱️ {message.text}
        </span>
      </div>
    );
  }

  // Normal Chat Bubbles
  return (
    <div className={`flex w-full ${isUser ? "justify-end" : "justify-start"}`}>
      <div
        className={`relative max-w-[85%] px-5 py-3.5 shadow-md md:max-w-[75%] ${
          isUser
            ? "rounded-2xl rounded-br-sm bg-gradient-to-br from-purple-600 to-indigo-600 text-white"
            : "rounded-2xl rounded-bl-sm border border-white/5 bg-[#2a2f42] text-slate-200"
        }`}
      >
        <p className={`mb-1 text-xs font-bold uppercase tracking-wider ${isUser ? "text-purple-200" : "text-purple-400"}`}>
          {isUser ? "You" : "SystemThinker AI"}
        </p>
        <p className="text-[15px] leading-relaxed tracking-wide">
          {message.text}
        </p>
      </div>
    </div>
  );
}

export default ChatMessage;