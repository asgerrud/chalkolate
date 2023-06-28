import z from "zod";

export const ChallengeCreateInputSchema = z
  .object({
    location: z.string().uuid(),
    zone: z.string().uuid(),
    grade: z.number(),
    startDate: z.date(),
    endDate: z.date(),
    techniques: z.array(z.number()).optional()
  })
  .strict();
