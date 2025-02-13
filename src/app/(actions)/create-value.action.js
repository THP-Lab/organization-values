"use server";

import { gqlClient } from "@/backend/gqlClient";
import { pinThingMutation } from "@/backend/mutations";
import { z } from "zod";

const valueSchema = z.object({
  valueName: z
    .string({
      invalid_type_error: "Value name must be a string",
      required_error: "Value name is required",
    })
    .min(3, "Value name must be at least 3 characters")
    .max(50, "Value name must be 50 characters or less"),
  initialStake: z
    .number({
      invalid_type_error: "Initial stake must be a number",
      required_error: "Initial stake is required",
    })
    .min(0.001, "Initial stake must be at least 0.001 ETH"),
  forumPost: z
    .string()
    .url()
    .regex(/^https:\/\/kialo\.com\//i, "Forum post must be a Kialo URL")
    .optional()
    .nullable(),
  description: z
    .string({
      invalid_type_error: "Description must be a string",
      required_error: "Description is required",
    })
    .min(20, "Description must be at least 20 characters")
    .max(640, "Description must be 640 characters or less"),
});

export async function createValue(formData) {
  const forumPost = formData.get("forumPost");

  const validatedFields = valueSchema.safeParse({
    valueName: formData.get("valueName"),
    initialStake: Number(formData.get("initialStake")),
    forumPost: forumPost || "",
    description: formData.get("description"),
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

  // Upload value to IPFS
  try {
    const result = await gqlClient.mutate({
      mutation: pinThingMutation,
      variables: {
        thing: {
          name: validatedFields.data.valueName,
          description: validatedFields.data.description,
          url: validatedFields.data.forumPost,
          image: "",
        },
      },
    });

    if (!result.data?.pinThing?.uri) {
      return {
        success: false,
        errors: {
          description: "Failed to create value, please try again.",
        },
      };
    }

    console.log("Value created successfully");
    return {
      success: true,
      ipfsUri: result.data.pinThing.uri,
      initialStake: validatedFields.data.initialStake,
    };
  } catch (error) {
    console.error("GraphQL mutation failed:", JSON.stringify(error, null, 2));
    return {
      success: false,
      errors: {
        description:
          "Failed to create value: " + (error.message || "Unknown error"),
      },
    };
  }
}
