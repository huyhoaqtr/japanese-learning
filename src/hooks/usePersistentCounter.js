import { useState } from "react";

export const usePersistentCounter = (key) => {
  const [value, setValue] = useState(() => {
    const saved = localStorage.getItem(key);
    return saved ? Number(saved) || 0 : 0;
  });

  const increment = (amount = 1) => {
    setValue((current) => {
      const next = current + amount;
      localStorage.setItem(key, String(next));
      return next;
    });
  };

  return [value, increment];
};
