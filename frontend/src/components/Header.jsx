function Header({ showLogout, onLogout }) {
  return (
    <header className="sticky left-0 top-0 z-50 w-full border-b border-white/5 bg-[#1e2333]/80 px-6 py-5 shadow-lg backdrop-blur-xl transition-all">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-white">
            SystemThinker AI
          </h1>

          <p className="mt-1 text-sm font-medium text-gray-400">
            AI-based Socratic chatbot for Systems Thinking research
          </p>
        </div>

        {/* Grouped the badge and the logout button together */}
        <div className="flex items-center gap-4">
          <span className="hidden rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 px-5 py-2 text-sm font-bold text-white shadow-lg shadow-purple-500/20 sm:inline-block">
            Advanced Web Development Project
          </span>

          {showLogout && (
            <button
              onClick={onLogout}
              className="rounded-xl border border-white/5 bg-white/5 px-5 py-2 text-sm font-bold text-red-400 backdrop-blur-md transition-all hover:bg-red-500/20 focus:outline-none focus:ring-2 focus:ring-red-500"
            >
              Logout
            </button>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;