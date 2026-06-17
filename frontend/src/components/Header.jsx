function Header() {
  return (
    <header className="border-b border-white/10 bg-slate-900 px-6 py-5 shadow-lg">
      <div className="mx-auto flex max-w-7xl flex-col gap-2 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-extrabold text-white">
            SystemThinker AI
          </h1>

          <p className="mt-1 text-sm text-slate-300">
            AI-based Socratic chatbot for Systems Thinking research
          </p>
        </div>

        <span className="rounded-full bg-purple-600 px-4 py-2 text-sm font-semibold">
          Advanced Web Development Project
        </span>
      </div>
    </header>
  );
}

export default Header;