/*
  ChatMessage displays one message.

  sender controls the UI:
  - user message appears on the right
  - bot message appears on the left
*/

function ChatMessage({ message }) {
  const isUser = message.sender === "user";

  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-[80%] rounded-2xl px-4 py-3 ${
          isUser
            ? "bg-purple-600 text-white"
            : "bg-white/10 text-slate-100"
        }`}
      >
        <p className="text-xs font-semibold opacity-70">
          {isUser ? "You" : "SystemThinker AI"}
        </p>

        <p className="mt-1 text-sm leading-relaxed">{message.text}</p>
      </div>
    </div>
  );
}

export default ChatMessage;