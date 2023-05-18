import { getTodaysDate, isDateInAdjacentWeek, isDateInSameWeek } from "@/utils/date";
import { Streak } from "./types/interfaces/Streak";

export const getWeeklyStreak = (dates: Date[]): Streak => {
  if (!dates?.length) {
    return { current: 0, highest: 0 };
  }

  // Sort the dates in descending order
  dates.sort((a, b) => b.getTime() - a.getTime());

  console.log(dates);

  const today: Date = getTodaysDate();

  let count: number = isDateInSameWeek(today, new Date(dates[0])) ? 1 : 0;
  let currentCount: number = count;
  let highestCount: number = count;
  let previousDate: Date = today;

  let currentStreakFound = false;

  for (let date of dates) {
    if (isDateInAdjacentWeek(date, previousDate)) {
      count++;
      if (!currentStreakFound) {
        currentCount++;
      }
    } else {
      currentStreakFound = true;
      highestCount = Math.max(highestCount, count);
      if (!isDateInSameWeek(date, previousDate)) {
        count = 1;
      }
    }

    previousDate = date;
  }

  highestCount = Math.max(highestCount, count);

  return { current: currentCount, highest: highestCount };
};
