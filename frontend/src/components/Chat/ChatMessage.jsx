function ChatMessage({ message }) {
  const isUser = message.sender === "user";
  const isSystem = message.sender === "system";

  if (isSystem) {
    return (
      <div className="my-4 flex w-full justify-center">
        <span className="rounded-full border border-slate-200 bg-slate-100 px-4 py-1.5 text-[10px] sm:text-xs font-medium tracking-wide text-slate-500 backdrop-blur-md dark:border-white/10 dark:bg-white/5 dark:text-slate-400">
          ⏱️ {message.text}
        </span>
      </div>
    );
  }

  return (
    <div className={`flex w-full ${isUser ? "justify-end" : "justify-start"}`}>
      <div
        className={`relative max-w-[90%] sm:max-w-[85%] px-4 sm:px-5 py-3 sm:py-3.5 shadow-md md:max-w-[75%] ${
          isUser
            ? "rounded-2xl rounded-br-sm bg-gradient-to-br from-purple-600 to-indigo-600 text-white"
            : "rounded-2xl rounded-bl-sm border border-slate-200 bg-white text-slate-800 dark:border-white/5 dark:bg-[#2a2f42] dark:text-slate-200"
        }`}
      >
        <p className={`mb-1 text-[10px] sm:text-xs font-bold uppercase tracking-wider ${isUser ? "text-purple-200" : "text-purple-600 dark:text-purple-400"}`}>
          {isUser ? "You" : "SystemThinker AI"}
        </p>
        <p className="text-sm sm:text-[15px] leading-relaxed tracking-wide">
          {message.text}
        </p>
      </div>
    </div>
  );
}

export default ChatMessage;