import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { z } from "zod";

export const changeScheduleRouter = createTRPCRouter({
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.changeSchedule.findMany();
  }),

  getByZoneId: publicProcedure
    .input(
      z.object({
        zoneId: z.string()
      })
    )
    .query(({ input: { zoneId }, ctx }) => {
      return ctx.prisma.changeSchedule.findUnique({
        where: {
          zoneId: zoneId
        }
      });
    })
});
