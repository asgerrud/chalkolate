import dayjs from "dayjs";
import { type Singular } from "~/server/api/root";
import { type ZonesByLocation } from "~/server/api/routers/zone";

// TODO: add unit test
export const getChallengeEndDate = (zone: Singular<ZonesByLocation>, startDate: Date) => {
  const { startDate: latestZoneReset, changeIntervalWeeks } = zone.changeSchedule;

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

// TODO: fix calculation
export const getChallengeTimePercentagePassed = (endDate: Date, changeIntervalWeeks: number) => {
  const now = new Date().getTime();

  const latestScheduleReset = dayjs(endDate).subtract(changeIntervalWeeks, "week").toDate();

  const totalTime = endDate.getTime() - latestScheduleReset.getTime();
  const timePassed = now - latestScheduleReset.getTime();

  return Math.round((timePassed / totalTime) * 100);
};
