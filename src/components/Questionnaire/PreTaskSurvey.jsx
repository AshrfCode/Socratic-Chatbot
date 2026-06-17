import { useState } from "react";
import { submitPreTask } from "../../services/questionnaireService";
import { useSession } from "../../Context/SessionContext";

function PreTaskSurvey({ onDone }) {
  const { sessionInfo } = useSession();

  const [form, setForm] = useState({
    previousExperience: "",
    chatbotComfort: 3,
    topicFamiliarity: 3,
    yearsExperience: 0,
    demographics: "",
    selfRatedSystemsThinking: 3,
  });

  function handleChange(e) {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    await submitPreTask({
      studentId: sessionInfo.userId,
      ...form,
    });

    onDone();
  }

  return (
    <section className="mx-auto mt-6 max-w-xl rounded-3xl bg-white/10 p-6 text-white shadow-xl">
      <h2 className="mb-2 text-2xl font-bold text-white">
        Pre-Task Questionnaire
      </h2>

      <p className="mb-5 text-sm text-slate-300">
        Please answer these questions before starting the task.
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="mb-1 block text-sm font-semibold text-slate-200">
            Previous experience with similar tasks
          </label>
          <textarea
            name="previousExperience"
            value={form.previousExperience}
            onChange={handleChange}
            placeholder="Example: I completed similar systems thinking tasks before."
            className="w-full rounded-xl bg-slate-800 p-3 text-white placeholder:text-slate-400"
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-semibold text-slate-200">
            Comfort using chatbots
          </label>
          <select
            name="chatbotComfort"
            value={form.chatbotComfort}
            onChange={handleChange}
            className="w-full rounded-xl bg-slate-800 p-3 text-white"
          >
            <option value="1">1 - Very uncomfortable</option>
            <option value="2">2 - Slightly uncomfortable</option>
            <option value="3">3 - Neutral</option>
            <option value="4">4 - Comfortable</option>
            <option value="5">5 - Very comfortable</option>
          </select>
        </div>

        <div>
          <label className="mb-1 block text-sm font-semibold text-slate-200">
            Familiarity with the task topic
          </label>
          <select
            name="topicFamiliarity"
            value={form.topicFamiliarity}
            onChange={handleChange}
            className="w-full rounded-xl bg-slate-800 p-3 text-white"
          >
            <option value="1">1 - Not familiar</option>
            <option value="2">2 - Slightly familiar</option>
            <option value="3">3 - Neutral</option>
            <option value="4">4 - Familiar</option>
            <option value="5">5 - Very familiar</option>
          </select>
        </div>

        <div>
          <label className="mb-1 block text-sm font-semibold text-slate-200">
            Years of study / work experience
          </label>
          <input
            name="yearsExperience"
            type="number"
            min="0"
            value={form.yearsExperience}
            onChange={handleChange}
            className="w-full rounded-xl bg-slate-800 p-3 text-white"
            placeholder="Example: 2"
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-semibold text-slate-200">
            Demographics
          </label>
          <input
            name="demographics"
            value={form.demographics}
            onChange={handleChange}
            className="w-full rounded-xl bg-slate-800 p-3 text-white placeholder:text-slate-400"
            placeholder="Example: 24 years old, Software Engineering student"
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-semibold text-slate-200">
            Self-rated systems thinking ability
          </label>
          <select
            name="selfRatedSystemsThinking"
            value={form.selfRatedSystemsThinking}
            onChange={handleChange}
            className="w-full rounded-xl bg-slate-800 p-3 text-white"
          >
            <option value="1">1 - Very low</option>
            <option value="2">2 - Low</option>
            <option value="3">3 - Medium</option>
            <option value="4">4 - High</option>
            <option value="5">5 - Very high</option>
          </select>
        </div>

        <button className="w-full rounded-xl bg-purple-600 py-3 font-bold text-white hover:bg-purple-700">
          Submit Pre-Task Survey
        </button>
      </form>
    </section>
  );
}

export default PreTaskSurvey;