function LandingPage({ onStudentClick, onResearcherClick }) {
  const FactCard = ({ icon, title, description }) => (
    <div className="flex flex-col items-center rounded-2xl border border-white/5 bg-[#2a2f42]/40 p-6 text-center shadow-xl backdrop-blur-sm transition-all hover:-translate-y-1 hover:bg-[#2a2f42]/60 hover:shadow-purple-500/10">
      <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-purple-500/20 text-3xl shadow-inner">
        {icon}
      </div>
      <h3 className="mb-2 text-lg font-bold text-white">{title}</h3>
      <p className="text-sm leading-relaxed text-slate-300">{description}</p>
    </div>
  );

  return (
    <div className="flex min-h-[80vh] flex-col items-center justify-center px-4 animate-in fade-in duration-500">
      
      {/* Hero Section */}
      <div className="mb-12 max-w-3xl text-center">
        <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-purple-500/30 bg-purple-500/10 px-4 py-1.5 text-sm font-semibold text-purple-300 backdrop-blur-md">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-purple-400 opacity-75"></span>
            <span className="relative inline-flex h-2 w-2 rounded-full bg-purple-500"></span>
          </span>
          Advanced Web Development Project
        </div>
        
        <h1 className="mb-6 text-5xl font-extrabold tracking-tight text-white md:text-6xl lg:text-7xl">
          SystemThinker <span className="bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent">AI</span>
        </h1>
        
        <p className="mx-auto max-w-2xl text-lg text-slate-400 md:text-xl">
          An AI-powered research platform evaluating the impact of Socratic dialogue on students' Systems Thinking capabilities.
        </p>
      </div>

      {/* Action Buttons */}
      <div className="mb-16 flex flex-col items-center gap-4 sm:flex-row sm:gap-6">
        <button
          onClick={onStudentClick}
          className="group relative flex items-center justify-center gap-3 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 px-8 py-4 text-lg font-bold text-white shadow-lg shadow-purple-500/30 transition-all hover:scale-105 hover:shadow-purple-500/50"
        >
          <span>Start Research Session</span>
          <svg className="h-5 w-5 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </button>

        <button
          onClick={onResearcherClick}
          className="flex items-center justify-center gap-3 rounded-xl border border-white/10 bg-[#2a2f42]/50 px-8 py-4 text-lg font-bold text-slate-300 backdrop-blur-md transition-all hover:bg-white/10 hover:text-white"
        >
          <span>Researcher Dashboard</span>
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
        </button>
      </div>

      {/* Project Facts Grid */}
      <div className="grid w-full max-w-5xl gap-6 md:grid-cols-3">
        <FactCard 
          icon="🧠" 
          title="Systems Thinking" 
          description="We guide students to analyze complex systems, encouraging them to look at the 'big picture' and understand feedback loops rather than isolated parts."
        />
        <FactCard 
          icon="🤖" 
          title="Socratic Chatbot" 
          description="Instead of giving direct answers, our AI employs the Socratic method—asking targeted, reflective questions to provoke deep critical thinking."
        />
        <FactCard 
          icon="📊" 
          title="Real-Time Analytics" 
          description="A fully integrated researcher dashboard monitors student progression, cognitive layers, and hint usage entirely in real-time."
        />
      </div>

    </div>
  );
}

export default LandingPage;