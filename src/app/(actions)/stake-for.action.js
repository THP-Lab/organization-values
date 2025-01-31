"use server";

import { z } from "zod";

const stakeForSchema = z.object({
  amount: z
    .number({
      invalid_type_error: "Amount must be a number",
      required_error: "Amount is required",
    })
    .min(0.001, "Amount must be at least 0.001 ETH"),
});

export async function stakeFor(formData) {
  const validatedFields = stakeForSchema.safeParse({
    amount: Number(formData.get("amount")),
  });

  if (!validatedFields.success) {
    console.log(
      "Validation failed:",
      validatedFields.error.flatten().fieldErrors
    );
    return {
      success: false,
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 5000));

  console.log("Staking for successful");
  return { success: true };
}
