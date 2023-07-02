import { locationRouter } from "~/server/api/routers/location";
import { createTRPCRouter } from "~/server/api/trpc";
import { gradeRouter } from "~/server/api/routers/grade";
import { zoneRouter } from "~/server/api/routers/zone";
import { challengeRouter } from "~/server/api/routers/challenge";
import { changeScheduleRouter } from "~/server/api/routers/changeSchedule";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  challenge: challengeRouter,
  grade: gradeRouter,
  location: locationRouter,
  changeSchedule: changeScheduleRouter,
  zone: zoneRouter
});

// export type definition of API
export type AppRouter = typeof appRouter;
