import { useState } from "react";
import { useSession } from "../Context/SessionContext";

function StartSessionForm({ onBack }) {
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
    <div className="flex w-full flex-col items-center justify-center px-4 py-12 md:pt-[10vh]">
      
      {/* Light/Dark mode glassmorphism card */}
      <section className="w-full max-w-md rounded-2xl border border-slate-200 bg-white/80 p-6 sm:p-8 shadow-xl backdrop-blur-xl dark:border-white/5 dark:bg-[#1e2333]/80 dark:shadow-2xl">
        <div className="mb-8 text-center">
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            SystemThinker AI
          </h2>
          <p className="mt-2 text-sm text-slate-500 dark:text-gray-400">
            Enter your details to begin the session
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <input
              name="studentId"
              value={formData.studentId}
              onChange={handleChange}
              placeholder="Student ID"
              className="w-full rounded-lg border border-slate-200 bg-slate-50 p-3.5 text-slate-900 placeholder-slate-400 transition-all focus:border-purple-500 focus:bg-white focus:outline-none focus:ring-1 focus:ring-purple-500 dark:border-transparent dark:bg-[#2a2f42]/80 dark:text-white dark:placeholder-gray-400 dark:focus:bg-[#2a2f42]"
              required
            />
          </div>

          <div>
            <input
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Full name"
              className="w-full rounded-lg border border-slate-200 bg-slate-50 p-3.5 text-slate-900 placeholder-slate-400 transition-all focus:border-purple-500 focus:bg-white focus:outline-none focus:ring-1 focus:ring-purple-500 dark:border-transparent dark:bg-[#2a2f42]/80 dark:text-white dark:placeholder-gray-400 dark:focus:bg-[#2a2f42]"
              required
            />
          </div>

          <div>
            <input
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
              className="w-full rounded-lg border border-slate-200 bg-slate-50 p-3.5 text-slate-900 placeholder-slate-400 transition-all focus:border-purple-500 focus:bg-white focus:outline-none focus:ring-1 focus:ring-purple-500 dark:border-transparent dark:bg-[#2a2f42]/80 dark:text-white dark:placeholder-gray-400 dark:focus:bg-[#2a2f42]"
            />
          </div>

          {error && (
            <p className="text-center text-sm font-medium text-red-500 dark:text-red-400">
              {error}
            </p>
          )}

          <div className="pt-2">
            <button
              type="submit"
              className="w-full rounded-lg bg-gradient-to-r from-purple-600 to-indigo-600 py-3.5 font-bold text-white shadow-lg shadow-purple-500/20 transition-all hover:scale-[1.02] hover:shadow-purple-500/40 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-[#1e2333]"
            >
              Start Session
            </button>
          </div>

          <div className="mt-4 text-center">
            <button 
              type="button"
              onClick={onBack} 
              className="text-sm font-medium text-slate-500 hover:text-purple-600 dark:text-slate-400 dark:hover:text-purple-400 transition-colors"
            >
              &larr; Back to Home
            </button>
          </div>

        </form>
      </section>
    </div>
  );
}

export default StartSessionForm;