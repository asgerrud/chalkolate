import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { z } from "zod";
import { type inferRouterInputs } from "@trpc/server";
import { type AppRouter } from "~/server/api/root";
import { ActivityCreateInputSchema } from "~/schema/activity.schema";

export const activityRouter = createTRPCRouter({
  create: protectedProcedure.input(ActivityCreateInputSchema).mutation(async ({ ctx, input }) => {
    const { date, duration, location } = input;
    const user = ctx.session.user?.id;

    return ctx.prisma.activity.create({
      data: {
        date,
        duration,
        user: {
          connect: {
            id: user
          }
        },
        location: {
          connect: {
            id: location
          }
        }
      }
    });
  }),
  delete: protectedProcedure.input(z.string()).mutation(({ ctx, input }) => {
    return ctx.prisma.activity.deleteMany({
      where: {
        id: input,
        userId: ctx.session.user.id
      }
    });
  }),
  getUserActivities: protectedProcedure.query(({ ctx }) => {
    return ctx.prisma.activity.findMany({
      where: { userId: ctx.session.user.id }
    });
  })
});

export type ActivityCreate = inferRouterInputs<AppRouter>["activity"]["create"];
