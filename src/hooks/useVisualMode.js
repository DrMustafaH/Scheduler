import { useState } from "react";


export function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  // setHistory(prev => ([...prev, mode]))

  const newHistory = [...history]
  function transition(newMode, replace = false) {
    setMode(newMode);
    if (replace) {
      newHistory.pop();
      newHistory.push(mode);

    } else {
      newHistory.push(newMode);
    }
    setHistory(newHistory)
  }

  function back() {
    newHistory.pop()
    if (newHistory.length >= 1) {
      setMode(newHistory[newHistory.length - 1]);
    }
    setHistory(newHistory)
  }
  return { mode, transition, back };
}