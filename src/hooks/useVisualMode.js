import React, { useState } from "react";


export function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  function transition(newMode, replace = false) {
    setMode(newMode);
    if (replace) {
      history.pop();
      history.push(mode);
    } else {
      history.push(newMode);
    }
  }

  function back() {
    history.pop()
    if (history.length >= 1) {
      setMode(history[history.length - 1]);
    }
  }
  return { mode, transition, back };
}