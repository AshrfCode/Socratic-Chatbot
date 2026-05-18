function Header() {
  return (
    <header className="relative overflow-hidden rounded-3xl border border-white/20 bg-white/10 p-10 shadow-2xl backdrop-blur-xl">
      <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-blue-500/25 blur-3xl"></div>

      <div className="absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-purple-500/25 blur-3xl"></div>

      <div className="relative z-10 flex flex-col items-center text-center">
        <div className="mb-5 inline-flex rounded-full border border-cyan-300/30 bg-cyan-300/10 px-5 py-2 text-sm font-bold text-cyan-200">
          AI-Powered Learning Platform
        </div>

        <h1 className="text-5xl font-black tracking-tight text-white md:text-6xl">
          SystemThinker AI
        </h1>

        <p className="mt-5 max-w-3xl text-xl font-medium text-blue-100">
          A Socratic chatbot that helps students build deeper systems thinking
          skills through guided questioning.
        </p>

        <p className="mt-5 max-w-4xl text-sm leading-7 text-slate-300">
          The platform guides learners through four structured layers:
          broad context, system structure, dynamic behavior, and evaluation —
          without giving direct answers. Instead, it encourages reasoning,
          reflection, and active learning.
        </p>

        <div className="mt-8 grid w-full max-w-4xl grid-cols-2 gap-4 md:grid-cols-4">
          <HeaderStat number="04" label="Thinking Layers" />

          <HeaderStat number="AI" label="Socratic Guidance" />

          <HeaderStat number="100%" label="Fake Data Demo" />

          <HeaderStat number="JS" label="Interactive Layout" />
        </div>
      </div>
    </header>
  );
}

function HeaderStat({ number, label }) {
  return (
    <div className="rounded-3xl border border-white/10 bg-slate-950/40 p-5 text-center shadow-xl">
      <p className="text-3xl font-black text-cyan-300">
        {number}
      </p>

      <p className="mt-2 text-xs font-semibold text-slate-300">
        {label}
      </p>
    </div>
  );
}

export default Header;