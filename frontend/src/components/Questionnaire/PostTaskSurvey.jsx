import { useState } from "react";
import { useSession } from "../../Context/SessionContext";
import { submitPostTask } from "../../services/questionnaireService"; 

const SYSTEMS_THINKING_QUESTIONS = [
  "על כל אחד להתמחות בתחומו, ריבוי תחומים עלול להוביל לידע שטחי (לדעת מעט על הרבה נושאים)",
  "כאשר בוחנים תהליך שיפור יש לבדוק כיצד השיפורים ישפיעו על תהליכים אחרים נוספים",
  "יש להבין כיצד מרכיבים ותהליכים מסוימים בארגון משפיעים על הדרך בה נעשים דברים במרכיבים ובתהליכים אחרים של הארגון",
  "בטיפול בנושא מסויים יש להבין עד הפרט הקטן ביותר הקשור בנושא",
  "כאשר עוסקים בתחום מסויים, יש להתמקד בתחום עצמו. אין צורך לעסוק בהבטים כלכליים/ ניהוליים או כל הבט אחר שיושפע מעבודה זו",
  "כאשר עוסקים בתהליך מסויים יש צורך להבין גם את תפקידם של אנשי המקצוע האחרים המעורבים בתהליך",
  "כאשר מציגים תהליך בארגון עדיף לא לעסוק בקשרים ההדדיים וההשפעות ההדדיות בין מרכיבי התהליך לתהליכים אחרים בארגון",
  "כאשר נתקלים בבעיה בעבודה כדאי תחילה לפרק אותה למרכיבים ולפתור אותה בשלבים",
  "על מנת להצליח בביצוע תפקיד, חשוב לרכוש ידע גם בנושאים שאינם מתחום ההתמחות העיקרית",
  "כאשר עובדים בצוות אחד הדברים החשובים זה כיצד כל חבר צוות יבצע את תפקידו על הצד הטוב ביותר, בלי קשר לעבודת שותפיו לצוות",
  "רק מנהלי פרויקטים בעולם העסקי חייבים לקחת קורסים בניהול פרויקטים, על שאר המהנדסים לעסוק בתחום התמחותם",
  "עדיף שאת הקשר עם הלקוחות יעשו אלו שזה תפקידם",
  "מנהל פרויקט צריך להיות שותף , לבחון את החלופות השונות לפיתרון ולהמליץ על הפיתרון הנבחר. הוא אינו צריך להתרכז במימוש פיתרון שהומלץ ע\"י האירגון",
  "כאשר מנתחים תהליך כלשהו בארגון, חשוב להתמקד בתהליך עצמו ולא בדרך בה התהליך משתלב עם תהליכים רחבים יותר",
  "בבחירת מנהל עדיף לתת דגש ליכולתו המקצועית ופחות ליכולת הניהולית שלו",
  "יש להתפשר ולוותר על הפיתרון הטוב ביותר מבחינת הביצועים למשל משיקולי עלות- תועלת",
  "כאשר נתקלים בבעיה, תחילה להבין את ההקשר שבו היא נוצרה",
  "עדיף שהעוסקים בתחומים האסטרטגיים של האירגון יהיו אלו שזהו תפקידם. אין צורך במעורבות גורמים נוספים באירגון",
  "בעת פתרון בעיה כלשהי בתהליך העבודה בארגון אין צורך לפנות לממונים, עמיתים או כפופים לנו בשאלות הבהרה. אם יש צורך במידע- ניתן לחפשו באופן עצמאי",
  "שינויים קטנים עשויים ליצור תוצאות משמעותיות",
  "כשעובד הוא חלק מפרוייקט הוא מעוניין לדעת איך הוא יראה מספר שנים לאחר השלמתו",
  "בפתרון לבעיה צריך לקחת בחשבון גם שיקולים \"פוליטיים\" וארגוניים",
  "כדי להגיע להחלטה יש לבחון בעיה מנקודות מבט שונות",
  "לעיתים מומלץ לבדוק מה עוד אפשר לשפר גם אם משמעות הדבר היא אי עמידה בלוח הזמנים שהוגדר לביצוע המשימה",
  "לעיתים עדיף להעז ולקחת סיכונים",
  "כאשר מציגים מוצר חדש הדרוש לעבודה בפעם הראשונה עדיף לקבל כמה שיותר פרטים והסברים",
  "יש להבין שעמימות היא חלק בלתי נפרד מהמציאות שבה עובדים"
];

