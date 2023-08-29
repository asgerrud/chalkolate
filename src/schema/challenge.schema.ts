import z from "zod";
import dayjs from "dayjs";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";

dayjs.extend(isSameOrBefore);

export const ChallengeCreateInputSchema = z
  .object({
    location: z.string().refine((location) => !!location, "Enter a location"),
    zone: z.string().refine((zone) => !!zone, "Enter a zone"),
    grade: z.string().refine((grade) => !!grade, "Enter a grade"),
    startDate: z
      .string()
      .refine((date) => {
        return dayjs(date).isValid();
      }, "Enter a valid date")
      .refine((date) => {
        return dayjs(date).isSameOrBefore(dayjs());
      }, "The date cannot be in the future"),
    endDate: z.string()
  })
  .strict();

export type ChallengeCreateInputSchema = z.infer<typeof ChallengeCreateInputSchema>;
