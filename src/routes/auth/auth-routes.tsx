/* eslint-disable react-refresh/only-export-components */

import { AUTH_PATHS } from "./auth.enum";
import { Route } from "react-router-dom";
import { lazy, Suspense } from "react";

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
      // <LogoutGuard>
      <Suspense>
        <LoginView />
      </Suspense>
      // </LogoutGuard>
    }
  />,
  <Route
    key="register"
    path={AUTH_PATHS.REGISTER_PAGE}
    element={
      // <LogoutGuard>
      <Suspense>
        <RegistrationView />
      </Suspense>
      // </LogoutGuard>
    }
  />,
  <Route
    key="profile"
    path={AUTH_PATHS.USER_PROFILE}
    element={
      // <LogoutGuard>
      <Suspense>
        <ProfileView />
      </Suspense>
      // </LogoutGuard>
    }
  />,
];
