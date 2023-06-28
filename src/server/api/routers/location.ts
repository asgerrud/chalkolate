import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { type inferRouterInputs } from "@trpc/server";
import { type AppRouter } from "~/server/api/root";

export const locationRouter = createTRPCRouter({
  findAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.location.findMany();
  })
});

export type Location = inferRouterInputs<AppRouter>["location"]["findAll"];
