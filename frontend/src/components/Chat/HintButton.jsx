import { useState } from "react";
import { getChatHint } from "../../services/chatService";

function HintButton({ chatId, sessionId, studentId, onHint }) {
  const [loading, setLoading] = useState(false);

  async function handleGetHint() {
    if (!chatId || !sessionId || !studentId) {
      console.error("Missing data for hint:", {
        chatId,
        sessionId,
        studentId,
      });
      return;
    }

    try {
      setLoading(true);

      const response = await getChatHint(chatId, {
        sessionId,
        studentId,
      });

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
      className="mb-4 rounded-xl bg-purple-600 px-4 py-2 font-semibold text-white hover:bg-purple-700 disabled:opacity-50"
    >
      {loading ? "Loading hint..." : "Get Hint"}
    </button>
  );
}

export default HintButton;