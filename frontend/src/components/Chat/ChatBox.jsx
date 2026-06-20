import { useEffect, useState, useRef } from "react";
import { getChatMessages, sendChatMessage } from "../../services/chatService";
import ChatHeader from "./ChatHeader";
import ChatMessages from "./ChatMessages";
import ChatInput from "./ChatInput";
import HintButton from "./HintButton";
import { useSession } from "../../Context/SessionContext";

function ChatBox() {
  const { sessionInfo, updateAfterMessage, updateSessionStatus } = useSession();

  // --- THE ANTI-FLASH SHIELD ---
  // If the global context momentarily drops the session during an update, 
  // we fall back to this memory so the screen NEVER goes black.
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

  // Use the safeSession everywhere instead of sessionInfo
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
        const updated = [...filtered, response.userMessage];
        if (response.botMessage) updated.push(response.botMessage);
        return updated;
      });

      // This is what was causing the flash before, but our shield protects it now!
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

  // Use safeSession here so we never return null once the chat is loaded
  if (!safeSession) return null;

  return (
    <section className="relative flex h-[650px] flex-col overflow-hidden rounded-2xl border border-white/5 bg-[#1e2333]/80 shadow-2xl backdrop-blur-xl">
      <ChatHeader 
        startTime={safeSession?.createdAt || stableFallbackTime} 
        onTimeUp={handleTimeUp} 
        onReminder={handleTimerReminder} 
      />

      {reminderBanner && (
        <div className="absolute left-0 right-0 top-24 z-50 mx-auto w-fit animate-in fade-in slide-in-from-top-4 duration-500">
          <div className="rounded-full border border-purple-500/30 bg-purple-500/20 px-6 py-2 text-sm font-medium text-purple-200 shadow-lg backdrop-blur-md">
            ⚠️ {reminderBanner}
          </div>
        </div>
      )}

      <ChatMessages messages={messages} isTyping={isTyping} />

      <div className="px-5 pt-2">
        {safeSession.group === "Control Group" ? (
          <div className="flex items-center gap-3 rounded-lg border border-yellow-500/20 bg-yellow-500/10 p-3 text-sm text-yellow-200 backdrop-blur-md">
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