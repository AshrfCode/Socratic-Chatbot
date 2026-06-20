import { useLayoutEffect, useRef } from "react";
import ChatMessage from "./ChatMessage";

function ChatMessages({ messages, isTyping }) {
  const messagesEndRef = useRef(null);

  useLayoutEffect(() => {
    // Scroll down when a new message arrives OR when the typing indicator appears
    requestAnimationFrame(() => {
      messagesEndRef.current?.scrollIntoView({ behavior: "auto" });
    });
  }, [messages, isTyping]); 

  // Bulletproof fallback to absolutely guarantee the app never crashes if messages are delayed
  const safeMessages = messages || [];

  return (
    <div className="flex-1 space-y-6 overflow-y-auto bg-[#0f121b]/40 p-5">
      
      {/* 1. THE PERMANENT STORY CARD */}
      <div className="mx-auto mb-8 mt-2 flex w-full max-w-[95%] flex-col rounded-2xl border border-indigo-500/20 bg-indigo-950/30 p-6 shadow-xl backdrop-blur-md" dir="rtl">
        <h3 className="mb-4 text-2xl font-extrabold tracking-tight text-indigo-400">סיפור הרקע</h3>
        <p className="mb-2 text-[15px] leading-relaxed text-slate-300">
          גלידרייה שכונתית קטנה ואהובה עם מתכון סודי שעובר במשך שלושה דורות.
        </p>
        <p className="mb-6 text-[15px] leading-relaxed text-slate-300">
          אנשים מגיעים ממרחקים במיוחד כדי לטעום את הגלידה, מה שיוצר תורים ענקיים בשעות העומס.
        </p>
        
        <div className="mb-6 rounded-xl border border-indigo-500/30 bg-indigo-500/10 p-4 shadow-inner">
          <p className="text-lg font-bold leading-snug text-indigo-300">
            המשימה: פתרון בעיית התורים תוך שמירה על איכות, מסורת ושביעות הרצון של כולם.
          </p>
        </div>

        <h4 className="mb-3 text-lg font-bold text-indigo-400">עקרונות חשיבה מערכתית:</h4>
        <ul className="list-inside list-disc space-y-2 text-[15px] text-slate-300">
          <li>הבנת המערכת כשלם וראיית התמונה הגדולה</li>
          <li>הגדרת גבולות המערכת (גורמים לא הנדסיים)</li>
          <li>הבנת ההשלכות של שינויים מוצעים</li>
        </ul>
      </div>

      {/* 2. INITIAL AI GREETING (Only shows if the chat is completely empty) */}
      {safeMessages.length === 0 && !isTyping && (
        <div className="flex w-full justify-start animate-in fade-in duration-700 mb-6" dir="ltr">
          <div className="flex w-fit max-w-[80%] items-end gap-2">
            <div className="rounded-2xl rounded-tl-none border border-white/5 bg-[#2a2f42] px-6 py-4 shadow-md">
              <p className="mb-2 text-[10px] font-bold uppercase tracking-wider text-purple-400">
                SystemThinker AI
              </p>
              <p className="text-[15px] leading-relaxed text-slate-200" dir="rtl">
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
          <div className="flex w-fit items-center gap-1.5 rounded-2xl rounded-tl-none border border-white/5 bg-[#2a2f42] px-5 py-4 shadow-md">
            <span className="h-2 w-2 animate-bounce rounded-full bg-purple-400"></span>
            <span className="h-2 w-2 animate-bounce rounded-full bg-purple-400" style={{ animationDelay: '0.15s' }}></span>
            <span className="h-2 w-2 animate-bounce rounded-full bg-purple-400" style={{ animationDelay: '0.3s' }}></span>
          </div>
        </div>
      )}

      {/* The invisible anchor at the bottom of the list! */}
      <div ref={messagesEndRef} />
    </div>
  );
}

export default ChatMessages;