import i18n from "@/i18n";
import { DASHBOARD_PATHS } from "@/routes/dashboard/dashboard.enum";
import { userAtom } from "@/store/auth";
import { useAtom } from "jotai";
import React from "react";
import { PropsWithChildren } from "react";
import { Navigate, Outlet } from "react-router-dom";

export const AuthGuard: React.FC<PropsWithChildren> = ({ children }) => {
  const [user] = useAtom(userAtom);
  const lang = i18n.language;

  if (user) {
    return <Navigate to={`/${lang}/${DASHBOARD_PATHS.DASHBOARD}`} />;
  }

  return children || <Outlet />;
};
