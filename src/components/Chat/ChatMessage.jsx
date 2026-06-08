function ChatMessage({ message }) {
  const isUser = message.sender === "user";

  return (
    <div
      className={`flex items-end gap-3 ${
        isUser ? "justify-end" : "justify-start"
      }`}
    >
      {!isUser && (
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-blue-400/30 bg-blue-500/10 text-xl">
          🤖
        </div>
      )}

      <div
        className={`max-w-[75%] rounded-3xl px-5 py-4 shadow-xl ${
          isUser
            ? "rounded-br-md bg-linear-to-r from-blue-600 to-violet-600 text-white"
            : "rounded-bl-md border border-white/10 bg-white/10 text-slate-100"
        }`}
      >
        <div className="mb-2 flex items-center justify-between gap-5">
          <p className={`text-sm font-bold ${isUser ? "text-white" : "text-blue-300"}`}>
            {isUser ? "You" : "SystemThinker Bot"}
          </p>

          <p className="text-xs text-slate-300">
            {message.time || "10:21 AM"}
          </p>
        </div>

        <p className="leading-7">{message.text}</p>

        {isUser && (
          <p className="mt-2 text-right text-xs text-blue-100">✓✓</p>
        )}
      </div>

      {isUser && (
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-violet-400/40 bg-violet-500/20 text-xl">
          👤
        </div>
      )}
    </div>
  );
}

export default ChatMessage;