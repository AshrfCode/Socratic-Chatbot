import { useState, useEffect } from "react";
import { getChatMessages } from "../../services/chatService"; 

function StudentChatView({ student, onBack }) {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchTranscript() {
      if (!student.chatId) {
        setLoading(false);
        return;
      }
      try {
        const data = await getChatMessages(student.chatId);
        setMessages(data);
      } catch (error) {
        console.error("Failed to load transcript", error);
      } finally {
        setLoading(false);
      }
    }
    fetchTranscript();
  }, [student.chatId]);

  // NEW: Helper function to turn MongoDB timestamps into readable 24-hour time (e.g., 14:35:10)
  const formatTime = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
  };

  return (
    <section className="mt-6 flex h-[800px] flex-col overflow-hidden rounded-2xl border border-white/5 bg-[#1e2333]/80 shadow-2xl backdrop-blur-xl animate-in fade-in duration-300">
      
      {/* Header with Back Button */}
      <div className="flex flex-shrink-0 items-center justify-between border-b border-white/10 bg-[#2a2f42]/80 p-6">
        <div>
          <button 
            onClick={onBack}
            className="mb-4 flex items-center gap-2 text-sm font-semibold text-slate-400 transition hover:text-indigo-400"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Dashboard
          </button>
          <h2 className="text-3xl font-extrabold text-white">Chat Transcript: {student.studentName}</h2>
          <p className="mt-1 text-sm text-indigo-400">Total Messages: {messages.length}</p>
        </div>
      </div>

      {/* Chat Log Body */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-black/20">
        {loading ? (
          <div className="flex h-full items-center justify-center">
            <span className="h-8 w-8 animate-spin rounded-full border-4 border-indigo-500 border-t-transparent"></span>
          </div>
        ) : messages.length === 0 ? (
          <div className="flex h-full items-center justify-center">
            <p className="text-lg text-slate-500">No chat history available for this session.</p>
          </div>
        ) : (
          messages.map((msg, idx) => {
            const isUser = msg.sender === "user";
            const isSystem = msg.sender === "system";

            if (isSystem) {
              return (
                <div key={idx} className="my-6 flex w-full justify-center">
                  <span className="rounded-full border border-white/5 bg-white/5 px-6 py-2 text-xs font-bold uppercase tracking-wider text-slate-400 backdrop-blur-sm">
                    ⏱️ {msg.text}
                  </span>
                </div>
              );
            }

            return (
              <div key={idx} className={`flex w-full ${isUser ? "justify-end" : "justify-start"}`}>
                <div className={`min-w-[250px] max-w-[70%] px-6 py-4 shadow-md ${
                  isUser 
                    ? "rounded-2xl rounded-br-sm bg-gradient-to-br from-indigo-600 to-purple-600 text-white" 
                    : "rounded-2xl rounded-bl-sm border border-white/5 bg-[#2a2f42] text-slate-200"
                }`}>
                  {/* NEW: Added a flex container here to push the name left and the time right */}
                  <div className={`mb-2 flex items-center justify-between text-xs font-bold uppercase tracking-wider ${isUser ? "text-indigo-200" : "text-purple-400"}`}>
                    <span>{isUser ? "Student" : "SystemThinker AI"}</span>
                    <span className="ml-4 font-normal tracking-normal opacity-70">
                      {formatTime(msg.createdAt)}
                    </span>
                  </div>
                  <p className="text-[15px] leading-relaxed" dir="auto">{msg.text}</p>
                </div>
              </div>
            );
          })
        )}
      </div>
    </section>
  );
}

export default StudentChatView;