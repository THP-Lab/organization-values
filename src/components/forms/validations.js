import { z } from "zod";

export const stakeFormSchema = z.object({
  amount: z.number().min(0.001, "Minimum stake amount is 0.001 ETH"),
});

export const withdrawFormSchema = z.object({
  amount: z
    .number()
    .nonnegative("Amount must be positive")
    .min(0.000000000000000001, "Minimum withdrawal amount is 1e-18 ETH")
    .max(z.number(), "Cannot withdraw more than available balance"),
  maxAmount: z.number(),
});

export const proposeValueFormSchema = z.object({
  valueName: z
    .string()
    .min(3, "Name must be at least 3 characters")
    .max(50, "Name cannot exceed 50 characters"),
  initialStake: z.number().min(0.001, "Minimum stake amount is 0.001 ETH"),
  forumPost: z
    .string()
    .url("Must be a valid URL")
    .regex(
      /^https:\/\/(www\.)?(kialo\.com\/.*)$/,
      "Must be a Kialo URL (e.g. https://www.kialo.com/...)"
    )
    .optional()
    .or(z.literal("")),
  description: z
    .string()
    .min(3, "Description must be at least 3 characters")
    .max(640, "Description cannot exceed 640 characters"),
});
