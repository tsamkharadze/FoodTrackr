import { z } from "zod";

export const profileSchema = (t: (key: string) => string) =>
  z.object({
    full_name: z
      .string()
      .min(2, t("validations-translation.profile.name.min"))
      .max(50, t("validations-translation.profile.name.max")),
    age: z
      .number()
      .min(13, t("validations-translation.profile.age.min"))
      .max(120, t("validations-translation.profile.age.max")),
    height: z
      .number()
      .min(50, t("validations-translation.profile.height.min"))
      .max(300, t("validations-translation.profile.height.max")),
    weight: z
      .number()
      .min(20, t("validations-translation.profile.weight.min"))
      .max(500, t("validations-translation.profile.weight.max")),
    sex: z.enum(["Male", "Female"]),
    avatar_url: z.string().optional(),
  });

export type ProfileFormData = z.infer<ReturnType<typeof profileSchema>>;
