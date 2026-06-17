import { useState } from "react";
import { submitPreTask } from "../../services/questionnaireService";
import { useSession } from "../../Context/SessionContext";

const likertQuestions = [
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

function PreTaskSurvey({ onDone }) {
  const { sessionInfo } = useSession();

  const [form, setForm] = useState({
    consent: "",
    gender: "",
    age: "",
    education: "",
    workedInSE: "",
    roleAndExperience: "",
    studiedSE: "",
    usedSocraticBot: "",
    socraticBotExperience: "",
    openQ1: "",
    openQ2: "",
    likertAnswers: {}
  });

  const [error, setError] = useState("");

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleLikertChange(index, value) {
    setForm({
      ...form,
      likertAnswers: {
        ...form.likertAnswers,
        [index]: value,
      },
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    if (form.consent !== "מסכים/ה להשתתף") {
      setError("עליך להסכים לתנאי ההשתתפות כדי להמשיך.");
      return;
    }

    if (Object.keys(form.likertAnswers).length !== likertQuestions.length) {
      setError("אנא ודא/י שענית על כל שאלות ההערכה (סולם 1-5).");
      return;
    }

    try {
      await submitPreTask({
        studentId: sessionInfo.userId,
        ...form,
      });
      onDone();
    } catch (err) {
      setError("שגיאה בשליחת השאלון. אנא נסה/י שוב.");
      console.error(err);
    }
  }

  const RadioOption = ({ name, value, label }) => (
    <label className="flex cursor-pointer items-center gap-3 text-slate-200 transition-colors hover:text-white">
      <input
        type="radio"
        name={name}
        value={value}
        checked={form[name] === value}
        onChange={handleChange}
        className="h-5 w-5 accent-purple-500"
        required
      />
      <span>{label}</span>
    </label>
  );

  return (
    <div className="relative w-full">
      
      {/* FIXED BACKGROUND LAYER: This stays locked to the screen while you scroll */}
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        <div className="absolute -left-40 top-[-10%] h-[600px] w-[600px] animate-pulse rounded-full bg-purple-700/20 blur-[120px]"></div>
        <div 
          className="absolute bottom-[-10%] right-[-10%] h-[700px] w-[700px] animate-pulse rounded-full bg-indigo-700/20 blur-[120px]" 
          style={{ animationDuration: '4s' }}
        ></div>
        <div 
          className="absolute left-[30%] top-[40%] h-[400px] w-[400px] animate-pulse rounded-full bg-fuchsia-600/10 blur-[120px]" 
          style={{ animationDuration: '6s' }}
        ></div>
      </div>
      {/* ----------------------------- */}

      {/* Main Content: z-10 keeps it above the fixed background */}
      <div dir="rtl" className="relative z-10 mx-auto max-w-4xl px-4 pb-10 pt-8">
        <div className="mb-8 text-center">
          <h2 className="text-3xl font-extrabold text-white">שאלון טרום-משימה</h2>
          <p className="mt-2 text-slate-400">
            אנא ענה/י על השאלות הבאות לפני תחילת העבודה עם הצ'אט-בוט
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          
          <section className="rounded-2xl border border-white/5 bg-[#1e2333]/80 p-6 shadow-xl backdrop-blur-xl md:p-8">
            <h3 className="mb-6 text-xl font-bold text-white">פרטים כלליים והסכמה</h3>
            
            <div className="space-y-6">
              <div className="space-y-3 rounded-lg bg-[#2a2f42]/40 p-4">
                <p className="font-semibold text-slate-200">
                  אני מצהיר/ה בזאת שגילי לפחות 18 שנה, קראתי והבנתי את האמור לעיל, אני מעוניין/ת להשתתף במחקר זה:
                </p>
                <div className="flex flex-col gap-3 md:flex-row md:gap-8">
                  <RadioOption name="consent" value="מסכים/ה להשתתף" label="מסכים/ה להשתתף" />
                  <RadioOption name="consent" value="לא מסכים/ה להשתתף" label="לא מסכים/ה להשתתף" />
                </div>
              </div>

              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div className="space-y-3">
                  <label className="block font-semibold text-slate-200">מגדר *</label>
                  <div className="flex flex-col gap-2">
                    <RadioOption name="gender" value="זכר" label="זכר" />
                    <RadioOption name="gender" value="נקבה" label="נקבה" />
                    <RadioOption name="gender" value="אחר" label="אחר" />
                  </div>
                </div>

                <div className="space-y-3">
                  <label className="block font-semibold text-slate-200">גיל *</label>
                  <div className="flex flex-col gap-2">
                    <RadioOption name="age" value="18-25" label="18-25" />
                    <RadioOption name="age" value="26-30" label="26-30" />
                    <RadioOption name="age" value="31-40" label="31-40" />
                    <RadioOption name="age" value="מעל 40" label="מעל 40" />
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="rounded-2xl border border-white/5 bg-[#1e2333]/80 p-6 shadow-xl backdrop-blur-xl md:p-8">
            <h3 className="mb-6 text-xl font-bold text-white">השכלה וניסיון תעסוקתי</h3>
            
            <div className="space-y-6">
              <div>
                <label className="mb-2 block font-semibold text-slate-200">
                  במידה ויש לך תואר הנדסאי, תואר אקדמי או תואר כלשהו אחר, אנא ציין/י באיזה תחום
                </label>
                <input
                  name="education"
                  value={form.education}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-transparent bg-[#2a2f42]/80 p-3.5 text-white transition-all focus:border-purple-500 focus:bg-[#2a2f42] focus:outline-none focus:ring-1 focus:ring-purple-500"
                  placeholder="הכנס/י טקסט כאן..."
                />
              </div>

              <div className="space-y-3">
                <label className="block font-semibold text-slate-200">
                  האם הינך עובד/ת או עבדת בעבר בתחום הנדסת מערכות? *
                </label>
                <div className="flex gap-8">
                  <RadioOption name="workedInSE" value="כן" label="כן" />
                  <RadioOption name="workedInSE" value="לא" label="לא" />
                </div>
              </div>

              {form.workedInSE === "כן" && (
                <div>
                  <label className="mb-2 block font-semibold text-purple-300">
                    במידה וכן, נא ציין/י מהו התפקיד ומספר שנות ניסיון
                  </label>
                  <input
                    name="roleAndExperience"
                    value={form.roleAndExperience}
                    onChange={handleChange}
                    className="w-full rounded-lg border border-transparent bg-[#2a2f42]/80 p-3.5 text-white transition-all focus:border-purple-500 focus:bg-[#2a2f42] focus:outline-none focus:ring-1 focus:ring-purple-500"
                    required
                  />
                </div>
              )}

              <div className="space-y-3">
                <label className="block font-semibold text-slate-200">
                  האם הינך לומד/ת או למדת בעבר קורס בתחום הנדסת מערכות או חשיבה מערכתית? *
                </label>
                <div className="flex gap-8">
                  <RadioOption name="studiedSE" value="כן" label="כן" />
                  <RadioOption name="studiedSE" value="לא" label="לא" />
                </div>
              </div>
            </div>
          </section>

          <section className="rounded-2xl border border-white/5 bg-[#1e2333]/80 p-6 shadow-xl backdrop-blur-xl md:p-8">
            <h3 className="mb-6 text-xl font-bold text-white">ניסיון עם בינה מלאכותית</h3>
            
            <div className="space-y-6">
              <div className="space-y-3">
                <label className="block font-semibold text-slate-200">
                  האם התנסית בעבר בשימוש בבוט סוקרטי? *
                </label>
                <div className="flex flex-col gap-2">
                  <RadioOption name="usedSocraticBot" value="כן" label="כן" />
                  <RadioOption name="usedSocraticBot" value="לא" label="לא" />
                  <RadioOption name="usedSocraticBot" value="לא בטוח/ה" label="לא בטוח/ה" />
                </div>
              </div>

              {form.usedSocraticBot === "כן" && (
                <div className="rounded-lg border border-purple-500/30 bg-purple-900/10 p-4">
                  <label className="mb-3 block font-semibold text-purple-300">
                    במידה וכן, מהי מידת ההתנסות הקודמת שלך בשימוש בבוט סוקרטי?
                  </label>
                  <div className="flex flex-col gap-2">
                    <RadioOption name="socraticBotExperience" value="ניסיון מועט" label="ניסיון מועט" />
                    <RadioOption name="socraticBotExperience" value="ניסיון בינוני" label="ניסיון בינוני" />
                    <RadioOption name="socraticBotExperience" value="ניסיון רב" label="ניסיון רב" />
                  </div>
                </div>
              )}
            </div>
          </section>

          <section className="rounded-2xl border border-white/5 bg-[#1e2333]/80 p-6 shadow-xl backdrop-blur-xl md:p-8">
            <h3 className="mb-2 text-xl font-bold text-white">חשיבה מערכתית - הערכה אישית</h3>
            <p className="mb-6 text-sm text-slate-400">
              סמן את מידת ההסכמה שלך לכל אחת מהשאלות הבאות בסולם של 1 (במידה מועטה מאוד) עד 5 (במידה רבה מאוד):
            </p>

            <div className="space-y-4">
              {likertQuestions.map((question, idx) => (
                <div key={idx} className="rounded-lg bg-[#2a2f42]/40 p-4 transition-colors hover:bg-[#2a2f42]/60">
                  <p className="mb-4 text-sm font-medium text-slate-200">{idx + 1}. {question}</p>
                  <div className="flex flex-wrap items-center justify-between gap-2 sm:px-4">
                    <span className="hidden text-xs text-slate-500 sm:block">מועטה מאוד</span>
                    {[1, 2, 3, 4, 5].map((val) => (
                      <label key={val} className="flex cursor-pointer flex-col items-center gap-1">
                        <span className="text-sm text-slate-400">{val}</span>
                        <input
                          type="radio"
                          name={`likert-${idx}`}
                          value={val}
                          checked={form.likertAnswers[idx] === String(val)}
                          onChange={(e) => handleLikertChange(idx, e.target.value)}
                          className="h-5 w-5 accent-purple-500"
                          required
                        />
                      </label>
                    ))}
                    <span className="hidden text-xs text-slate-500 sm:block">רבה מאוד</span>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="rounded-2xl border border-white/5 bg-[#1e2333]/80 p-6 shadow-xl backdrop-blur-xl md:p-8">
            <h3 className="mb-6 text-xl font-bold text-white">שאלות פתוחות</h3>
            
            <div className="space-y-6">
              <div>
                <label className="mb-2 block font-semibold text-slate-200">
                  אילו סוגי שאלות את/ה שואל/ת את עצמך כשאת/ה מנסה להבין בעיה? *
                </label>
                <textarea
                  name="openQ1"
                  value={form.openQ1}
                  onChange={handleChange}
                  rows="3"
                  className="w-full rounded-lg border border-transparent bg-[#2a2f42]/80 p-3.5 text-white transition-all focus:border-purple-500 focus:bg-[#2a2f42] focus:outline-none focus:ring-1 focus:ring-purple-500"
                  required
                />
              </div>

              <div>
                <label className="mb-2 block font-semibold text-slate-200">
                  תאר/י מצב שבו פתרון שבחרת הוביל להיווצרות בעיה נוספת שלא נלקחה בחשבון *
                </label>
                <textarea
                  name="openQ2"
                  value={form.openQ2}
                  onChange={handleChange}
                  rows="4"
                  className="w-full rounded-lg border border-transparent bg-[#2a2f42]/80 p-3.5 text-white transition-all focus:border-purple-500 focus:bg-[#2a2f42] focus:outline-none focus:ring-1 focus:ring-purple-500"
                  required
                />
              </div>
            </div>
          </section>

          {error && (
            <div className="rounded-lg border border-red-500/50 bg-red-500/10 p-4 text-center text-red-400">
              {error}
            </div>
          )}

          <button
            type="submit"
            className="w-full rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 py-4 text-lg font-bold text-white shadow-lg shadow-purple-500/20 transition-all hover:scale-[1.01] hover:shadow-purple-500/40 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-[#1e2333]"
          >
            סיים/י שאלון והתחל/י משימה
          </button>
        </form>
      </div>
    </div>
  );
}

export default PreTaskSurvey;