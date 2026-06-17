import { useState } from "react";
import { loginResearcher } from "../services/researcherService";

function ResearcherLogin({ onLogin, onBack }) {
  const [form, setForm] = useState({
    username: "",
    accessCode: "",
  });

  const [error, setError] = useState("");

  function handleChange(e) {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    try {
      const data = await loginResearcher(form);
      onLogin(data);
    } catch (err) {
      setError("Invalid researcher username or access code");
    }
  }

  return (
    <section className="mx-auto mt-10 max-w-md rounded-3xl bg-white/10 p-6 text-white shadow-xl">
      <h2 className="mb-4 text-2xl font-bold">Researcher Login</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="username"
          value={form.username}
          onChange={handleChange}
          placeholder="Researcher username"
          className="w-full rounded-xl bg-slate-800 p-3 text-white"
          required
        />

        <input
          name="accessCode"
          value={form.accessCode}
          onChange={handleChange}
          placeholder="Access code"
          className="w-full rounded-xl bg-slate-800 p-3 text-white"
          required
        />

        {error && <p className="text-red-300">{error}</p>}

        <button className="w-full rounded-xl bg-purple-600 py-3 font-bold">
          Enter Monitor
        </button>

        <button
          type="button"
          onClick={onBack}
          className="w-full rounded-xl bg-slate-700 py-3 font-bold"
        >
          Back
        </button>
      </form>
    </section>
  );
}

export default ResearcherLogin;