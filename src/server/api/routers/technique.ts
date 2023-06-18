import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const techniqueRouter = createTRPCRouter({
    getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.technique.findMany();
  }),
});
