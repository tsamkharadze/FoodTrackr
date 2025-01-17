import { z } from "zod";
import { TFunction } from "i18next";

// Custom error map
export const createCustomZodErrorMap = (t: TFunction): z.ZodErrorMap => {
  return (issue, ctx) => {
    switch (issue.code) {
      case z.ZodIssueCode.invalid_type:
        if (issue.expected === "number" && issue.received === "nan") {
          return {
            message: t("validations-translation.errors.invalid_number"),
          };
        }
        return {
          message: t("validations-translation.errors.invalid_type", {
            expected: issue.expected,
            received: issue.received,
          }),
        };
      default:
        return { message: ctx.defaultError }; // Fallback to default error
    }
  };
};
