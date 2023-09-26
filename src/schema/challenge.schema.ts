import z from "zod";
import dayjs from "dayjs";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";

dayjs.extend(isSameOrBefore);

export const ChallengeCreateInputSchema = z
  .object({
    location: z.string({ required_error: "Select a location" }),
    zone: z.string({ required_error: "Select a zone" }),
    grade: z.string({ required_error: "Select a grade" }),
    startDate: z.date({ required_error: "Pick a date" }),
    endDate: z.date()
  })
  .strict();

export type ChallengeCreateInputSchema = z.infer<typeof ChallengeCreateInputSchema>;
