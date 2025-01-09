import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";
import { useSignUp } from "@/react-query/mutation/authorization";
import { useNavigate } from "react-router-dom";
import { AUTH_PATHS } from "@/routes/auth/auth.enum";

interface RegisterFormInputs {
  email: string;
  password: string;
}

export function RegisterForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const { t } = useTranslation();
  const { handleSubmit, register } = useForm<RegisterFormInputs>();
  const navigate = useNavigate();

  const { mutate: handleSignUp } = useSignUp();

  const onSubmit = (data: RegisterFormInputs) => {
    console.log(data);
    handleSignUp(data, {
      onSuccess: () => {
        console.log("user succesfully registered");
      },
    });
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">
            {t("register-trans.title")}
          </CardTitle>
          <CardDescription>{t("register-trans.description")}</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="email">{t("register-trans.email-label")}</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder={t("register-trans.email-placeholder")}
                  required
                  {...register("email")}
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">
                    {t("register-trans.password-label")}
                  </Label>
                </div>
                <Input
                  id="password"
                  type="password"
                  required
                  {...register("password")}
                />
              </div>
              <Button type="submit" className="w-full">
                {t("register-trans.login-button")}
              </Button>
            </div>
            <div className="mt-4 text-center text-sm">
              {t("register-trans.signup-prompt")}{" "}
              <a
                href="#"
                className="underline underline-offset-4"
                onClick={() => navigate(AUTH_PATHS.LOGIN_PAGE)}
              >
                {t("register-trans.signup-link")}
              </a>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
