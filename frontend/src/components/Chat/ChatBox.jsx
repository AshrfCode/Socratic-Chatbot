import { useEffect, useState, useRef } from "react";
import { getChatMessages, sendChatMessage } from "../../services/chatService";
import ChatHeader from "./ChatHeader";
import ChatMessages from "./ChatMessages";
import ChatInput from "./ChatInput";
import HintButton from "./HintButton";
import { useSession } from "../../Context/SessionContext";

function ChatBox() {
  const { sessionInfo, updateAfterMessage, updateSessionStatus } = useSession();

  const safeSessionRef = useRef(sessionInfo);
  if (sessionInfo) {
    safeSessionRef.current = sessionInfo;
  }
  const safeSession = sessionInfo || safeSessionRef.current;

  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [reminderBanner, setReminderBanner] = useState(null);
  const [isTyping, setIsTyping] = useState(false);

  const stableFallbackTime = useRef(Date.now()).current;

  const chatId = safeSession?.chatId;
  const sessionId = safeSession?.sessionId;
  const userId = safeSession?.userId;

  useEffect(() => {
    async function loadMessages() {
      if (!chatId) return;
      try {
        const data = await getChatMessages(chatId);
        setMessages(data);
      } catch (error) {
        console.error("Failed to load messages", error);
      }
    }
    loadMessages();
  }, [chatId]);

  async function sendMessage() {
    if (!input.trim()) return;
    if (!chatId || !sessionId || !userId) return;

    const textToSend = input;
    setInput("");

    const tempId = "temp-" + Date.now();
    const tempUserMessage = {
      _id: tempId,
      sender: "user",
      text: textToSend,
      createdAt: new Date().toISOString(),
    };

    setMessages((prev) => [...prev, tempUserMessage]);
    setIsTyping(true);

    try {
      const response = await sendChatMessage(chatId, {
        sessionId,
        studentId: userId,
        text: textToSend,
      });

      setMessages((prev) => {
        const filtered = prev.filter((m) => m._id !== tempId);
        const updated = [...filtered];
        
        if (response.userMessage) {
          updated.push(response.userMessage);
        } else {
          updated.push(tempUserMessage); 
        }

        if (response.botMessage) {
          updated.push(response.botMessage);
        }
        
        return updated;
      });

      updateAfterMessage(response.session);
    } catch (error) {
      console.error("Failed to send message", error);
      setMessages((prev) => prev.filter((m) => m._id !== tempId));
      setInput(textToSend);
    } finally {
      setIsTyping(false);
    }
  }

  function handleTimerReminder(messageText) {
    setReminderBanner(messageText);
    setTimeout(() => {
      setReminderBanner(null);
    }, 8000);
  }

  function handleTimeUp() {
    if (updateSessionStatus) {
      updateSessionStatus("completed");
    }
  }

  if (!safeSession) return null;

  return (
    <section className="relative flex h-[75vh] min-h-[500px] sm:h-[650px] w-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white/80 shadow-xl backdrop-blur-xl transition-colors dark:border-white/5 dark:bg-[#1e2333]/80 dark:shadow-2xl">
      <ChatHeader 
        startTime={safeSession?.createdAt || stableFallbackTime} 
        onTimeUp={handleTimeUp} 
        onReminder={handleTimerReminder} 
      />

      {reminderBanner && (
        <div className="absolute left-0 right-0 top-24 z-50 mx-auto w-[90%] max-w-sm animate-in fade-in slide-in-from-top-4 duration-500 sm:w-fit">
          <div className="rounded-full border border-purple-200 bg-purple-50 px-4 py-2 text-center text-xs font-medium text-purple-700 shadow-lg backdrop-blur-md sm:px-6 sm:text-sm dark:border-purple-500/30 dark:bg-purple-500/20 dark:text-purple-200">
            ⚠️ {reminderBanner}
          </div>
        </div>
      )}

      <ChatMessages 
        messages={messages} 
        isTyping={safeSession.group === "Control Group" ? false : isTyping} 
      />

      <div className="px-4 pt-2 sm:px-5">
        {safeSession.group === "Control Group" ? (
          <div className="flex items-center gap-3 rounded-lg border border-yellow-200 bg-yellow-50 p-3 text-xs sm:text-sm text-yellow-800 backdrop-blur-md dark:border-yellow-500/20 dark:bg-yellow-500/10 dark:text-yellow-200">
            <svg className="h-5 w-5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <p>You are in the Control Group. Your text will be saved, but the AI chatbot is disabled.</p>
          </div>
        ) : (
          <HintButton
            chatId={chatId}
            sessionId={sessionId}
            studentId={userId}
            onHint={(hintMessage, updatedSession) => {
              setMessages((prev) => [...prev, hintMessage]);
              updateAfterMessage(updatedSession);
            }}
          />
        )}
      </div>

      <ChatInput input={input} setInput={setInput} sendMessage={sendMessage} />
    </section>
  );
}

export default ChatBox;