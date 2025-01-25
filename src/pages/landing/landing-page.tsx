import { Link } from "react-router-dom";

import { Activity, TrendingUp, Utensils, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { AUTH_PATHS } from "@/routes/auth/auth.enum";
import { useTranslation } from "react-i18next";

export default function Landing() {
  const { t, i18n } = useTranslation();
  const lang = i18n.language;
  const featuresTranslation = t("landing-translation.landing.features.list", {
    returnObjects: true,
  }) as { name: string; description: string }[];

  const features = [
    {
      name: featuresTranslation[0].name,
      description: featuresTranslation[0].description,
      icon: Utensils,
    },
    {
      name: featuresTranslation[1].name,
      description: featuresTranslation[1].description,
      icon: TrendingUp,
    },
    {
      name: featuresTranslation[2].name,
      description: featuresTranslation[2].description,
      icon: Activity,
    },
    {
      name: featuresTranslation[3].name,
      description: featuresTranslation[3].description,

      icon: Shield,
    },
  ];
  return (
    <div className="bg-background">
      {/* Hero section */}
      <div className="relative isolate overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div
            className="absolute inset-0 bg-gradient-to-br from-indigo-50 to-background"
            style={{
              backgroundImage: `url('https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=2850&q=80')`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              opacity: "0.1",
            }}
          />
        </div>

        <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
          <div className="mx-auto max-w-2xl lg:mx-0">
            <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-6xl">
              {t("landing-translation.landing.hero.title")}
            </h1>
            <p className="mt-6 text-lg leading-8 text-muted-foreground">
              {t("landing-translation.landing.hero.description")}
            </p>
            <div className="mt-10 flex items-center gap-x-6">
              <Button asChild>
                <Link to={`/${lang}/${AUTH_PATHS.REGISTER_PAGE}`}>
                  {t("landing-translation.landing.hero.getStarted")}
                </Link>
              </Button>
              <Button variant="ghost" asChild>
                <Link to={`/${lang}/${AUTH_PATHS.LOGIN_PAGE}`}>
                  {t("landing-translation.landing.hero.alreadyHaveAccount")}
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Features section */}
      <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-base font-semibold leading-7 text-primary">
            {t("landing-translation.landing.features.toolsTitle")}
          </h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            {t("landing-translation.landing.features.toolsSubtitle")}
          </p>
          <p className="mt-6 text-lg leading-8 text-muted-foreground">
            {t("landing-translation.landing.features.toolsDescription")}
          </p>
        </div>
        <div className="mx-auto mt-16 grid max-w-4xl gap-8 sm:grid-cols-2 lg:max-w-7xl lg:grid-cols-4 lg:gap-10">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <Card
                key={feature.name}
                className="flex flex-col items-center p-6 text-center bg-card shadow-lg rounded-lg hover:shadow-xl"
              >
                <CardHeader className="flex flex-col items-center gap-3">
                  <Icon className="h-10 w-10 text-primary" aria-hidden="true" />
                  <CardTitle className="text-lg font-medium">
                    {feature.name}
                  </CardTitle>
                </CardHeader>
                <CardDescription className="mt-4 text-sm text-muted-foreground">
                  {feature.description}
                </CardDescription>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
}
