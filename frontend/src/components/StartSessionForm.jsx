import { useState } from "react";
import { useSession } from "../Context/SessionContext";

function StartSessionForm({ onResearcherClick }) {
  const { startStudentSession } = useSession();

  const [formData, setFormData] = useState({
    name: "",
    studentId: "",
    email: "",
  });

  const [error, setError] = useState("");

  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    try {
      await startStudentSession(formData);
    } catch (err) {
      setError("Failed to start session");
      console.error(err);
    }
  }

  return (
    <section className="mx-auto mt-10 max-w-md rounded-3xl bg-white/10 p-6 text-white shadow-xl">
      <h2 className="mb-4 text-2xl font-bold">Start Session</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Full name"
          className="w-full rounded-xl p-3 text-white"
          required
        />

        <input
          name="studentId"
          value={formData.studentId}
          onChange={handleChange}
          placeholder="Student ID"
          className="w-full rounded-xl p-3 text-white"
          required
        />

        <input
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email"
          className="w-full rounded-xl p-3 text-white"
        />

        {error && <p className="text-red-300">{error}</p>}

        <button
          type="submit"
          className="w-full rounded-xl bg-purple-600 py-3 font-bold hover:bg-purple-700"
        >
          Start
        </button>

        <button
          type="button"
          onClick={onResearcherClick}
          className="w-full rounded-xl bg-slate-700 py-3 font-bold text-white hover:bg-slate-600"
        >
          Researcher / Monitor Login
        </button>
      </form>
    </section>
  );
}

export default StartSessionForm;