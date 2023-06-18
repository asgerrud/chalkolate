import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const locationRouter = createTRPCRouter({
    getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.location.findMany();
  }),
});
