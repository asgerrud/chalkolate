import { useState, useEffect } from "react";

export const useHydrationSafeDate = (date: string) => {
  const [safeDate, setSafeDate] = useState<string>("");

  useEffect(() => {
    setSafeDate(new Date(date).toLocaleDateString());
  }, [date]);

  return safeDate;
};
