import { useLayoutEffect, useRef } from "react";
import ChatMessage from "./ChatMessage";

function ChatMessages({ messages, isTyping }) {
  const messagesEndRef = useRef(null);

  useLayoutEffect(() => {
    requestAnimationFrame(() => {
      messagesEndRef.current?.scrollIntoView({ behavior: "auto" });
    });
  }, [messages, isTyping]); 

  const safeMessages = messages || [];

  return (
    <div className="flex-1 space-y-6 overflow-y-auto bg-slate-100/50 p-4 sm:p-5 dark:bg-[#0f121b]/40">
      
      {/* 1. THE PERMANENT STORY CARD */}
      <div className="mx-auto mb-6 sm:mb-8 mt-2 flex w-full max-w-full sm:max-w-[95%] flex-col rounded-2xl border border-indigo-200 bg-indigo-50 p-5 sm:p-6 shadow-md backdrop-blur-md dark:border-indigo-500/20 dark:bg-indigo-950/30 dark:shadow-xl" dir="rtl">
        <h3 className="mb-3 sm:mb-4 text-xl sm:text-2xl font-extrabold tracking-tight text-indigo-700 dark:text-indigo-400">סיפור הרקע</h3>
        <p className="mb-2 text-sm sm:text-[15px] leading-relaxed text-slate-700 dark:text-slate-300">
          גלידרייה שכונתית קטנה ואהובה עם מתכון סודי שעובר במשך שלושה דורות.
        </p>
        <p className="mb-5 sm:mb-6 text-sm sm:text-[15px] leading-relaxed text-slate-700 dark:text-slate-300">
          אנשים מגיעים ממרחקים במיוחד כדי לטעום את הגלידה, מה שיוצר תורים ענקיים בשעות העומס.
        </p>
        
        <div className="mb-5 sm:mb-6 rounded-xl border border-indigo-200 bg-white/60 p-4 shadow-sm dark:border-indigo-500/30 dark:bg-indigo-500/10 dark:shadow-inner">
          <p className="text-base sm:text-lg font-bold leading-snug text-indigo-800 dark:text-indigo-300">
            המשימה: פתרון בעיית התורים תוך שמירה על איכות, מסורת ושביעות הרצון של כולם.
          </p>
        </div>

        <h4 className="mb-2 sm:mb-3 text-base sm:text-lg font-bold text-indigo-700 dark:text-indigo-400">עקרונות חשיבה מערכתית:</h4>
        <ul className="list-inside list-disc space-y-1.5 sm:space-y-2 text-sm sm:text-[15px] text-slate-700 dark:text-slate-300">
          <li>הבנת המערכת כשלם וראיית התמונה הגדולה</li>
          <li>הגדרת גבולות המערכת (גורמים לא הנדסיים)</li>
          <li>הבנת ההשלכות של שינויים מוצעים</li>
        </ul>
      </div>

      {/* 2. INITIAL AI GREETING */}
      {safeMessages.length === 0 && !isTyping && (
        <div className="flex w-full justify-start animate-in fade-in duration-700 mb-6" dir="ltr">
          <div className="flex w-fit max-w-[90%] sm:max-w-[80%] items-end gap-2">
            <div className="rounded-2xl rounded-tl-none border border-slate-200 bg-white px-4 py-3 sm:px-6 sm:py-4 shadow-md dark:border-white/5 dark:bg-[#2a2f42]">
              <p className="mb-1 sm:mb-2 text-[10px] font-bold uppercase tracking-wider text-purple-600 dark:text-purple-400">
                SystemThinker AI
              </p>
              <p className="text-sm sm:text-[15px] leading-relaxed text-slate-800 dark:text-slate-200" dir="rtl">
                שלום! מה המאפיינים הייחודיים של הגלידרייה שחשוב לשמור עליהם במהלך חיפוש פתרונות לבעיית התורים?
              </p>
            </div>
          </div>
        </div>
      )}

      {/* 3. THE REAL CHAT HISTORY */}
      {safeMessages.map((message) => (
        <ChatMessage key={message._id} message={message} />
      ))}
      
      {/* 4. THE TYPING INDICATOR */}
      {isTyping && (
        <div className="flex w-full justify-start animate-in fade-in slide-in-from-bottom-2 duration-300" dir="ltr">
          <div className="flex w-fit items-center gap-1.5 rounded-2xl rounded-tl-none border border-slate-200 bg-white px-4 py-3 sm:px-5 sm:py-4 shadow-md dark:border-white/5 dark:bg-[#2a2f42]">
            <span className="h-1.5 w-1.5 sm:h-2 sm:w-2 animate-bounce rounded-full bg-purple-600 dark:bg-purple-400"></span>
            <span className="h-1.5 w-1.5 sm:h-2 sm:w-2 animate-bounce rounded-full bg-purple-600 dark:bg-purple-400" style={{ animationDelay: '0.15s' }}></span>
            <span className="h-1.5 w-1.5 sm:h-2 sm:w-2 animate-bounce rounded-full bg-purple-600 dark:bg-purple-400" style={{ animationDelay: '0.3s' }}></span>
          </div>
        </div>
      )}

      <div ref={messagesEndRef} />
    </div>
  );
}

export default ChatMessages;