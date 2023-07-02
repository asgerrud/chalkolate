import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const gradeRouter = createTRPCRouter({
  findAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.grade.findMany();
  })
});
