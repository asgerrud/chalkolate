import dayjs from "dayjs";
import { type Challenge, type ChangeSchedule } from ".prisma/client";

// TODO: add unit test
export const getChallengeEndDate = (changeSchedule: ChangeSchedule, startDate: Date): Date => {
  const { startDate: latestZoneReset, changeIntervalWeeks } = changeSchedule;

  const changeIntervalInDays = changeIntervalWeeks * 7;

  // Calculate difference in days
  const daysSinceLastChange: number = dayjs(startDate).diff(latestZoneReset, "day");

  // Calculate days until next schedule change
  const daysUntilNextChange: number = daysSinceLastChange % changeIntervalInDays;

  // Calculate the next schedule change date
  const nextChangeDate: Date = dayjs(startDate)
    .add(changeIntervalInDays - daysUntilNextChange, "day")
    .toDate();

  return nextChangeDate;
};

export const getChallengeTimePercentagePassed = (endDate: Date, changeIntervalWeeks: number): number => {
  const now = new Date().getTime();

  const latestScheduleReset = dayjs(endDate).subtract(changeIntervalWeeks, "week").toDate();

  const totalTime = endDate.getTime() - latestScheduleReset.getTime();
  const timePassed = now - latestScheduleReset.getTime();

  return Math.round((timePassed / totalTime) * 100);
};

export const isChallengeInProgress = (challenge: Challenge): boolean => {
  const now = dayjs();

  if (challenge.completedAt) {
    return false;
  }

  return now < dayjs(challenge.endDate);
};
