import z from "zod";

export const ActivityCreateInputSchema = z
  .object({
    date: z.date(),
    duration: z.number().optional(),
    location: z.string().uuid()
  })
  .strict();
