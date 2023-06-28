import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { type inferRouterInputs } from "@trpc/server";
import { type AppRouter } from "~/server/api/root";
import { z } from "zod";
import { Prisma } from ".prisma/client";
import { ChallengeCreateInputSchema } from "~/schema/challenge.schema";
import ChallengeWhereInput = Prisma.ChallengeWhereInput;

export const challengeRouter = createTRPCRouter({
  create: protectedProcedure.input(ChallengeCreateInputSchema).mutation(async ({ ctx, input }) => {
    const { location, zone, grade, startDate, endDate, techniques } = input;

    return await ctx.prisma.challenge.create({
      data: {
        startDate,
        endDate,
        techniques: {
          connect: techniques?.map((id) => ({ id })) ?? []
        },
        user: {
          connect: {
            id: ctx.session.user?.id
          }
        },
        location: {
          connect: {
            id: location
          }
        },
        grade: {
          connect: {
            id: grade
          }
        },
        zone: {
          connect: {
            id: zone
          }
        }
      }
    });
  }),
  findUserChallenges: protectedProcedure
    .input(
      z.object({
        from: z.date().optional(),
        to: z.date().optional()
      })
    )
    .query(({ input, ctx }) => {
      const whereClause: ChallengeWhereInput = { userId: ctx.session.user.id };

      if (input.from) {
        whereClause.startDate = { gte: input.from };
      }

      if (input.to) {
        whereClause.endDate = { lte: input.to };
      }

      return ctx.prisma.challenge.findMany({
        where: whereClause,
        orderBy: { endDate: "desc" }
      });
    })
});

export type ChallengeCreate = inferRouterInputs<AppRouter>["challenge"]["create"];
