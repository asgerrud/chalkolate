import { z } from "zod";

export const ChallengeCreateInputSchema = z
  .object({
    imageUrl: z.string({ required_error: "Select an image" }),
    location: z.string({ required_error: "Select a location" }),
    zone: z.string({ required_error: "Select a zone" }),
    grade: z.string({ required_error: "Select a grade" }),
    startDate: z.date({ required_error: "Pick a date" }),
    endDate: z.date()
  })
  .strict();

export type ChallengeCreateInputSchema = z.infer<typeof ChallengeCreateInputSchema>;

export const ChallengeFindByIdInputSchema = z.object({
  id: z.string()
});

export const ChallengeFindByLocationInputSchema = z.object({
  locationId: z.string()
});
