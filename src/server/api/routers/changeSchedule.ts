import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { z } from "zod";

export const changeScheduleRouter = createTRPCRouter({
  findAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.changeSchedule.findMany();
  }),

  findById: publicProcedure.input(z.string()).query(({ ctx, input: id }) => {
    return ctx.prisma.changeSchedule.findUnique({
      where: {
        id: id
      }
    });
  })
});
