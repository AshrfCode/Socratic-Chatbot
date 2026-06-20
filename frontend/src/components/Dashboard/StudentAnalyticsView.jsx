import React from 'react';

function StudentAnalyticsView({ student, onBack }) {
  if (!student) return null;

  // We place the array directly inside the file so it is mathematically impossible 
  // for the lookup to lose scope of the questions!
  const QUESTIONS_ARRAY = [
    "כאשר מנתחים תהליך כלשהו בארגון, חשוב להתמקד בתהליך עצמו ולא בדרך בה התהליך משתלב עם תהליכים רחבים יותר",
    "כאשר בוחנים תהליך שיפור יש לבדוק כיצד השיפורים ישפיעו על תהליכים אחרים נוספים",
    "כאשר עובדים בצוות אחד הדברים החשובים זה כיצד כל חבר צוות יבצע את תפקידו על הצד הטוב ביותר, בלי קשר לעבודת שותפיו לצוות",
    "בטיפול בנושא מסויים יש להבין עד הפרט הקטן ביותר הקשור בנושא",
    "כאשר עוסקים בתחום מסויים, יש להתמקד בתחום עצמו. אין צורך לעסוק בהבטים כלכליים/ ניהוליים או כל הבט אחר שיושפע מעבודה זו",
    "כאשר עוסקים בתהליך מסויים יש צורך להבין גם את תפקידם של אנשי המקצוע האחרים המעורבים בתהליך",
    "כאשר מציגים תהליך בארגון עדיף לא לעסוק בקשרים ההדדיים וההשפעות ההדדיות בין מרכיבי התהליך לתהליכים אחרים בארגון",
    "כאשר נתקלים בבעיה בעבודה כדאי תחילה לפרק אותה למרכיבים ולפתור אותה בשלבים",
    "רק מנהלי פרויקטים בעולם העסקי חייבים לקחת קורסים בניהול פרויקטים, על שאר המהנדסים לעסוק בתחום התמחותם",
    "עדיף שאת הקשר עם הלקוחות יעשו אלו שזה תפקידם",
    "מנהל פרויקט צריך להיות שותף , לבחון את החלופות השונות לפיתרון ולהמליץ על הפיתרון הנבחר. הוא אינו צריך להתרכז במימוש פיתרון שהומלץ ע\"י האירגון",
    "בבחירת מנהל עדיף לתת דגש ליכולתו המקצועית ופחות ליכולת הניהולית שלו",
    "יש להתפשר ולוותר על הפיתרון הטוב ביותר מבחינת הביצועים למשל משיקולי עלות- תועלת",
    "כאשר נתקלים בבעיה, תחילה להבין את ההקשר שבו היא נוצרה",
    "על מנת להצליח בביצוע תפקיד, חשוב לרכוש ידע גם בנושאים שאינם מתחום ההתמחות העיקרית",
    "על כל אחד להתמחות בתחומו, ריבוי תחומים עלול להוביל לידע שטחי (לדעת מעט על הרבה נושאים)",
    "עדיף שהעוסקים בתחומים האסטרטגיים של האירגון יהיו אלו שזהו תפקידם. אין צורך במעורבות גורמים נוספים באירגון",
    "שינויים קטנים עשויים ליצור תוצאות משמעותיות",
    "כשעובד הוא חלק מפרוייקט הוא מעוניין לדעת איך הוא יראה מספר שנים לאחר השלמתו",
    "בפתרון לבעיה צריך לקחת בחשבון גם שיקולים \"פוליטיים\" וארגוניים",
    "בעת פתרון בעיה כלשהי בתהליך העבודה בארגון אין צורך לפנות לממונים, עמיתים או כפופים לנו בשאלות הבהרה. אם יש צורך במידע- ניתן לחפשו באופן עצמאי",
    "לעיתים מומלץ לבדוק מה עוד אפשר לשפר גם אם משמעות הדבר היא אי עמידה בלוח הזמנים שהוגדר לביצוע המשימה",
    "לעיתים עדיף להעז ולקחת סיכונים",
    "יש להבין כיצד מרכיבים ותהליכים מסוימים בארגון משפיעים על הדרך בה נעשים דברים במרכיבים ובתהליכים אחרים של הארגון",
    "כאשר מציגים מוצר חדש הדרוש לעבודה בפעם הראשונה עדיף לקבל כמה שיותר פרטים והסברים",
    "יש להבין שעמימות היא חלק בלתי נפרד מהמציאות שבה עובדים",
    "כדי להגיע להחלטה יש לבחון בעיה מנקודות מבט שונות"
  ];

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

  const formatTime = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
  };

  return (
    <section className="mt-6 rounded-2xl border border-white/5 bg-[#1e2333]/80 p-8 shadow-2xl backdrop-blur-xl animate-in fade-in duration-300" dir="ltr">
      
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
                  
                  <div className="flex flex-col gap-3 rounded-lg bg-black/20 p-4">
                    {Object.entries(student.preTask.likertAnswers).map(([qKey, answer]) => {
                      // 1. Convert the DB string "0" into the math number 0
                      const qIndex = parseInt(qKey, 10);
                      // 2. Fetch the text from the array safely
                      const questionText = QUESTIONS_ARRAY[qIndex];

                      return (
                        <div key={qKey} className="flex items-start justify-between gap-4 border-b border-white/5 pb-2" dir="rtl">
                          <span className="text-sm text-slate-300">
                            {questionText ? questionText : `Question text missing for index: ${qIndex}`}
                          </span>
                          <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-indigo-500/20 text-sm font-bold text-indigo-300">
                            {answer}
                          </span>
                        </div>
                      );
                    })}
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

        <div className="rounded-xl border border-white/5 bg-[#2a2f42]/40 p-6">
          <h3 className="mb-6 text-xl font-bold text-green-300">Post-Task Metrics</h3>
          {student.postTask ? (
            <div className="space-y-6">
              <div>
                <MetricBar label="Perceived Effort" value={student.postTask.perceivedEffort} colorClass="bg-red-400" />
                <MetricBar label="Satisfaction" value={student.postTask.satisfaction} colorClass="bg-green-400" />
                <MetricBar label="Questions Helped Thinking" value={student.postTask.didQuestionsHelpThinking} colorClass="bg-blue-400" />
              </div>
              
              {/* NEW: Post-Task Systems Thinking Assessment List */}
              {student.postTask.likertAnswers && Object.keys(student.postTask.likertAnswers).length > 0 && (
                <div className="border-t border-white/10 pt-4 mt-4">
                  <p className="mb-3 text-xs font-bold uppercase tracking-wider text-slate-400">Systems Thinking Assessment (27 Questions - Post-Task)</p>
                  
                  <div className="flex flex-col gap-3 rounded-lg bg-black/20 p-4">
                    {Object.entries(student.postTask.likertAnswers).map(([qKey, answer]) => {
                      const qIndex = parseInt(qKey, 10);
                      const questionText = QUESTIONS_ARRAY[qIndex];

                      return (
                        <div key={qKey} className="flex items-start justify-between gap-4 border-b border-white/5 pb-2" dir="rtl">
                          <span className="text-sm text-slate-300">
                            {questionText ? questionText : `Question text missing for index: ${qIndex}`}
                          </span>
                          <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-green-500/20 text-sm font-bold text-green-400">
                            {answer}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {student.group === "Experimental Group" && (
                <div className="rounded-lg border border-white/5 bg-black/20 p-4 mt-4">
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
        
        <div className="col-span-1 lg:col-span-2 mt-4 rounded-xl border border-white/5 bg-[#2a2f42]/40 p-6">
          <h3 className="mb-4 text-xl font-bold text-emerald-400">Gate Unlocks & Triggers</h3>
          <p className="mb-6 text-sm text-slate-400">
            A chronological log of when this student unlocked each AI gate and the exact reasoning they provided.
          </p>
          
          <div className="max-h-96 overflow-y-auto rounded-xl border border-white/10 bg-[#1e2333]/50 p-1">
            <table className="w-full text-left text-sm text-slate-300">
              <thead className="sticky top-0 bg-[#1e2333] text-xs uppercase tracking-wider text-slate-400 shadow-sm z-10">
                <tr>
                  <th className="px-4 py-3 font-semibold">Time</th>
                  <th className="px-4 py-3 font-semibold">Layer</th>
                  <th className="px-4 py-3 font-semibold">Gate Unlocked</th>
                  <th className="px-4 py-3 font-semibold w-1/2">Triggering Message</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {student.gateEvents && student.gateEvents.length > 0 ? (
                  student.gateEvents.map((gate, idx) => (
                    <tr key={idx} className="transition-colors hover:bg-white/5">
                      <td className="whitespace-nowrap px-4 py-4 text-slate-400">
                        {formatTime(gate.createdAt)}
                      </td>
                      <td className="px-4 py-4 text-slate-300">
                        <span className="rounded-md bg-white/5 px-2 py-1 text-xs">{gate.layer}</span>
                      </td>
                      <td className="px-4 py-4 font-semibold text-emerald-400">
                        {gate.gateName}
                      </td>
                      <td className="px-4 py-4 italic text-slate-300" dir="rtl">
                        "{gate.trigger}"
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" className="px-4 py-8 text-center text-slate-500">
                      No gates have been unlocked by this student yet.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </section>
  );
}

export default StudentAnalyticsView;