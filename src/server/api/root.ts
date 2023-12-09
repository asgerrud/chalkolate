import { locationRouter } from "~/server/api/routers/location";
import { createTRPCRouter } from "~/server/api/trpc";
import { gradeRouter } from "~/server/api/routers/grade";
import { zoneRouter } from "~/server/api/routers/zone";
import { challengeRouter } from "~/server/api/routers/challenge";
import { r2Router } from "~/server/api/routers/r2";
import { accountRouter } from "~/server/api/routers/account";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  account: accountRouter,
  challenge: challengeRouter,
  grade: gradeRouter,
  location: locationRouter,
  zone: zoneRouter,
  r2: r2Router
});

// export type definition of API
export type AppRouter = typeof appRouter;

// Extracts type from Array
export type Singular<T extends unknown[]> = T[number];
