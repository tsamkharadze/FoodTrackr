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
import { zodResolver } from "@hookform/resolvers/zod";
import { useSignIn } from "@/react-query/mutation/authorization";
import { useLocation, useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import { AUTH_PATHS } from "@/routes/auth/auth.enum";
import { LoginFormInputs, loginSchema } from "@/lib/validations/login.schema";

export function LoginForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const { t, i18n } = useTranslation();
  const lang = i18n.language;
  const navigate = useNavigate();
  const location = useLocation();
  const queryClient = useQueryClient();

  const toNavigate =
    location?.state?.from.pathname + location?.state?.from.search || "/";

  const { mutate: handleLogin } = useSignIn();

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<LoginFormInputs>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = (data: LoginFormInputs) => {
    handleLogin(data, {
      onSuccess: () => {
        navigate(toNavigate);
        queryClient.invalidateQueries();
      },
    });
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">{t("login-trans.title")}</CardTitle>
          <CardDescription>{t("login-trans.description")}</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="email">{t("login-trans.email-label")}</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder={t("login-trans.email-placeholder")}
                  {...register("email")}
                />
                {errors.email && (
                  <p className="text-sm text-red-500">{errors.email.message}</p>
                )}
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">
                    {t("login-trans.password-label")}
                  </Label>
                  <a
                    href="#"
                    className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                  >
                    {t("login-trans.forgot-password")}
                  </a>
                </div>
                <Input
                  id="password"
                  type="password"
                  {...register("password")}
                />
                {errors.password && (
                  <p className="text-sm text-red-500">
                    {errors.password.message}
                  </p>
                )}
              </div>
              <Button type="submit" className="w-full">
                {t("login-trans.login-button")}
              </Button>
            </div>
            <div className="mt-4 text-center text-sm">
              {t("login-trans.signup-prompt")}{" "}
              <a
                href="#"
                className="underline underline-offset-4"
                onClick={() => navigate(`/${lang}/${AUTH_PATHS.REGISTER_PAGE}`)}
              >
                {t("login-trans.signup-link")}
              </a>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
