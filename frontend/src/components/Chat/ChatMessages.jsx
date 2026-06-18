import ChatMessage from "./ChatMessage";

function ChatMessages({ messages }) {
  if (messages.length === 0) {
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
    // Custom scrollbar classes added implicitly via Tailwind (needs base CSS or just looks clean natively)
    <div className="flex-1 space-y-6 overflow-y-auto bg-[#0f121b]/40 p-5 scroll-smooth">
      {messages.map((message) => (
        <ChatMessage key={message._id} message={message} />
      ))}
    </div>
  );
}

export default ChatMessages;