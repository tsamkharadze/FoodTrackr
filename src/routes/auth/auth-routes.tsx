/* eslint-disable react-refresh/only-export-components */

import { AUTH_PATHS } from "./auth.enum";
import { Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import { LogoutGuard } from "@/guards/route-guards/logout";
import { AuthGuard } from "@/guards/route-guards/auth";
import { Spinner } from "@/components/ui/spinner";

const LoginView = lazy(() => import("@/pages/login/view/login-view"));
const RegistrationView = lazy(
  () => import("@/pages/register/view/registration-view"),
);
const ProfileView = lazy(() => import("@/pages/profile/view/profile-view"));

export const AUTH_ROUTES = [
  <Route
    key="login"
    path={AUTH_PATHS.LOGIN_PAGE}
    element={
      <AuthGuard>
        <Suspense fallback={<Spinner size={"large"} />}>
          <LoginView />
        </Suspense>
      </AuthGuard>
    }
  />,
  <Route
    key="register"
    path={AUTH_PATHS.REGISTER_PAGE}
    element={
      <AuthGuard>
        <Suspense fallback={<Spinner size={"large"} />}>
          <RegistrationView />
        </Suspense>
      </AuthGuard>
    }
  />,
  <Route
    key="profile"
    path={AUTH_PATHS.USER_PROFILE}
    element={
      <LogoutGuard>
        <Suspense fallback={<Spinner size={"large"} />}>
          <ProfileView />
        </Suspense>
      </LogoutGuard>
    }
  />,
];
