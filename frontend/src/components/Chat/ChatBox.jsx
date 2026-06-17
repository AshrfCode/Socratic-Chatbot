import { useEffect, useState } from "react";
import {
  getChatMessages,
  sendChatMessage,
} from "../../services/chatService";

import ChatHeader from "./ChatHeader";
import ChatMessages from "./ChatMessages";
import ChatInput from "./ChatInput";
import HintButton from "./HintButton";
import { useSession } from "../../Context/SessionContext";

function ChatBox() {
  const { sessionInfo, updateAfterMessage } = useSession();

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
    if (!chatId || !sessionId || !userId) {
      console.error("Missing chatId, sessionId, or userId");
      return;
    }

    try {
      const response = await sendChatMessage(chatId, {
        sessionId,
        studentId: userId,
        text: input,
      });

      setMessages((prev) => {
        const updated = [...prev, response.userMessage];

        if (response.botMessage) {
          updated.push(response.botMessage);
        }

        return updated;
      });

      updateAfterMessage(response.session);
      setInput("");
    } catch (error) {
      console.error("Failed to send message", error);
    }
  }

  if (!sessionInfo) {
    return null;
  }

  return (
    <section className="rounded-3xl bg-white/10 p-6 text-white shadow-xl">
      <ChatHeader />

      <ChatMessages messages={messages} />

      {sessionInfo.group === "Control Group" ? (
        <p className="mt-4 rounded-xl bg-yellow-500/20 p-3 text-yellow-200">
          You are in the Control Group. Your text will be saved, but the AI
          chatbot is disabled.
        </p>
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

      <ChatInput
        input={input}
        setInput={setInput}
        sendMessage={sendMessage}
      />
    </section>
  );
}

export default ChatBox;