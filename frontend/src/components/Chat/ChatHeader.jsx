import CountdownTimer from "../CountdownTimer/CountdownTimer"; // Ensure path is correct!

function ChatHeader({ onTimeUp, onReminder }) {
  return (
    <div className="relative z-10 flex items-center justify-between border-b border-white/5 bg-[#2a2f42]/50 p-5">
      <div>
        <div className="flex items-center gap-2">
          <span className="relative flex h-2.5 w-2.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-purple-400 opacity-75"></span>
            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-purple-500"></span>
          </span>
          <p className="text-xs font-bold uppercase tracking-wider text-purple-400">
            AI Learning Assistant
          </p>
        </div>

        <h2 className="mt-1 text-2xl font-extrabold tracking-tight text-white">
          SystemThinker Chat
        </h2>

        <p className="mt-1 text-sm text-slate-400">
          The bot guides the student with reflective questions.
        </p>
      </div>

      {/* NEW TIMER BLOCK */}
      <div className="flex flex-col items-center justify-center rounded-xl border border-white/5 bg-slate-950/40 px-5 py-2.5 shadow-inner">
        <span className="mb-1 text-[10px] font-bold uppercase tracking-widest text-slate-400">
          Time Remaining
        </span>
        <CountdownTimer 
          initialMinutes={20} 
          onTimeUp={onTimeUp} 
          onReminder={onReminder} 
        />
      </div>
    </div>
  );
}

export default ChatHeader;