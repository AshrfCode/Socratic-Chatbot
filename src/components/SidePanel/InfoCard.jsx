function InfoCard({ icon, label, value }) {
  return (
    <div className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-5 backdrop-blur-xl transition hover:border-cyan-300/40 hover:bg-white/10">
      <div className="absolute -right-10 -top-10 h-24 w-24 rounded-full bg-cyan-400/10 blur-2xl"></div>

      <div className="relative z-10 flex items-center gap-4">
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-linear-to-br from-cyan-400 to-blue-500 text-2xl shadow-lg">
          {icon}
        </div>

        <div>
          <p className="text-sm text-slate-400">
            {label}
          </p>

          <p className="mt-1 text-lg font-bold text-white">
            {value}
          </p>
        </div>
      </div>
    </div>
  );
}

export default InfoCard;