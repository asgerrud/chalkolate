import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { type inferRouterOutputs } from "@trpc/server";
import { type AppRouter } from "~/server/api/root";
import { z } from "zod";
import { Prisma } from ".prisma/client";
import { ChallengeCreateInputSchema } from "~/schema/challenge.schema";
import ChallengeWhereInput = Prisma.ChallengeWhereInput;

export const challengeRouter = createTRPCRouter({
  create: protectedProcedure.input(ChallengeCreateInputSchema).mutation(async ({ ctx, input }) => {
    const { location, zone, grade, startDate, endDate } = input;

    return await ctx.prisma.challenge.create({
      data: {
        startDate: new Date(startDate),
        endDate: new Date(endDate),
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
            id: parseInt(grade)
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
        select: {
          id: true,
          startDate: true,
          endDate: true,
          grade: {
            select: {
              name: true
            }
          },
          location: {
            select: {
              name: true
            }
          },
          zone: {
            select: {
              name: true,
              changeSchedule: {
                select: {
                  id: true,
                  changeIntervalWeeks: true
                }
              }
            }
          }
        },
        orderBy: { endDate: "desc" }
      });
    })
});

export type ChallengeDetails = inferRouterOutputs<AppRouter>["challenge"]["findUserChallenges"];
