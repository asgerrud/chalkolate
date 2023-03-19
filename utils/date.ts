const WEEK_IN_HOURS = 24 * 7;

export const hoursBetweenDates = (a: Date, b: Date) => {
  const msBetweenDates = Math.abs(a.getTime() - b.getTime());
  const milisecondToHourMultiplier = 60 * 60 * 1000;
  return msBetweenDates / milisecondToHourMultiplier;
};

const getDaysFromMonday = (date: Date): number => {
  const day = date.getDay();
  return day === 0 ? 6 : day - 1;
};

const setBeginningOfWeek = (dates: Date[]): void => {
  for (let date of dates) {
    if (date.getUTCHours() > 12) {
      date.setUTCHours(24, 0, 0, 0);
    } else {
      date.setUTCHours(0, 0, 0, 0);
    }
    date.setDate(date.getDate() - getDaysFromMonday(date));
  }
};

export const isDateInSameWeek = (a: Date, b: Date): boolean => {
  setBeginningOfWeek([a, b]);
  return hoursBetweenDates(a, b) === 0;
};

export const isDateInAdjacentWeek = (a: Date, b: Date): boolean => {
  setBeginningOfWeek([a, b]);
  return (
    hoursBetweenDates(a, b) > 0 && hoursBetweenDates(a, b) <= WEEK_IN_HOURS
  );
};

export const getTodaysDate = (): Date => {
  const today: Date = new Date();
  today.setUTCHours(0, 0, 0, 0);
  return new Date(today.toISOString());
};
