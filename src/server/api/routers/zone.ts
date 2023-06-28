import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const zoneRouter = createTRPCRouter({
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.zone.findMany();
  })
});
