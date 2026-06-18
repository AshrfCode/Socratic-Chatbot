import { useState, useEffect, useRef } from "react";

function CountdownTimer({ initialMinutes = 20, onTimeUp, onReminder }) {
  // Convert minutes to seconds for precise ticking
  const [timeLeft, setTimeLeft] = useState(initialMinutes * 60);

  // Refs to ensure we only fire the F-08 reminders exactly once
  const tenMinFired = useRef(false);
  const twoMinFired = useRef(false);

  useEffect(() => {
    // 1. Check if time is completely up
    if (timeLeft <= 0) {
      if (onTimeUp) onTimeUp();
      return;
    }

    // 2. F-08 Requirement: 10-minute neutral reminder (600 seconds)
    if (timeLeft === 600 && !tenMinFired.current) {
      if (onReminder) onReminder("נותרו 10 דקות לסיום המשימה.");
      tenMinFired.current = true;
    }

    // 3. F-08 Requirement: 2-minute neutral reminder (120 seconds)
    if (timeLeft === 120 && !twoMinFired.current) {
      if (onReminder) onReminder("נותרו 2 דקות לסיום המשימה.");
      twoMinFired.current = true;
    }

    // 4. The actual ticking mechanism
    const timerId = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    // Cleanup interval on unmount so it doesn't cause memory leaks
    return () => clearInterval(timerId);
  }, [timeLeft, onTimeUp, onReminder]);

  // Format the raw seconds into a clean MM:SS layout
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const formattedTime = `${minutes.toString().padStart(2, "0")}:${seconds
    .toString()
    .padStart(2, "0")}`;

  return (
    <span 
      className={`font-mono text-xl font-bold tracking-wider transition-colors ${
        timeLeft <= 120 ? "animate-pulse text-red-400" : "text-white"
      }`}
    >
      {formattedTime}
    </span>
  );
}

export default CountdownTimer;