import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import dayjs from "dayjs";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";
import {
  ChallengeCompleteInputSchema,
  ChallengeCreateInputSchema,
  ChallengeFindByIdInputSchema,
  ChallengeFindByLocationInputSchema
} from "~/schema/challenge.schema";
import { type RouterOutputs } from "~/lib/api";
import { type Singular } from "~/server/api/root";
import { EChallengeState } from "~/types/enums/EChallengeState";

dayjs.extend(isSameOrBefore);

export const challengeRouter = createTRPCRouter({
  create: protectedProcedure.input(ChallengeCreateInputSchema).mutation(async ({ ctx, input }) => {
    const { imageUrl, location, zone, grade, startDate, endDate } = input;

    return ctx.prisma.challenge.create({
      data: {
        startDate: new Date(startDate),
        endDate: new Date(endDate),
        imageUrl: imageUrl,
        completedAt: null,
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
    const whereClause = {
      locationId: input.locationId
    };

    const orderByClause = {};

    switch (input.state) {
      case EChallengeState.ACTIVE:
        whereClause.completedAt = null;
        whereClause.startDate = { lte: new Date() };
        whereClause.endDate = { gte: new Date() };
        break;
      case EChallengeState.COMPLETED:
        orderByClause.completedAt = "desc";
        whereClause.completedAt = { not: null };
        break;
      case EChallengeState.EXPIRED:
        whereClause.completedAt = null;
        whereClause.endDate = { lt: new Date() };
        break;
    }

    return ctx.prisma.challenge.findMany({
      where: whereClause,
      orderBy: orderByClause,
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
    return ctx.prisma.challenge.findUnique({
      where: {
        id: input.id
      },
      include: {
        zone: true
      }
    });
  }),
  complete: protectedProcedure.input(ChallengeCompleteInputSchema).mutation(async ({ ctx, input }) => {
    return ctx.prisma.challenge.update({
      where: {
        id: input.id
      },
      data: {
        completedAt: new Date()
      }
    });
  })
});

export type ChallengeWithZoneAndGrade = Singular<RouterOutputs["challenge"]["findAllByLocation"]>;
