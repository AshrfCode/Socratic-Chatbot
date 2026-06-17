import ChatMessage from "./ChatMessage";

/*
  ChatMessages receives messages as props from ChatBox.

  This demonstrates:
  - Props
  - Components inside components
  - map()
  - Conditional rendering
*/

function ChatMessages({ messages }) {
  if (messages.length === 0) {
    return (
      <div className="rounded-2xl bg-slate-900 p-5 text-slate-300">
        No messages yet. Start by describing the system goal.
      </div>
    );
  }

  return (
    <div className="max-h-[420px] space-y-3 overflow-y-auto rounded-2xl bg-slate-900 p-4">
      {messages.map((message) => (
        <ChatMessage key={message._id} message={message} />
      ))}
    </div>
  );
}

export default ChatMessages;