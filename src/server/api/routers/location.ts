import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { type QueryResult } from "~/server/api/root";

export const locationRouter = createTRPCRouter({
  findAll: publicProcedure.query(({ ctx }) => {
    const locationsFound = ctx.prisma.location.findMany({
      include: {
        zone: true
      }
    });
    return locationsFound ?? [];
  })
});

export type ClimbingLocation = QueryResult<"location", "findAll">;
