function ChatInput({ input, setInput, sendMessage }) {
  return (
    <div className="border-t border-white/5 bg-[#1e2333]/50 p-5">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end">
        <div className="relative flex-1">
          {/* Real SVG icon instead of ✎ */}
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
            </svg>
          </div>

          <input
            className="w-full rounded-xl border border-transparent bg-[#2a2f42] py-4 pl-12 pr-16 text-white placeholder-gray-400 transition-all focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500"
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

          <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-medium text-slate-500">
            {input.length} / 500
          </span>
        </div>

        <button
          className="flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 px-8 py-4 font-bold text-white shadow-lg shadow-purple-500/20 transition-all hover:scale-[1.02] hover:shadow-purple-500/40 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-[#1e2333] disabled:opacity-50 disabled:hover:scale-100"
          onClick={sendMessage}
          disabled={!input.trim()}
        >
          <span>Send</span>
          {/* Real SVG icon instead of ✈ */}
          <svg className="h-4 w-4 rotate-90" fill="currentColor" viewBox="0 0 20 20">
            <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
          </svg>
        </button>
      </div>
    </div>
  );
}

export default ChatInput;