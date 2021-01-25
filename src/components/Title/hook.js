import { useRef, useState, useEffect, useCallback } from "react";
import { useTransition } from "react-spring";

export function useComponent() {
  const ref = useRef([]);
  const [items, set] = useState([]);
  const transitions = useTransition(items, null, {
    from: {
      opacity: 0,
      height: 0,
      innerHeight: 0,
      transform: "perspective(600px) rotateX(0deg)",
      color: "#8fa5b6",
    },
    enter: [
      { opacity: 1, height: 80, innerHeight: 80 },
      { transform: "perspective(600px) rotateX(180deg)", color: "#0b1b22" },
      { transform: "perspective(600px) rotateX(0deg)" },
    ],
    leave: [
      { color: "#c23369" },
      { innerHeight: 0 },
      { opacity: 0, height: 0 },
    ],
    update: { color: "#d6c7cf;" },
  });

  const reset = useCallback(() => {
    ref.current.map(clearTimeout);
    ref.current = [];
    set([]);
    ref.current.push(
      setTimeout(() => set(["Start", "Uploading", "Your", "Cats"]), 2000),
    );
    ref.current.push(
      setTimeout(() => set(["Start", "Uploading", "Your", "Cats"]), 5000),
    );
    ref.current.push(
      setTimeout(() => set(["Start", "Uploading", "Your", "Cats"]), 8000),
    );
  }, []);

  useEffect(() => void reset(), [reset]);

  return { transitions, reset };
}
