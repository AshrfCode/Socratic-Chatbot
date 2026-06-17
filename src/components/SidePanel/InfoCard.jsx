function InfoCard({ title, value }) {
  return (
    <div className="rounded-2xl bg-slate-900 p-4">
      <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
        {title}
      </p>

      <p className="mt-1 text-lg font-bold text-white">
        {value}
      </p>
    </div>
  );
}

export default InfoCard;