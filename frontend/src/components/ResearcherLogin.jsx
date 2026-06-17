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
    // Matches the exact background gradient and top-weighted centering
    <div className="flex min-h-screen w-full flex-col items-center justify-start bg-gradient-to-br from-slate-950 via-purple-900/20 to-slate-950 px-4 pt-[12vh]">
      
      {/* Matches the glassmorphism card style */}
      <section className="w-full max-w-md rounded-2xl border border-white/5 bg-[#1e2333]/80 p-8 text-white shadow-2xl backdrop-blur-xl">
        <div className="mb-8 text-center">
          <h2 className="text-3xl font-extrabold tracking-tight text-white">
            Researcher Login
          </h2>
          <p className="mt-2 text-sm text-gray-400">
            Enter credentials to access the monitor
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <input
              name="username"
              value={form.username}
              onChange={handleChange}
              placeholder="Researcher username"
              className="w-full rounded-lg border border-transparent bg-[#2a2f42]/80 p-3.5 text-white placeholder-gray-400 transition-all focus:border-purple-500 focus:bg-[#2a2f42] focus:outline-none focus:ring-1 focus:ring-purple-500"
              required
            />
          </div>

          <div>
            <input
              type="password" // Assuming this should hide the text!
              name="accessCode"
              value={form.accessCode}
              onChange={handleChange}
              placeholder="Access code"
              className="w-full rounded-lg border border-transparent bg-[#2a2f42]/80 p-3.5 text-white placeholder-gray-400 transition-all focus:border-purple-500 focus:bg-[#2a2f42] focus:outline-none focus:ring-1 focus:ring-purple-500"
              required
            />
          </div>

          {error && (
            <p className="text-center text-sm font-medium text-red-400">
              {error}
            </p>
          )}

          <div className="pt-4">
            <button
              type="submit"
              className="mb-3 w-full rounded-lg bg-gradient-to-r from-purple-600 to-indigo-600 py-3.5 font-bold text-white shadow-lg shadow-purple-500/20 transition-all hover:scale-[1.02] hover:shadow-purple-500/40 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-[#1e2333]"
            >
              Enter Monitor
            </button>

            <button
              type="button"
              onClick={onBack}
              className="w-full rounded-lg bg-white/5 py-3.5 font-bold text-gray-300 transition-all hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2 focus:ring-offset-[#1e2333]"
            >
              Back
            </button>
          </div>
        </form>
      </section>
    </div>
  );
}

export default ResearcherLogin;