function ChatHeader() {
  return (
    <div className="relative z-10 border-b border-white/10 p-5">
      <p className="text-sm font-semibold text-blue-300">
        AI Learning Assistant
      </p>

      <h2 className="mt-1 text-2xl font-extrabold text-white">
        SystemThinker Chat
      </h2>

      <p className="mt-2 text-sm text-slate-300">
        The bot guides the student with reflective questions.
      </p>
    </div>
  );
}

export default ChatHeader;