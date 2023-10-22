import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { type RouterOutput } from "~/server/api/root";

export const gradeRouter = createTRPCRouter({
  findAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.grade.findMany({ orderBy: { id: "asc" } });
  })
});

export type Grades = RouterOutput["grade"]["findAll"];
