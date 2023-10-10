import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { z } from "zod";
import { type QueryResult } from "~/server/api/root";

export const zoneRouter = createTRPCRouter({
  findZonesByLocation: publicProcedure.input(z.object({ locationId: z.string() })).query(({ ctx, input }) => {
    return ctx.prisma.zone.findMany({
      where: {
        locationId: input.locationId
      }
    });
  })
});

export type FindZonesByLocation = QueryResult<"zone", "findZonesByLocation">;
