function StudentModal({ student, onClose }) {
  if (!student) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
      {/* Modal Container */}
      <div className="flex max-h-[90vh] w-full max-w-4xl flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#1e2333] shadow-2xl">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-white/10 bg-[#2a2f42]/80 p-6">
          <div>
            <h2 className="text-2xl font-bold text-white">{student.studentName}</h2>
            <p className="text-sm text-purple-400">{student.group} | ID: {student.studentId}</p>
          </div>
          <button 
            onClick={onClose}
            className="rounded-full bg-white/5 p-2 text-slate-400 transition hover:bg-red-500/20 hover:text-red-400"
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Modal Body (Scrollable) */}
        <div className="overflow-y-auto p-6" dir="rtl">
          <div className="grid gap-6 md:grid-cols-2">
            
            {/* PRE-TASK SURVEY DATA */}
            <div className="rounded-xl border border-white/5 bg-[#2a2f42]/40 p-5">
              <h3 className="mb-4 text-lg font-bold text-indigo-300">שאלון טרום-משימה (Pre-Task)</h3>
              {student.preTask ? (
                <div className="space-y-3 text-sm text-slate-200">
                  <p><span className="text-slate-400">מגדר:</span> {student.preTask.gender}</p>
                  <p><span className="text-slate-400">גיל:</span> {student.preTask.age}</p>
                  <p><span className="text-slate-400">ניסיון קודם ב-SE:</span> {student.preTask.workedInSE}</p>
                  <p><span className="text-slate-400">ניסיון עם בוט סוקרטי:</span> {student.preTask.usedSocraticBot}</p>
                  <div className="mt-3 border-t border-white/10 pt-3">
                    <p className="text-xs text-slate-400">שאלה פתוחה 1:</p>
                    <p className="mt-1 rounded bg-black/20 p-2">{student.preTask.openQ1}</p>
                  </div>
                </div>
              ) : (
                <p className="text-sm text-slate-500">טרם מולא (Not completed yet)</p>
              )}
            </div>

            {/* POST-TASK SURVEY DATA */}
            <div className="rounded-xl border border-white/5 bg-[#2a2f42]/40 p-5">
              <h3 className="mb-4 text-lg font-bold text-green-300">שאלון פוסט-משימה (Post-Task)</h3>
              {student.postTask ? (
                <div className="space-y-3 text-sm text-slate-200">
                  <p><span className="text-slate-400">מאמץ נתפס:</span> {student.postTask.perceivedEffort} / 5</p>
                  <p><span className="text-slate-400">שביעות רצון:</span> {student.postTask.satisfaction} / 5</p>
                  <p><span className="text-slate-400">השאלות עזרו לחשוב:</span> {student.postTask.didQuestionsHelpThinking} / 5</p>
                  {student.group === "Experimental Group" && (
                    <p><span className="text-slate-400">בדיקת מניפולציה:</span> {student.postTask.didBotGiveAnswers ? "כן" : "לא"}</p>
                  )}
                  <div className="mt-3 border-t border-white/10 pt-3">
                    <p className="text-xs text-slate-400">משוב פתוח:</p>
                    <p className="mt-1 rounded bg-black/20 p-2">{student.postTask.feedback || "אין משוב"}</p>
                  </div>
                </div>
              ) : (
                <p className="text-sm text-slate-500">טרם מולא (Not completed yet)</p>
              )}
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}

export default StudentModal;