const RadioScaleQuestion = ({ questionText, name, currentValue, onChange }) => (
  <div className="rounded-lg border border-slate-200 bg-slate-50 p-4 transition-colors hover:bg-slate-100 dark:border-transparent dark:bg-[#2a2f42]/40 dark:hover:bg-[#2a2f42]/60">
    <p className="mb-4 text-sm font-medium text-slate-800 dark:text-slate-200">{questionText}</p>
    <div className="flex flex-wrap items-center justify-between gap-2 sm:px-4">
      <span className="hidden text-xs text-slate-500 sm:block dark:text-slate-400">מועטה מאוד</span>
      {[1, 2, 3, 4, 5].map((val) => (
        <label key={val} className="flex cursor-pointer flex-col items-center gap-1">
          <span className="text-sm text-slate-600 dark:text-slate-400">{val}</span>
          <input
            type="radio"
            name={name}
            value={val}
            checked={currentValue === String(val)}
            onChange={(e) => onChange(e.target.value)}
            className="h-5 w-5 accent-purple-600 dark:accent-purple-500"
            required
          />
        </label>
      ))}
      <span className="hidden text-xs text-slate-500 sm:block dark:text-slate-400">רבה מאוד</span>
    </div>
  </div>
);

function PostTaskSurvey({ onDone }) {
  const { sessionInfo } = useSession();
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form State
  const [likertAnswers, setLikertAnswers] = useState({});
  const [perceivedEffort, setPerceivedEffort] = useState("");
  const [satisfaction, setSatisfaction] = useState("");
  const [didQuestionsHelpThinking, setDidQuestionsHelpThinking] = useState("");
  const [didBotGiveAnswers, setDidBotGiveAnswers] = useState(null);
  const [feedback, setFeedback] = useState("");

  const handleLikertChange = (index, value) => {
    setLikertAnswers((prev) => ({ ...prev, [index]: value }));
  };

  const isFormValid = 
    Object.keys(likertAnswers).length === SYSTEMS_THINKING_QUESTIONS.length &&
    perceivedEffort !== "" &&
    satisfaction !== "" &&
    didQuestionsHelpThinking !== "" &&
    (sessionInfo?.group !== "Experimental Group" || didBotGiveAnswers !== null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isFormValid) return;
    setIsSubmitting(true);

    const postTaskData = {
      studentId: sessionInfo.userId, 
      likertAnswers: likertAnswers,
      perceivedEffort: Number(perceivedEffort), 
      satisfaction: Number(satisfaction),
      didQuestionsHelpThinking: Number(didQuestionsHelpThinking),
      didBotGiveAnswers: didBotGiveAnswers,
      feedback: feedback,
    };

    try {
      await submitPostTask(postTaskData);
      console.log("Submitting Post-Task:", postTaskData);
      await new Promise(resolve => setTimeout(resolve, 1000));
      window.location.href = "/"; 
    } catch (error) {
      console.error("Failed to submit survey", error);
      alert("Failed to submit survey. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="mx-auto w-full max-w-4xl px-4 py-8" dir="rtl">
      <div className="mb-8 text-center animate-in fade-in slide-in-from-bottom-4">
        <h1 className="text-3xl font-extrabold text-slate-900 md:text-4xl dark:text-white">שאלון מסכם</h1>
        <p className="mt-3 text-slate-600 dark:text-slate-400">אנא ענה על השאלות הבאות בכנות. תשובותיך יעזרו לנו במחקר.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6 sm:space-y-8 animate-in fade-in duration-700">
        
        {/* SECTION 1: SYSTEMS THINKING (27 Questions) */}
        <section className="rounded-2xl border border-slate-200 bg-white/80 p-5 shadow-xl backdrop-blur-xl sm:p-6 md:p-8 dark:border-white/5 dark:bg-[#1e2333]/80 dark:shadow-2xl">
          <div className="mb-6 border-b border-slate-200 pb-4 dark:border-white/10">
            <h2 className="text-xl sm:text-2xl font-bold text-indigo-600 dark:text-indigo-400">חשיבה מערכתית</h2>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
              סמן את מידת ההסכמה שלך לכל אחת מהשאלות הבאות בסולם של 1 (במידה מועטה מאוד) עד 5 (במידה רבה מאוד):
            </p>
          </div>
          
          <div className="space-y-4">
            {SYSTEMS_THINKING_QUESTIONS.map((question, idx) => (
              <RadioScaleQuestion 
                key={idx}
                questionText={`${idx + 1}. ${question}`}
                name={`likert-${idx}`}
                currentValue={likertAnswers[idx]}
                onChange={(val) => handleLikertChange(idx, val)}
              />
            ))}
          </div>
        </section>

        {/* SECTION 2: EXPERIENCE METRICS */}
        <section className="rounded-2xl border border-slate-200 bg-white/80 p-5 shadow-xl backdrop-blur-xl sm:p-6 md:p-8 dark:border-white/5 dark:bg-[#1e2333]/80 dark:shadow-2xl">
          <div className="mb-6 border-b border-slate-200 pb-4 dark:border-white/10">
            <h2 className="text-xl sm:text-2xl font-bold text-green-600 dark:text-green-400">חווית המשתמש והמשימה</h2>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
              אנא דרג את החוויה שלך במשימה (1 = מועטה מאוד, 5 = רבה מאוד):
            </p>
          </div>
          
          <div className="space-y-4">
            <RadioScaleQuestion 
              questionText="עד כמה התאמצת במהלך ביצוע המשימה?" 
              name="perceivedEffort"
              currentValue={perceivedEffort} 
              onChange={setPerceivedEffort} 
            />
            <RadioScaleQuestion 
              questionText="עד כמה אתה שבע רצון מהפתרון שהצעת?" 
              name="satisfaction"
              currentValue={satisfaction} 
              onChange={setSatisfaction} 
            />
            <RadioScaleQuestion 
              questionText="באיזו מידה השאלות של הבוט עזרו לך לחשוב בצורה רחבה יותר?" 
              name="didQuestionsHelpThinking"
              currentValue={didQuestionsHelpThinking} 
              onChange={setDidQuestionsHelpThinking} 
            />
          </div>
        </section>

        {/* SECTION 3: MANIPULATION CHECK (Only for Experimental Group) */}
        {sessionInfo?.group === "Experimental Group" && (
          <section className="rounded-2xl border border-slate-200 bg-white/80 p-5 shadow-xl backdrop-blur-xl sm:p-6 md:p-8 dark:border-white/5 dark:bg-[#1e2333]/80 dark:shadow-2xl">
            <h2 className="mb-4 text-lg sm:text-xl font-bold text-orange-600 dark:text-orange-400">בדיקת מערכת</h2>
            <p className="mb-4 text-sm text-slate-600 dark:text-slate-300">האם הבוט סיפק לך תשובות ישירות ופתרונות, או רק שאל שאלות מנחות?</p>
            <div className="flex flex-col gap-4 sm:flex-row">
              <label className={`flex-1 cursor-pointer rounded-xl border p-4 text-center font-bold transition-all ${
                  didBotGiveAnswers === false
                    ? "border-orange-500 bg-orange-50 text-orange-700 dark:bg-orange-500/20 dark:text-orange-300"
                    : "border-slate-200 bg-slate-50 text-slate-600 hover:border-orange-300 dark:border-white/10 dark:bg-black/20 dark:text-slate-400 dark:hover:border-orange-500/50"
                }`}
              >
                <input 
                  type="radio" 
                  name="manipulation" 
                  className="hidden" 
                  onChange={() => setDidBotGiveAnswers(false)} 
                  required 
                />
                רק שאל שאלות מנחות
              </label>
              <label className={`flex-1 cursor-pointer rounded-xl border p-4 text-center font-bold transition-all ${
                  didBotGiveAnswers === true
                    ? "border-orange-500 bg-orange-50 text-orange-700 dark:bg-orange-500/20 dark:text-orange-300"
                    : "border-slate-200 bg-slate-50 text-slate-600 hover:border-orange-300 dark:border-white/10 dark:bg-black/20 dark:text-slate-400 dark:hover:border-orange-500/50"
                }`}
              >
                <input 
                  type="radio" 
                  name="manipulation" 
                  className="hidden" 
                  onChange={() => setDidBotGiveAnswers(true)} 
                  required 
                />
                סיפק פתרונות ותשובות
              </label>
            </div>
          </section>
        )}

        {/* SECTION 4: OPEN FEEDBACK */}
        <section className="rounded-2xl border border-slate-200 bg-white/80 p-5 shadow-xl backdrop-blur-xl sm:p-6 md:p-8 dark:border-white/5 dark:bg-[#1e2333]/80 dark:shadow-2xl">
          <h2 className="mb-4 text-lg sm:text-xl font-bold text-blue-600 dark:text-blue-400">הערות נוספות (רשות)</h2>
          <textarea
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            placeholder="האם יש לך הארות, הערות או תובנות נוספות על המערכת?"
            className="h-32 w-full resize-none rounded-xl border border-slate-200 bg-slate-50 p-4 text-slate-900 placeholder-slate-400 transition-all focus:border-purple-500 focus:bg-white focus:outline-none focus:ring-1 focus:ring-purple-500 dark:border-white/10 dark:bg-black/20 dark:text-slate-200 dark:placeholder-slate-500 dark:focus:border-purple-500"
          ></textarea>
        </section>

        {/* SUBMIT BUTTON */}
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={!isFormValid || isSubmitting}
            className={`flex w-full items-center justify-center rounded-xl px-8 py-4 text-lg font-bold transition-all md:w-auto ${
              isFormValid && !isSubmitting
                ? "bg-gradient-to-r from-purple-600 to-indigo-600 text-white hover:scale-[1.02] hover:shadow-lg hover:shadow-purple-500/30 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-[#1e2333]"
                : "cursor-not-allowed bg-slate-200 text-slate-400 dark:bg-slate-800 dark:text-slate-500"
            }`}
          >
            {isSubmitting ? (
              <span className="flex items-center gap-2">
                <span className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent"></span>
                שולח נתונים...
              </span>
            ) : (
              "סיים משימה והתנתק"
            )}
          </button>
        </div>

      </form>
    </div>
  );
}

export default PostTaskSurvey;