import ChatMessage from "./ChatMessage";

function ChatMessages({ messages }) {
  return (
    <div className="relative z-10 h-[430px] overflow-y-auto space-y-6 p-6">
      {messages.map((message, index) => (
        <ChatMessage key={index} message={message} />
      ))}

      <div className="flex items-center gap-3">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-blue-400/30 bg-blue-500/10 text-xl">
          🤖
        </div>

        <div className="flex gap-2 rounded-2xl border border-white/10 bg-white/10 px-5 py-3">
          <span className="h-2 w-2 animate-pulse rounded-full bg-slate-300"></span>
          <span className="h-2 w-2 animate-pulse rounded-full bg-slate-300"></span>
          <span className="h-2 w-2 animate-pulse rounded-full bg-slate-300"></span>
        </div>
      </div>
    </div>
  );
}

export default ChatMessages;