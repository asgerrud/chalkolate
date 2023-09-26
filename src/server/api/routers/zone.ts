import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const zoneRouter = createTRPCRouter({
  findAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.zone.findMany();
  })
});
