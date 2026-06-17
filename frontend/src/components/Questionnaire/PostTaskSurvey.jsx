import { useState } from "react";
import { submitPostTask } from "../../services/questionnaireService";
import { useSession } from "../../Context/SessionContext";

function PostTaskSurvey() {
  const { sessionInfo } = useSession();

  const [form, setForm] = useState({
    didBotGiveAnswers: false,
    didQuestionsHelpThinking: 3,
    perceivedEffort: 3,
    satisfaction: 3,
    feedback: "",
  });

  const [submitted, setSubmitted] = useState(false);

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

    await submitPostTask({
      studentId: sessionInfo.userId,
      ...form,
    });

    setSubmitted(true);
  }

  if (submitted) {
    return (
      <section className="mt-6 rounded-3xl bg-green-500/20 p-6 text-green-200">
        Post-task questionnaire submitted successfully.
      </section>
    );
  }

  return (
    <section className="mt-6 rounded-3xl bg-white/10 p-6 text-white shadow-xl">
      <h2 className="mb-2 text-2xl font-bold text-white">
        Post-Task Questionnaire
      </h2>

      <p className="mb-5 text-sm text-slate-300">
        Please answer these questions after completing the task.
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        {sessionInfo.group === "Experimental Group" && (
          <label className="flex items-center gap-3 rounded-xl bg-slate-800 p-3 text-slate-200">
            <input
              type="checkbox"
              name="didBotGiveAnswers"
              checked={form.didBotGiveAnswers}
              onChange={handleChange}
            />
            Did the bot give direct answers instead of guiding questions?
          </label>
        )}

        <div>
          <label className="mb-1 block text-sm font-semibold text-slate-200">
            Did the questions help you think more deeply?
          </label>
          <select
            name="didQuestionsHelpThinking"
            value={form.didQuestionsHelpThinking}
            onChange={handleChange}
            className="w-full rounded-xl bg-slate-800 p-3 text-white"
          >
            <option value="1">1 - Not at all</option>
            <option value="2">2 - Slightly</option>
            <option value="3">3 - Neutral</option>
            <option value="4">4 - Yes</option>
            <option value="5">5 - Very much</option>
          </select>
        </div>

        <div>
          <label className="mb-1 block text-sm font-semibold text-slate-200">
            How much effort did the task require?
          </label>
          <select
            name="perceivedEffort"
            value={form.perceivedEffort}
            onChange={handleChange}
            className="w-full rounded-xl bg-slate-800 p-3 text-white"
          >
            <option value="1">1 - Very low effort</option>
            <option value="2">2 - Low effort</option>
            <option value="3">3 - Medium effort</option>
            <option value="4">4 - High effort</option>
            <option value="5">5 - Very high effort</option>
          </select>
        </div>

        <div>
          <label className="mb-1 block text-sm font-semibold text-slate-200">
            Overall satisfaction with the task experience
          </label>
          <select
            name="satisfaction"
            value={form.satisfaction}
            onChange={handleChange}
            className="w-full rounded-xl bg-slate-800 p-3 text-white"
          >
            <option value="1">1 - Very dissatisfied</option>
            <option value="2">2 - Dissatisfied</option>
            <option value="3">3 - Neutral</option>
            <option value="4">4 - Satisfied</option>
            <option value="5">5 - Very satisfied</option>
          </select>
        </div>

        <div>
          <label className="mb-1 block text-sm font-semibold text-slate-200">
            Feedback
          </label>
          <textarea
            name="feedback"
            value={form.feedback}
            onChange={handleChange}
            className="w-full rounded-xl bg-slate-800 p-3 text-white placeholder:text-slate-400"
            placeholder="Write any feedback about the task, chatbot, or interface."
          />
        </div>

        <button className="w-full rounded-xl bg-purple-600 py-3 font-bold text-white hover:bg-purple-700">
          Submit Post-Task Survey
        </button>
      </form>
    </section>
  );
}

export default PostTaskSurvey;