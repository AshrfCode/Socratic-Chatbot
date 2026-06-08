function HintButton({ getHint }) {
  return (
    <button
      className="rounded-2xl border border-amber-400/40 bg-amber-400/10 px-5 py-3 font-bold text-amber-300 transition hover:bg-amber-400/20"
      onClick={getHint}
    >
      💡 Get Hint
    </button>
  );
}

export default HintButton;