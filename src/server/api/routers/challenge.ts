import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import dayjs from "dayjs";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";
import {
  ChallengeCreateInputSchema,
  ChallengeFindByIdInputSchema,
  ChallengeFindByLocationInputSchema
} from "~/schema/challenge.schema";
import { type RouterOutputs } from "~/lib/api";
import { type Singular } from "~/server/api/root";

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
  findAllByLocation: protectedProcedure.input(ChallengeFindByLocationInputSchema).query(async ({ ctx, input }) => {
    return await ctx.prisma.challenge.findMany({
      where: {
        locationId: input.locationId
      },
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
  })
});

export type ChallengeWithZoneAndGrade = Singular<RouterOutputs["challenge"]["findAllByLocation"]>;
