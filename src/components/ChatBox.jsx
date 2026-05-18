import { useState } from "react";
import { fakeMessages } from "../data/fakeData";

function ChatBox() {
  const [messages, setMessages] = useState(fakeMessages);
  const [input, setInput] = useState("");

  function getCurrentTime() {
    return new Date().toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });
  }

  function sendMessage() {
    if (input.trim() === "") return;

    const newUserMessage = {
      sender: "user",
      text: input,
      time: getCurrentTime(),
    };

    const botResponse = {
      sender: "bot",
      text: "Good direction. Now try to identify one cause-and-effect chain that connects your answer to the wider system.",
      time: getCurrentTime(),
    };

    setMessages([...messages, newUserMessage, botResponse]);
    setInput("");
  }

  function getHint() {
    const hintMessage = {
      sender: "bot",
      text: "Hint: Start by asking yourself: who is affected, what changes over time, and what feedback loop may appear?",
      time: getCurrentTime(),
    };

    setMessages([...messages, hintMessage]);
  }

  return (
    <section className="relative overflow-hidden rounded-3xl border border-blue-400/30 bg-slate-950/70 shadow-2xl shadow-blue-950/50">
      <div className="absolute -top-24 -right-24 h-56 w-56 rounded-full bg-blue-500/20 blur-3xl"></div>

      <div className="absolute -bottom-24 -left-24 h-56 w-56 rounded-full bg-purple-500/20 blur-3xl"></div>

      <div className="relative z-10 border-b border-white/10 p-6">
        <div className="flex items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-extrabold text-white">
              Socratic Chatbot
            </h2>

            <p className="mt-1 text-sm text-slate-300">
              Answer the bot&apos;s questions to progress through the thinking
              layers.
            </p>
          </div>

          <div className="flex items-center gap-2 rounded-full border border-emerald-400/40 bg-emerald-400/10 px-4 py-2 text-sm font-semibold text-emerald-300">
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-300 shadow-lg shadow-emerald-300/60"></span>

            AI Online
          </div>
        </div>
      </div>

      <div className="relative z-10 h-[430px] overflow-y-auto space-y-6 p-6">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex items-end gap-3 ${
              message.sender === "user"
                ? "justify-end"
                : "justify-start"
            }`}
          >
            {message.sender === "bot" && (
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-blue-400/30 bg-blue-500/10 text-xl">
                🤖
              </div>
            )}

            <div
              className={`max-w-[75%] rounded-3xl px-5 py-4 shadow-xl ${
                message.sender === "user"
                  ? "rounded-br-md bg-linear-to-r from-blue-600 to-violet-600 text-white"
                  : "rounded-bl-md border border-white/10 bg-white/10 text-slate-100"
              }`}
            >
              <div className="mb-2 flex items-center justify-between gap-5">
                <p
                  className={`text-sm font-bold ${
                    message.sender === "user"
                      ? "text-white"
                      : "text-blue-300"
                  }`}
                >
                  {message.sender === "user"
                    ? "You"
                    : "SystemThinker Bot"}
                </p>

                <p className="text-xs text-slate-300">
                  {message.time || "10:21 AM"}
                </p>
              </div>

              <p className="leading-7">{message.text}</p>

              {message.sender === "user" && (
                <p className="mt-2 text-right text-xs text-blue-100">
                  ✓✓
                </p>
              )}
            </div>

            {message.sender === "user" && (
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-violet-400/40 bg-violet-500/20 text-xl">
                👤
              </div>
            )}
          </div>
        ))}

        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-blue-400/30 bg-blue-500/10 text-xl">
            🤖
          </div>

          <div className="flex gap-2 rounded-2xl border border-white/10 bg-white/10 px-5 py-3">
            <span className="h-2 w-2 animate-pulse rounded-full bg-slate-300"></span>

            <span className="h-2 w-2 animate-pulse rounded-full bg-slate-300"></span>

            <span className="h-2 w-2 animate-pulse rounded-full bg-slate-300"></span>
          </div>
        </div>
      </div>

      <div className="relative z-10 border-t border-white/10 bg-slate-950/50 p-5">
        <div className="flex flex-col gap-3 md:flex-row">
          <div className="relative flex-1">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
              ✎
            </span>

            <input
              className="w-full rounded-2xl border border-blue-400/40 bg-white/10 px-12 py-4 text-white outline-none placeholder:text-slate-400 focus:border-blue-300 focus:ring-2 focus:ring-blue-500/40"
              type="text"
              placeholder="Write your reasoning here..."
              value={input}
              maxLength={500}
              onChange={(event) => setInput(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  sendMessage();
                }
              }}
            />

            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-slate-400">
              {input.length} / 500
            </span>
          </div>

          <button
            className="rounded-2xl bg-linear-to-r from-blue-500 to-violet-500 px-7 py-4 font-bold text-white shadow-lg shadow-blue-500/30 transition hover:scale-105"
            onClick={sendMessage}
          >
            ✈ Send
          </button>
        </div>

        <div className="mt-4 flex items-center justify-between gap-3">
          <button
            className="rounded-2xl border border-amber-400/40 bg-amber-400/10 px-5 py-3 font-bold text-amber-300 transition hover:bg-amber-400/20"
            onClick={getHint}
          >
            💡 Get Hint
          </button>

          <p className="text-sm text-slate-400">
            ✨ The bot guides you with questions, not direct answers.
          </p>
        </div>
      </div>
    </section>
  );
}

export default ChatBox;