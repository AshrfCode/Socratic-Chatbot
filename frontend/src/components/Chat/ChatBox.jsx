import { useEffect, useState } from "react";
import { getChatMessages, sendChatMessage } from "../../services/chatService";
import ChatHeader from "./ChatHeader";
import ChatMessages from "./ChatMessages";
import ChatInput from "./ChatInput";
import HintButton from "./HintButton";
import { useSession } from "../../Context/SessionContext";

function ChatBox() {
  const { sessionInfo, updateAfterMessage, updateSessionStatus } = useSession();

  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const chatId = sessionInfo?.chatId;
  const sessionId = sessionInfo?.sessionId;
  const userId = sessionInfo?.userId;

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

    try {
      const response = await sendChatMessage(chatId, {
        sessionId,
        studentId: userId,
        text: input,
      });

      setMessages((prev) => {
        const updated = [...prev, response.userMessage];
        if (response.botMessage) updated.push(response.botMessage);
        return updated;
      });

      updateAfterMessage(response.session);
      setInput("");
    } catch (error) {
      console.error("Failed to send message", error);
    }
  }

  // --- TIMER LOGIC ---
  function handleTimerReminder(messageText) {
    // Inject the neutral F-08 reminder directly into the chat log!
    setMessages((prev) => [
      ...prev,
      { _id: Date.now().toString(), sender: "system", text: messageText }
    ]);
  }

  function handleTimeUp() {
    if (updateSessionStatus) {
      updateSessionStatus("completed");
    }
  }

  if (!sessionInfo) return null;

  return (
    <section className="flex h-[650px] flex-col overflow-hidden rounded-2xl border border-white/5 bg-[#1e2333]/80 shadow-2xl backdrop-blur-xl">
      {/* Pass the timer logic down to the header */}
      <ChatHeader onTimeUp={handleTimeUp} onReminder={handleTimerReminder} />

      <ChatMessages messages={messages} />

      <div className="px-5 pt-2">
        {sessionInfo.group === "Control Group" ? (
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