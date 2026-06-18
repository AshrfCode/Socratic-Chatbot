import { useState } from "react";
import { submitPostTask } from "../../services/questionnaireService";
import { useSession } from "../../Context/SessionContext";

function PostTaskSurvey({ onDone }) {
  const { sessionInfo } = useSession();

  const [form, setForm] = useState({
    didBotGiveAnswers: false,
    didQuestionsHelpThinking: 3,
    perceivedEffort: 3,
    satisfaction: 3,
    feedback: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  function handleChange(e) {
    const value =
      e.target.type === "checkbox" ? e.target.checked : e.target.value;

    setForm({
      ...form,
      [e.target.name]: value,
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    try {
      await submitPostTask({
        studentId: sessionInfo.userId,
        ...form,
      });

      setSubmitted(true);

      // Wait 2.5 seconds so they can read the success message, then log them out
      setTimeout(() => {
        if (onDone) onDone();
      }, 2500);
    } catch (err) {
      console.error("Failed to submit post-task", err);
      setError("Failed to submit the questionnaire. Please try again.");
    }
  }

  if (submitted) {
    return (
      <div className="flex h-full min-h-[50vh] items-center justify-center">
        <section className="animate-fade-in w-full max-w-md rounded-2xl border border-green-500/30 bg-green-500/10 p-8 text-center shadow-2xl backdrop-blur-xl">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-500/20 text-green-400">
            <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-xl font-bold text-green-300">Submitted Successfully</h2>
          <p className="mt-2 text-sm text-green-200/80">
            Thank you for participating! Returning to home screen...
          </p>
        </section>
      </div>
    );
  }

  return (
    <div className="flex w-full justify-center pb-10 pt-6">
      <section className="w-full max-w-2xl rounded-2xl border border-white/5 bg-[#1e2333]/80 p-8 text-white shadow-2xl backdrop-blur-xl md:p-10">
        <div className="mb-8 text-center">
          <h2 className="text-3xl font-extrabold tracking-tight text-white">
            Post-Task Questionnaire
          </h2>
          <p className="mt-2 text-sm text-slate-400">
            Please answer these questions regarding your experience.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          
          {/* F-12 Requirement: Manipulation Check for Experimental Group */}
          {sessionInfo.group === "Experimental Group" && (
            <div className="rounded-lg border border-purple-500/30 bg-purple-900/10 p-4 transition-colors hover:bg-purple-900/20">
              <label className="flex cursor-pointer items-start gap-3">
                <input
                  type="checkbox"
                  name="didBotGiveAnswers"
                  checked={form.didBotGiveAnswers}
                  onChange={handleChange}
                  className="mt-1 h-5 w-5 rounded border-gray-600 bg-slate-800 accent-purple-500"
                />
                <span className="text-sm font-medium text-purple-200">
                  Manipulation Check: Did the bot give direct answers instead of guiding questions?
                </span>
              </label>
            </div>
          )}

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-slate-200">
                Did the questions help you think more deeply?
              </label>
              <select
                name="didQuestionsHelpThinking"
                value={form.didQuestionsHelpThinking}
                onChange={handleChange}
                className="w-full rounded-lg border border-transparent bg-[#2a2f42]/80 p-3.5 text-white transition-all focus:border-purple-500 focus:bg-[#2a2f42] focus:outline-none focus:ring-1 focus:ring-purple-500"
              >
                <option value="1">1 - Not at all</option>
                <option value="2">2 - Slightly</option>
                <option value="3">3 - Neutral</option>
                <option value="4">4 - Yes</option>
                <option value="5">5 - Very much</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-semibold text-slate-200">
                How much effort did the task require?
              </label>
              <select
                name="perceivedEffort"
                value={form.perceivedEffort}
                onChange={handleChange}
                className="w-full rounded-lg border border-transparent bg-[#2a2f42]/80 p-3.5 text-white transition-all focus:border-purple-500 focus:bg-[#2a2f42] focus:outline-none focus:ring-1 focus:ring-purple-500"
              >
                <option value="1">1 - Very low effort</option>
                <option value="2">2 - Low effort</option>
                <option value="3">3 - Medium effort</option>
                <option value="4">4 - High effort</option>
                <option value="5">5 - Very high effort</option>
              </select>
            </div>

            <div className="space-y-2 md:col-span-2">
              <label className="block text-sm font-semibold text-slate-200">
                Overall satisfaction with the task experience
              </label>
              <select
                name="satisfaction"
                value={form.satisfaction}
                onChange={handleChange}
                className="w-full rounded-lg border border-transparent bg-[#2a2f42]/80 p-3.5 text-white transition-all focus:border-purple-500 focus:bg-[#2a2f42] focus:outline-none focus:ring-1 focus:ring-purple-500"
              >
                <option value="1">1 - Very dissatisfied</option>
                <option value="2">2 - Dissatisfied</option>
                <option value="3">3 - Neutral</option>
                <option value="4">4 - Satisfied</option>
                <option value="5">5 - Very satisfied</option>
              </select>
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-semibold text-slate-200">
              Feedback
            </label>
            <textarea
              name="feedback"
              value={form.feedback}
              onChange={handleChange}
              rows="4"
              className="w-full rounded-lg border border-transparent bg-[#2a2f42]/80 p-3.5 text-white placeholder-gray-400 transition-all focus:border-purple-500 focus:bg-[#2a2f42] focus:outline-none focus:ring-1 focus:ring-purple-500"
              placeholder="Write any feedback about the task, chatbot, or interface."
            />
          </div>

          {error && <p className="text-center text-sm font-medium text-red-400">{error}</p>}

          <div className="pt-4">
            <button
              type="submit"
              className="w-full rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 py-4 font-bold text-white shadow-lg shadow-purple-500/20 transition-all hover:scale-[1.01] hover:shadow-purple-500/40 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-[#1e2333]"
            >
              Submit Post-Task Survey
            </button>
          </div>
        </form>
      </section>
    </div>
  );
}

export default PostTaskSurvey;