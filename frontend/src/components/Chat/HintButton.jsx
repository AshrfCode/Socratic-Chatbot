import { useState } from "react";
import { getChatHint } from "../../services/chatService";

function HintButton({ chatId, sessionId, studentId, onHint }) {
  const [loading, setLoading] = useState(false);

  async function handleGetHint() {
    if (!chatId || !sessionId || !studentId) {
      console.error("Missing data for hint:", { chatId, sessionId, studentId });
      return;
    }

    try {
      setLoading(true);
      const response = await getChatHint(chatId, { sessionId, studentId });
      onHint(response.hintMessage, response.session);
    } catch (error) {
      console.error("Failed to get hint", error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <button
      onClick={handleGetHint}
      disabled={loading}
      className="mb-2 flex items-center gap-2 rounded-lg border border-purple-500/30 bg-purple-500/10 px-4 py-2 text-sm font-semibold text-purple-300 transition-all hover:bg-purple-500/20 disabled:opacity-50"
    >
      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
      </svg>
      {loading ? "Generating hint..." : "Need a hint?"}
    </button>
  );
}

export default HintButton;