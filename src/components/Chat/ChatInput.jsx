function ChatInput({ input, setInput, sendMessage }) {
  return (
    <div className="flex flex-col gap-3 md:flex-row">
      <div className="relative flex-1">
        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
          ✎
        </span>

        <input
          className="w-full rounded-2xl border border-blue-400/40 bg-white/10 px-12 py-4 text-white outline-none placeholder:text-slate-400 focus:border-blue-300 focus:ring-2 focus:ring-blue-500/40"
          type="text"
          placeholder="Write your reasoning here..."
          value={input}
          maxLength={500}
          onChange={(event) => setInput(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              sendMessage();
            }
          }}
        />

        <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-slate-400">
          {input.length} / 500
        </span>
      </div>

      <button
        className="rounded-2xl bg-linear-to-r from-blue-500 to-violet-500 px-7 py-4 font-bold text-white shadow-lg shadow-blue-500/30 transition hover:scale-105"
        onClick={sendMessage}
      >
        ✈ Send
      </button>
    </div>
  );
}

export default ChatInput;