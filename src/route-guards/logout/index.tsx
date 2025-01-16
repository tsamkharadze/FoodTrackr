import { useAtomValue } from "jotai";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import React, { PropsWithChildren } from "react";
import { userAtom } from "@/store/auth";
import i18n from "@/i18n";
import { AUTH_PATHS } from "@/routes/auth/auth.enum";

export const LogoutGuard: React.FC<PropsWithChildren> = ({ children }) => {
  const user = useAtomValue(userAtom);
  const lang = i18n.language;
  const location = useLocation();

  if (!user) {
    return (
      <Navigate
        state={{ from: location }}
        to={`/${lang}/${AUTH_PATHS.LOGIN_PAGE}`}
      />
    );
  }

  return children || <Outlet />;
};
