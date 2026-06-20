import CountdownTimer from "../CountdownTimer/CountdownTimer";

function ChatHeader({ startTime, onTimeUp, onReminder }) {
  return (
    <div className="relative z-10 flex flex-col gap-4 border-b border-slate-200 bg-slate-50 p-4 sm:flex-row sm:items-center sm:justify-between sm:p-5 dark:border-white/5 dark:bg-[#2a2f42]/50">
      <div>
        <div className="flex items-center gap-2">
          <span className="relative flex h-2.5 w-2.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-purple-400 opacity-75"></span>
            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-purple-500"></span>
          </span>
          <p className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-purple-600 dark:text-purple-400">
            AI Learning Assistant
          </p>
        </div>

        <h2 className="mt-1 text-xl sm:text-2xl font-extrabold tracking-tight text-slate-900 dark:text-white">
          SystemThinker Chat
        </h2>

        <p className="mt-1 text-xs sm:text-sm text-slate-500 dark:text-slate-400">
          The bot guides the student with reflective questions.
        </p>
      </div>

      {/* TIMER BLOCK */}
      <div className="flex w-fit flex-col items-center justify-center rounded-xl border border-slate-200 bg-white px-4 py-2 shadow-sm sm:px-5 sm:py-2.5 dark:border-white/5 dark:bg-slate-950/40 dark:shadow-inner">
        <span className="mb-1 text-[10px] font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400">
          Time Remaining
        </span>
        <CountdownTimer 
          startTime={startTime} 
          initialMinutes={20} 
          onTimeUp={onTimeUp} 
          onReminder={onReminder} 
        />
      </div>
    </div>
  );
}

export default ChatHeader;