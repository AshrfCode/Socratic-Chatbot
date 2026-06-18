import { useState, useEffect } from "react";
import { Link } from "react-router-dom"; // <-- Import the Link component!

function Header({ showLogout, onLogout }) {
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDark]);

  return (
    <header className="sticky left-0 top-0 z-50 w-full border-b border-white/5 bg-[#1e2333]/80 px-6 py-5 shadow-lg backdrop-blur-xl transition-all">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 md:flex-row md:items-center md:justify-between">
        
        {/* Left Side: Clickable Logo & Subtitle */}
        <div>
          {/* Wrap the title in the Router Link */}
          <Link 
            to="/" 
            className="group inline-block focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-[#1e2333] rounded-lg"
          >
            <h1 className="text-3xl font-extrabold tracking-tight text-white transition-colors group-hover:text-purple-400">
              SystemThinker AI
            </h1>
          </Link>

          <p className="mt-1 text-sm font-medium text-gray-400">
            AI-based Socratic chatbot for Systems Thinking research
          </p>
        </div>

        {/* Right Side: Badge, Theme Toggle, and Logout */}
        <div className="flex items-center gap-4">
          <span className="hidden rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 px-5 py-2 text-sm font-bold text-white shadow-lg shadow-purple-500/20 sm:inline-block">
            Advanced Web Development Project
          </span>

          {/* Theme Toggle Button */}
          <button
            onClick={() => setIsDark(!isDark)}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-slate-300 backdrop-blur-md transition-all hover:bg-white/10 hover:text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
            aria-label="Toggle Dark Mode"
          >
            {isDark ? (
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            ) : (
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
              </svg>
            )}
          </button>

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