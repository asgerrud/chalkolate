const MILISECONDS_TO_WEEKS = 1000 * 60 * 60 * 24 * 7;

export const hoursBetweenDates = (a: Date, b: Date): number => {
  const msBetweenDates = Math.abs(a.getTime() - b.getTime());
  const milisecondToHourMultiplier = 60 * 60 * 1000;
  return msBetweenDates / milisecondToHourMultiplier;
};

const getDaysFromMonday = (date: Date): number => {
  const day = date.getDay();
  if (day === 0) {
    return 6;
  } else {
    return day - 1;
  }
};

const getDateBeginningOfWeek = (date: Date): Date => {
  const newDate = new Date(date);
  newDate.setHours(0, 0, 0, 0);
  newDate.setDate(newDate.getDate() - getDaysFromMonday(newDate));
  return newDate;
};

export const isDateInSameWeek = (a: Date, b: Date): boolean => {
  const d1 = getDateBeginningOfWeek(a);
  const d2 = getDateBeginningOfWeek(b);

  return d1.getTime() === d2.getTime();
};

export const isDateInAdjacentWeek = (a: Date, b: Date): boolean => {
  const d1 = getDateBeginningOfWeek(a);
  const d2 = getDateBeginningOfWeek(b);

  // Calculate difference in weeks
  const weekDiff = Math.abs((d2.getTime() - d1.getTime()) / MILISECONDS_TO_WEEKS);

  return weekDiff === 1;
};

export const getTodaysDate = (): Date => {
  const today: Date = new Date();
  today.setUTCHours(0, 0, 0, 0);
  return new Date(today.toISOString());
};

export const compareDates = (a: string, b: string): number => {
  return Date.parse(a) - Date.parse(b);
};

export const getNextScheduleChange = (
  scheduleStartDate: Date,
  challengeBeginDate: Date,
  weeksBetweenChange: number
): Date => {
  const millisecondsPerDay = 1000 * 60 * 60 * 24;

  // Calculate the time difference in days
  const timeDiff = Math.floor((challengeBeginDate.getTime() - scheduleStartDate.getTime()) / millisecondsPerDay);

  // Calculate the remaining days after complete cycles
  const remainingDays = timeDiff % (7 * weeksBetweenChange);

  // Calculate the next schedule change date
  const nextChangeDate = new Date(
    challengeBeginDate.getTime() + (7 * weeksBetweenChange - remainingDays) * millisecondsPerDay
  );

  return nextChangeDate;
};

export const getFormattedDateString = (date: Date): string => {
  return date.toISOString().substring(0, 10);
};
