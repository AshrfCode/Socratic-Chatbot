function StudentAnalyticsView({ student, onBack }) {
  if (!student) return null;

  const MetricBar = ({ label, value, max = 5, colorClass = "bg-purple-500" }) => (
    <div className="mb-3">
      <div className="mb-1 flex justify-between text-xs font-medium text-slate-300">
        <span>{label}</span>
        <span>{value} / {max}</span>
      </div>
      <div className="h-2 w-full overflow-hidden rounded-full bg-slate-800">
        <div 
          className={`h-full rounded-full ${colorClass}`} 
          style={{ width: `${(value / max) * 100}%` }}
        ></div>
      </div>
    </div>
  );

  return (
    <section className="mt-6 rounded-2xl border border-white/5 bg-[#1e2333]/80 p-8 shadow-2xl backdrop-blur-xl animate-in fade-in duration-300" dir="ltr">
      
      {/* Header with Back Button */}
      <div className="mb-8 flex items-center justify-between border-b border-white/10 pb-6">
        <div>
          <button 
            onClick={onBack}
            className="mb-4 flex items-center gap-2 text-sm font-semibold text-slate-400 transition hover:text-purple-400"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Dashboard
          </button>
          <h2 className="text-3xl font-extrabold text-white">Analytics: {student.studentName}</h2>
          <p className="mt-1 text-sm text-purple-400">{student.group} | Time Remaining: {student.remainingTime}</p>
        </div>
      </div>

      <div className="grid gap-8 lg:grid-cols-2">
        {/* Session Stats */}
        <div className="col-span-1 space-y-4 lg:col-span-2">
          <h3 className="text-xl font-bold text-white">Session Performance</h3>
          <div className="grid grid-cols-3 gap-6">
            <div className="rounded-xl bg-[#2a2f42]/40 p-6 text-center">
              <p className="text-sm font-medium text-slate-400">Final Layer</p>
              <p className="mt-2 text-3xl font-bold text-white">{student.currentLayer || "N/A"}</p>
            </div>
            <div className="rounded-xl bg-[#2a2f42]/40 p-6 text-center">
              <p className="text-sm font-medium text-slate-400">Hints Used</p>
              <p className="mt-2 text-3xl font-bold text-white">{student.hintsUsed}</p>
            </div>
            <div className="rounded-xl bg-[#2a2f42]/40 p-6 text-center">
              <p className="text-sm font-medium text-slate-400">Completion</p>
              <p className="mt-2 text-3xl font-bold text-white">{student.progress}%</p>
            </div>
          </div>
        </div>

        {/* FULL PRE-TASK SURVEY */}
        <div className="rounded-xl border border-white/5 bg-[#2a2f42]/40 p-6">
          <h3 className="mb-6 text-xl font-bold text-indigo-300">Pre-Task Profile</h3>
          {student.preTask ? (
            <div className="space-y-6 text-sm text-slate-200">
              
              <div className="grid grid-cols-2 gap-4 rounded-lg bg-black/20 p-4">
                <p><span className="text-slate-400">Gender:</span> {student.preTask.gender || "N/A"}</p>
                <p><span className="text-slate-400">Age:</span> {student.preTask.age || "N/A"}</p>
                <p className="col-span-2"><span className="text-slate-400">Education:</span> {student.preTask.education || "None"}</p>
                <p><span className="text-slate-400">Studied SE:</span> {student.preTask.studiedSE || "N/A"}</p>
                <p><span className="text-slate-400">Worked in SE:</span> {student.preTask.workedInSE || "N/A"}</p>
                
                {student.preTask.roleAndExperience && student.preTask.roleAndExperience !== "0" && (
                  <p className="col-span-2"><span className="text-slate-400">SE Role:</span> {student.preTask.roleAndExperience}</p>
                )}
                
                <p><span className="text-slate-400">Used Socratic Bot:</span> {student.preTask.usedSocraticBot || "N/A"}</p>
                
                {student.preTask.socraticBotExperience && student.preTask.socraticBotExperience !== "0" && (
                  <p className="col-span-2"><span className="text-slate-400">Bot Exp:</span> {student.preTask.socraticBotExperience}</p>
                )}
              </div>

              {student.preTask.likertAnswers && Object.keys(student.preTask.likertAnswers).length > 0 && (
                <div className="border-t border-white/10 pt-4">
                  <p className="mb-3 text-xs font-bold uppercase tracking-wider text-slate-400">Systems Thinking Assessment (27 Questions)</p>
                  <div className="grid grid-cols-3 gap-3 rounded-lg bg-black/20 p-4 sm:grid-cols-4 md:grid-cols-5">
                    {Object.entries(student.preTask.likertAnswers).map(([qKey, answer]) => (
                      <div key={qKey} className="flex justify-between border-b border-white/5 p-1.5">
                        <span className="text-xs text-slate-400">{qKey}:</span>
                        <span className="text-sm font-bold text-white">{answer}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="space-y-4 border-t border-white/10 pt-4">
                <div>
                  <p className="mb-2 text-xs font-bold uppercase tracking-wider text-slate-400" dir="rtl">אילו סוגי שאלות את/ה שואל/ת את עצמך כשאת/ה מנסה להבין בעיה?</p>
                  <p className="rounded-lg bg-black/20 p-4 text-sm italic leading-relaxed text-slate-300" dir="rtl">
                    {student.preTask.openQ1 ? `"${student.preTask.openQ1}"` : "No answer provided"}
                  </p>
                </div>
                <div>
                  <p className="mb-2 text-xs font-bold uppercase tracking-wider text-slate-400" dir="rtl">תאר/י מצב שבו פתרון שבחרת הוביל להיווצרות בעיה נוספת</p>
                  <p className="rounded-lg bg-black/20 p-4 text-sm italic leading-relaxed text-slate-300" dir="rtl">
                    {student.preTask.openQ2 ? `"${student.preTask.openQ2}"` : "No answer provided"}
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex h-40 items-center justify-center rounded-lg border border-dashed border-white/10 bg-black/10"><p className="text-slate-500">Not completed yet</p></div>
          )}
        </div>

        {/* POST-TASK SURVEY */}
        <div className="rounded-xl border border-white/5 bg-[#2a2f42]/40 p-6">
          <h3 className="mb-6 text-xl font-bold text-green-300">Post-Task Metrics</h3>
          {student.postTask ? (
            <div className="space-y-6">
              <div>
                <MetricBar label="Perceived Effort" value={student.postTask.perceivedEffort} colorClass="bg-red-400" />
                <MetricBar label="Satisfaction" value={student.postTask.satisfaction} colorClass="bg-green-400" />
                <MetricBar label="Questions Helped Thinking" value={student.postTask.didQuestionsHelpThinking} colorClass="bg-blue-400" />
              </div>
              
              {student.group === "Experimental Group" && (
                <div className="rounded-lg border border-white/5 bg-black/20 p-4">
                  <p className="mb-1 text-xs font-bold uppercase tracking-wider text-slate-400">Manipulation Check Failed?</p>
                  <p className={`text-lg font-bold ${student.postTask.didBotGiveAnswers ? "text-red-400" : "text-green-400"}`}>
                    {student.postTask.didBotGiveAnswers ? "YES (Bot gave direct answers)" : "NO (Valid data)"}
                  </p>
                </div>
              )}

              <div className="border-t border-white/10 pt-4">
                <p className="mb-2 text-xs font-bold uppercase tracking-wider text-slate-400">Student Feedback</p>
                <p className="min-h-[100px] rounded-lg bg-black/20 p-4 text-sm italic leading-relaxed text-slate-300" dir="rtl">
                  {student.postTask.feedback ? `"${student.postTask.feedback}"` : "No feedback provided."}
                </p>
              </div>
            </div>
          ) : (
             <div className="flex h-40 items-center justify-center rounded-lg border border-dashed border-white/10 bg-black/10"><p className="text-slate-500">Not completed yet</p></div>
          )}
        </div>
      </div>
    </section>
  );
}

export default StudentAnalyticsView;