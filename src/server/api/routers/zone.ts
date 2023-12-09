import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { z } from "zod";
import { type Prisma } from ".prisma/client";

export const zoneRouter = createTRPCRouter({
  findAllByLocation: publicProcedure.input(z.object({ locationId: z.string() })).query(({ ctx, input }) => {
    return ctx.prisma.zone.findMany({
      where: {
        locationId: input.locationId
      },
      include: {
        changeSchedule: true
      }
    });
  })
});

export type ZoneWithChangeSchedule = Prisma.ZoneGetPayload<{
  include: { changeSchedule: true };
}>;
