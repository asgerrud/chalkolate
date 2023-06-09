import dayjs from "dayjs";
import isoWeek from "dayjs/plugin/isoWeek";
import RelativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(isoWeek);
dayjs.extend(RelativeTime);

export const isDateInSameWeek = (a: Date, b: Date): boolean => {
  return dayjs(a).isoWeek() === dayjs(b).isoWeek();
};

export const isDateInAdjacentWeek = (a: Date, b: Date): boolean => {
  const weekDiff: number = Math.abs(dayjs(a).isoWeek() - dayjs(b).isoWeek());
  return weekDiff === 1;
};

export const getTodaysDate = (): Date => {
  return dayjs().startOf("day").toDate();
};

export const getTimeTo = (from: Date, to: Date): string => {
  return dayjs(from).to(to, true);
};

export const compareDates = (a: string, b: string): number => {
  return Date.parse(a) - Date.parse(b);
};

export const getFormattedDateString = (date: Date | string): string => {
  return dayjs(date).format("YYYY-MM-DD");
};
