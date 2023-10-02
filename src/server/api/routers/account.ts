import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

export const accountRouter = createTRPCRouter({
  delete: protectedProcedure.mutation(({ ctx }) => {
    return ctx.prisma.user.delete({
      where: {
        id: ctx.session.user.id
      }
    });
  })
});
