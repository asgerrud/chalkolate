import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import dayjs from "dayjs";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";
import { ChallengeCreateInputSchema, ChallengeFindByIdInputSchema } from "~/schema/challenge.schema";
import { type RouterOutput, type Singular } from "~/server/api/root";

dayjs.extend(isSameOrBefore);

export const challengeRouter = createTRPCRouter({
  create: protectedProcedure.input(ChallengeCreateInputSchema).mutation(async ({ ctx, input }) => {
    const { imageUrl, location, zone, grade, startDate, endDate } = input;

    return await ctx.prisma.challenge.create({
      data: {
        startDate: new Date(startDate),
        endDate: new Date(endDate),
        imageUrl: imageUrl,
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
  findById: protectedProcedure.input(ChallengeFindByIdInputSchema).query(async ({ ctx, input }) => {
    return await ctx.prisma.challenge.findUnique({
      where: {
        id: input.id
      },
      include: {
        zone: true
      }
    });
  }),
  findLocationsWithUserChallenges: protectedProcedure.query(({ ctx }) => {
    return ctx.prisma.location.findMany({
      include: {
        challenges: {
          where: { userId: ctx.session.user.id },
          include: {
            zone: {
              select: {
                name: true,
                changeSchedule: true
              }
            },
            grade: {
              select: {
                hex: true
              }
            }
          },
          orderBy: {
            endDate: "asc"
          }
        }
      }
    });
  })
});

export type ChallengeById = RouterOutput["challenge"]["findById"];

export type FindLocationsWithUserChallenges = RouterOutput["challenge"]["findLocationsWithUserChallenges"];
export type LocationWithUserChallenges = Singular<FindLocationsWithUserChallenges>;
export type ChallengesByLocation = Singular<FindLocationsWithUserChallenges[number]["challenges"]>;
