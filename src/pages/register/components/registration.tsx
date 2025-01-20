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
import { useSignUp } from "@/react-query/mutation/authorization";
import { useNavigate } from "react-router-dom";
import { AUTH_PATHS } from "@/routes/auth/auth.enum";
import {
  RegisterFormInputs,
  registerSchema,
} from "@/lib/validations/register.schema";
import { useToast } from "@/hooks/use-toast";

export function RegisterForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const { t, i18n } = useTranslation();
  const lang = i18n.language;
  const { toast } = useToast();

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<RegisterFormInputs>({
    resolver: zodResolver(registerSchema),
  });

  const navigate = useNavigate();

  const { mutate: handleSignUp } = useSignUp();

  const onSubmit = (data: RegisterFormInputs) => {
    console.log(data);
    handleSignUp(data, {
      onSuccess: () => {
        toast({
          title: t("register-trans.toast-title"),
          description: t("register-trans.toast-message"),
        });
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
                  {...register("email")}
                />
                {errors.email && (
                  <p className="text-sm text-red-500">{errors.email.message}</p>
                )}
              </div>
              <div className="grid gap-2">
                <Label htmlFor="password">
                  {t("register-trans.password-label")}
                </Label>
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
                {t("register-trans.login-button")}
              </Button>
            </div>
            <div className="mt-4 text-center text-sm">
              {t("register-trans.signup-prompt")}{" "}
              <a
                href="#"
                className="underline underline-offset-4"
                onClick={() => navigate(`/${lang}/${AUTH_PATHS.LOGIN_PAGE}`)}
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
