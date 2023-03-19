import {
  getTodaysDate,
  isDateInAdjacentWeek,
  isDateInSameWeek,
} from "@/utils/date";

export const getCurrentWeeklyStreak = (dates: Date[]) => {
  if (!dates?.length) {
    return 0;
  }

  const today = getTodaysDate();

  const latestActivityDate = new Date(dates[0]);
  const hasActivityInCurrentWeek = isDateInSameWeek(today, latestActivityDate);

  let streak = hasActivityInCurrentWeek ? 1 : 0;

  let lastDate = today;
  for (let date of dates) {
    if (isDateInAdjacentWeek(date, lastDate)) {
      streak++;
      lastDate = date;
    }
  }
  return streak;
};
