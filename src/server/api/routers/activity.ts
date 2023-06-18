import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

export const activityRouter = createTRPCRouter({
    getUserActivities: protectedProcedure.query(({ ctx }) => {
      return ctx.prisma.activity.findMany({
        where: { userId: ctx.session.user.id}
      });
  }),
});
