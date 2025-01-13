import { z } from "zod";

export const profileSchema = z.object({
  full_name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name must be less than 50 characters"),
  age: z
    .number()
    .min(13, "You must be at least 13 years old")
    .max(120, "Please enter a valid age"),
  height: z
    .number()
    .min(50, "Height must be at least 50cm")
    .max(300, "Please enter a valid height"),
  weight: z
    .number()
    .min(20, "Weight must be at least 20kg")
    .max(500, "Please enter a valid weight"),
  sex: z.enum(["Male", "Female"]),
  avatar_url: z.string().optional(),
});

export type ProfileFormData = z.infer<typeof profileSchema>;
