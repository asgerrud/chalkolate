import { WEEK_IN_MS } from "@/constants";

const _getDaysFromMonday = (date: Date): number => {
  const day: number = date.getDay();
  if (day === 0) {
    return 6;
  } else {
    return day - 1;
  }
};

const _setDateBeginningOfWeek = (date: Date): Date => {
  const newDate: Date = new Date(date);
  newDate.setHours(0, 0, 0, 0);
  newDate.setDate(newDate.getDate() - _getDaysFromMonday(newDate));
  return newDate;
};

export const isDateInSameWeek = (a: Date, b: Date): boolean => {
  const d1: Date = _setDateBeginningOfWeek(a);
  const d2: Date = _setDateBeginningOfWeek(b);

  return d1.getTime() === d2.getTime();
};

export const isDateInAdjacentWeek = (a: Date, b: Date): boolean => {
  const d1: Date = _setDateBeginningOfWeek(a);
  const d2: Date = _setDateBeginningOfWeek(b);

  const weekDiff: number = Math.abs((d2.getTime() - d1.getTime()) / WEEK_IN_MS);

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

export const getFormattedDateString = (date: Date): string => {
  return date.toISOString().substring(0, 10);
};
