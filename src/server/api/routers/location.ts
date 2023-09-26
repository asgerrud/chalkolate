import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { type QueryResult } from "~/server/api/root";

export const locationRouter = createTRPCRouter({
  findAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.location.findMany({
      include: {
        zone: true
      }
    });
  })
});

export type ClimbingLocations = QueryResult<"location", "findAll">;
