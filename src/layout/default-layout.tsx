import { NavLink, Outlet, useLocation, useNavigate } from "react-router-dom";
import {
  Home,
  UtensilsCrossed,
  Scale,
  User,
  LogOut,
  LogIn,
} from "lucide-react";
import { useAtomValue } from "jotai";
import { userAtom } from "@/store/auth";
import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";
import { AUTH_PATHS } from "@/routes/auth/auth.enum";
import { useLogOut } from "@/react-query/mutation/authorization";
import { ModeToggle } from "@/components/mode-toogle";
import { ChangeLagunge } from "@/components/lang-switcher";

export default function DefaultLayout() {
  const { t } = useTranslation();
  const user = useAtomValue(userAtom);
  const navigate = useNavigate();

  const unauthorized = [
    { name: t("header-trans.home"), href: "/", icon: Home },
    {
      name: t("header-trans.food-catalog"),
      href: "/food-diary",
      icon: UtensilsCrossed,
    },
    { name: t("header-trans.bmi-calculator"), href: "/BMI", icon: Scale },
  ];
  const authorized = [
    { name: t("header-trans.dashboard"), href: "/", icon: Home },
    {
      name: t("header-trans.food-diary"),
      href: "/food-diary",
      icon: UtensilsCrossed,
    },
    { name: t("header-trans.weight"), href: "/weight", icon: Scale },
    { name: t("header-trans.profile"), href: "/profile", icon: User },
  ];

  const navigation = !user ? unauthorized : authorized;
  const location = useLocation();
  const { mutate: handleLogout } = useLogOut();

  return (
    <div className="min-h-screen dark:bg-black bg-gray-100">
      <div className="dark:bg-black bg-white shadow-sm">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 justify-between items-center">
            <div className="flex">
              <div className="flex flex-shrink-0 items-center">
                <span className="text-2xl font-bold text-indigo-600">
                  Fitness Tracker
                </span>
              </div>
              <nav className="ml-6 flex space-x-8">
                {navigation.map((item) => {
                  const Icon = item.icon;
                  return (
                    <NavLink
                      key={item.name}
                      to={item.href}
                      className={`inline-flex items-center border-b-2 px-1 pt-1 text-sm font-medium ${
                        location.pathname === item.href
                          ? "border-indigo-500 text-gray-900"
                          : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
                      }`}
                    >
                      <Icon className="mr-2 h-4 w-4" />
                      {item.name}
                    </NavLink>
                  );
                })}
              </nav>
            </div>
            <div className="flex mx-auto space-x-4">
              <ModeToggle /> {/* Mode Toggle Button */}
              <ChangeLagunge /> {/* Language Switcher */}
            </div>
            <div className="flex items-center">
              <span className="mr-4 text-sm text-gray-700">
                {/* Welcome, {profile?.full_name} */}
              </span>
              {!user ? (
                <Button onClick={() => navigate(AUTH_PATHS.LOGIN_PAGE)}>
                  <LogIn className="mr-2 h-4 w-4" />
                  {t("header-trans.sign-in")}
                </Button>
              ) : (
                <Button onClick={() => handleLogout()}>
                  <LogOut className="mr-2 h-4 w-4" />
                  {t("header-trans.sign-out")}
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>

      <main className="py-10">
        <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
