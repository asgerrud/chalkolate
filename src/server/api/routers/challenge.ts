import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

export const challengeRouter = createTRPCRouter({
    getUserChallenges: protectedProcedure.query(({ ctx }) => {
      return ctx.prisma.challenge.findMany({
        where: { userId: ctx.session.user.id}
      });
  }),
});
