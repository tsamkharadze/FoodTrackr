import { NavLink, useNavigate } from "react-router-dom";
import { Home, UtensilsCrossed, Scale, User, LogIn } from "lucide-react";
import { useAtomValue } from "jotai";
import { profileAtom, userAtom } from "@/store/auth";
import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";
import { AUTH_PATHS } from "@/routes/auth/auth.enum";
import { useLogOut } from "@/react-query/mutation/authorization";
import { ModeToggle } from "@/components/mode-toogle";
import { ChangeLanguage } from "@/components/lang-switcher";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export const Header = () => {
  const { t, i18n } = useTranslation();
  const user = useAtomValue(userAtom);
  const navigate = useNavigate();
  const lang = i18n.language;
  const profile = useAtomValue(profileAtom);
  const avatar = profile?.avatar_url;

  const { mutate: handleLogout } = useLogOut();

  const unauthorized = [
    { name: t("header-trans.home"), href: `/${lang}/home`, icon: Home },
    {
      name: t("header-trans.food-catalog"),
      href: `/${lang}/food-diary`,
      icon: UtensilsCrossed,
    },
    {
      name: t("header-trans.bmi-calculator"),
      href: `/${lang}/BMI`,
      icon: Scale,
    },
  ];
  const authorized = [
    { name: t("header-trans.dashboard"), href: "/", icon: Home },
    {
      name: t("header-trans.food-diary"),
      href: "/food-diary",
      icon: UtensilsCrossed,
    },
    { name: t("header-trans.weight"), href: "/weight", icon: Scale },
    { name: t("header-trans.profile"), href: `/${lang}/profile`, icon: User },
  ];

  const navigation = !user ? unauthorized : authorized;

  return (
    <header className="border-b-[1px] bg-white dark:bg-black">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Brand Name */}
          <NavLink
            to={`/${lang}/home`}
            className="text-2xl font-bold text-indigo-600"
          >
            Fitness Tracker
          </NavLink>

          {/* Navigation Links */}
          <nav className="flex space-x-4">
            {navigation.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.name}
                  to={item.href}
                  className={({ isActive }) =>
                    `inline-flex items-center border-b-2 px-1 pt-1 text-sm font-medium ${
                      isActive
                        ? "border-indigo-500 text-gray-900"
                        : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
                    }`
                  }
                >
                  <Icon className="mr-2 h-4 w-4" />
                  {item.name}
                </NavLink>
              );
            })}
          </nav>

          {/* Right-side Actions */}
          <div className="flex items-center space-x-4">
            <ModeToggle />
            <ChangeLanguage />

            {!user ? (
              <Button onClick={() => navigate(AUTH_PATHS.LOGIN_PAGE)}>
                <LogIn className="mr-2 h-4 w-4" />
                {t("header-trans.sign-in")}
              </Button>
            ) : (
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <Avatar>
                    {avatar ? (
                      <div
                        className="aspect-square w-full"
                        dangerouslySetInnerHTML={{ __html: avatar }}
                      />
                    ) : (
                      <AvatarImage />
                    )}
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuLabel>
                    {t("header-trans.my-account")}
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <NavLink to="/profile">
                    <DropdownMenuItem>
                      {t("header-trans.edit-profile")}
                    </DropdownMenuItem>
                  </NavLink>
                  <DropdownMenuItem>
                    {t("header-trans.help-support")}
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    {t("header-trans.feedback")}
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleLogout()}>
                    {t("header-trans.sign-out")}
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
