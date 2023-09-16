import { locationRouter } from "~/server/api/routers/location";
import { createTRPCRouter } from "~/server/api/trpc";
import { gradeRouter } from "~/server/api/routers/grade";
import { zoneRouter } from "~/server/api/routers/zone";
import { challengeRouter } from "~/server/api/routers/challenge";
import { changeScheduleRouter } from "~/server/api/routers/changeSchedule";
import { type UseTRPCQueryResult } from "@trpc/react-query/shared";
import { type inferRouterInputs, type inferRouterOutputs } from "@trpc/server";
import { type TRPCClientErrorLike } from "@trpc/client";

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

export type QueryResult<
  RouteName extends keyof inferRouterOutputs<AppRouter>,
  Action extends keyof inferRouterInputs<AppRouter>[RouteName]
> = UseTRPCQueryResult<inferRouterOutputs<AppRouter>[RouteName][Action], TRPCClientErrorLike<AppRouter>>["data"];
