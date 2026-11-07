import { z } from "zod";

export const reviewSchema = z.object({
  fullname: z.string().min(3, { error: "Fullname is required" }),
  description: z.string().optional(),
  rating: z
    .number()
    .min(1, { error: "Rating should be atleast 1." })
    .max(5, { error: "Rating can't be higher than 5" }),
});

export type ProductReview = z.infer<typeof reviewSchema>;
