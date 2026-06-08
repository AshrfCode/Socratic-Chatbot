import { useEffect, useState } from "react";
import { getChatMessages, addChatMessage } from "../../services/chatService";
import ChatHeader from "./ChatHeader";
import ChatMessages from "./ChatMessages";
import ChatInput from "./ChatInput";
import HintButton from "./HintButton";
import { useSession } from "../../Context/SessionContext";

function ChatBox() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const { sessionInfo, increaseHintsUsed } = useSession();

  const chatId = sessionInfo?.chatId;

  useEffect(() => {
  if (!chatId) return;

  async function loadMessages() {
    try {
      const data = await getChatMessages(chatId);
      setMessages(data);
    } catch (error) {
      console.error("Failed to load messages", error);
    }
  }

  loadMessages();
}, [chatId]);

  function getCurrentTime() {
    return new Date().toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });
  }

  async function sendMessage() {
  if (input.trim() === "" || !chatId) return;

  const newUserMessage = {
    chatId,
    sender: "user",
    text: input,
  };

  try {
    const response = await addChatMessage(newUserMessage);

    setMessages((prev) => [
      ...prev,
      response.userMessage,
      response.botMessage,
    ]);

    setInput("");
  } catch (error) {
    console.error("Failed to send message", error);
  }
}

  async function getHint() {
    if (!chatId) return;

    const hintMessage = {
      chatId,
      sender: "bot",
      text: "Hint: Start by asking yourself: who is affected, what changes over time, and what feedback loop may appear?",
    };

    try {
      const savedHintMessage = await addChatMessage(hintMessage);
      await increaseHintsUsed();

      setMessages((prev) => [...prev, savedHintMessage]);
    } catch (error) {
      console.error("Failed to get hint", error);
    }
  }

  if (!sessionInfo) {
    return (
      <section className="rounded-3xl border border-blue-400/30 bg-slate-950/70 p-6 text-slate-300">
        Loading chat...
      </section>
    );
  }

  return (
    <section className="relative overflow-hidden rounded-3xl border border-blue-400/30 bg-slate-950/70 shadow-2xl shadow-blue-950/50">
      <div className="absolute -top-24 -right-24 h-56 w-56 rounded-full bg-blue-500/20 blur-3xl"></div>
      <div className="absolute -bottom-24 -left-24 h-56 w-56 rounded-full bg-purple-500/20 blur-3xl"></div>

      <ChatHeader />
      <ChatMessages messages={messages} />

      <div className="relative z-10 border-t border-white/10 bg-slate-950/50 p-5">
        <ChatInput
          input={input}
          setInput={setInput}
          sendMessage={sendMessage}
        />

        <div className="mt-4 flex items-center justify-between gap-3">
          <HintButton getHint={getHint} />

          <p className="text-sm text-slate-400">
            ✨ The bot guides you with questions, not direct answers.
          </p>
        </div>
      </div>
    </section>
  );
}

export default ChatBox;