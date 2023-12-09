import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

export const locationRouter = createTRPCRouter({
  findAllWithUserActivity: protectedProcedure.query(({ ctx }) => {
    return ctx.prisma.location.findMany({
      where: {
        challenges: {
          some: {
            userId: ctx.session.user.id
          }
        }
      }
    });
  })
});
