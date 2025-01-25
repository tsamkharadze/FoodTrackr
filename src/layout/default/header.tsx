import { NavLink, useNavigate } from "react-router-dom";
import {
  Home,
  UtensilsCrossed,
  Scale,
  User,
  LogIn,
  Menu,
  LogOut,
} from "lucide-react";
import { useAtom, useAtomValue } from "jotai";
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
import { DASHBOARD_PATHS } from "@/routes/dashboard/dashboard.enum";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";
import { DialogDescription } from "@radix-ui/react-dialog";

export const Header = () => {
  const { t, i18n } = useTranslation();
  const user = useAtomValue(userAtom);
  const navigate = useNavigate();
  const lang = i18n.language;
  const [profile, setProfile] = useAtom(profileAtom);
  const avatar = profile?.avatar_url;
  const avatarFallback = profile?.full_name.split("")[0].toUpperCase() || "";

  const { mutate: handleLogout } = useLogOut();
  const onLogout = () => {
    handleLogout();
    setProfile(null);
  };

  const unauthorized = [
    { name: t("header-trans.home"), href: `/${lang}/home`, icon: Home },
    {
      name: t("header-trans.food-catalog"),
      href: `/${lang}/${DASHBOARD_PATHS.FOODS_TABLE}`,
      icon: UtensilsCrossed,
    },
    {
      name: t("header-trans.bmi-calculator"),
      href: `/${lang}/${DASHBOARD_PATHS.BMI_CALC}`,
      icon: Scale,
    },
  ];
  const authorized = [
    {
      name: t("header-trans.dashboard"),
      href: `/${lang}/${DASHBOARD_PATHS.DASHBOARD}`,
      icon: Home,
    },
    {
      name: t("header-trans.food-catalog"),
      href: `/${lang}/${DASHBOARD_PATHS.FOODS_TABLE}`,
      icon: UtensilsCrossed,
    },
    {
      name: t("header-trans.bmi-calculator"),
      href: `/${lang}/${DASHBOARD_PATHS.BMI_CALC}`,
      icon: Scale,
    },
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
            FoodTrackr{" "}
          </NavLink>

          {/* Desktop Navigation Links */}
          <nav className="hidden sm:flex space-x-4">
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
              <Button
                variant="secondary"
                onClick={() => navigate(AUTH_PATHS.LOGIN_PAGE)}
              >
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
                    <AvatarFallback>{avatarFallback}</AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuLabel>
                    {t("header-trans.my-account")}
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <NavLink to={`/${lang}/${AUTH_PATHS.USER_PROFILE}`}>
                    <DropdownMenuItem>
                      <User className="mr-2 h-4 w-4" />
                      {t("header-trans.profile")}
                    </DropdownMenuItem>
                  </NavLink>

                  <DropdownMenuItem onClick={() => onLogout()}>
                    <LogOut className="mr-2 h-4 w-4 text-red-500" />

                    {t("header-trans.sign-out")}
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>

          {/* Hamburger Menu */}
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="ghost" className="sm:hidden">
                <Menu className="h-6 w-6" />
              </Button>
            </DialogTrigger>
            <DialogContent
              className="sm:hidden"
              aria-describedby="dialog-description"
            >
              <DialogTitle></DialogTitle>

              <div className="hidden" id="dialog-description">
                {t("header-trans.mobile-navigation-description")}
              </div>
              <div className="flex flex-col space-y-4">
                {navigation.map((item, index) => {
                  const Icon = item.icon;
                  return (
                    <DialogDescription key={index}>
                      <NavLink
                        key={item.name}
                        to={item.href}
                        className={({ isActive }) =>
                          `inline-flex items-center text-sm font-medium ${
                            isActive
                              ? "text-indigo-500"
                              : "text-gray-500 hover:text-gray-700"
                          }`
                        }
                      >
                        <Icon className="mr-2 h-4 w-4" />
                        {item.name}
                      </NavLink>
                    </DialogDescription>
                  );
                })}
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </header>
  );
};
