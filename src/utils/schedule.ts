import { DAY_IN_MS } from "~/constants";

export const calculateScheduleStart = (challengeEndDate: Date, weeksBetweenChange: number): Date => {
  const scheduleStartDate: Date = new Date(challengeEndDate.getTime() - (7 * weeksBetweenChange - 1) * DAY_IN_MS);
  return scheduleStartDate;
};

export const calculateNextScheduleChange = (
  scheduleStartDate: Date,
  challengeBeginDate: Date,
  weeksBetweenChange: number
): Date => {
  // Calculate difference in days
  const dayDiff: number = Math.floor((challengeBeginDate.getTime() - scheduleStartDate.getTime()) / DAY_IN_MS);

  // Calculate days until next schedule change
  const remainingDays: number = dayDiff % (7 * weeksBetweenChange);

  // Calculate the next schedule change date
  const nextChangeDate: Date = new Date(
    challengeBeginDate.getTime() + (7 * weeksBetweenChange - remainingDays) * DAY_IN_MS
  );

  return nextChangeDate;
};
