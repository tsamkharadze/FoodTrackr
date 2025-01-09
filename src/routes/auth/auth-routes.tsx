import LoginView from "@/pages/login/view/login-view";
import { AUTH_PATHS } from "./auth.enum";
import { Route } from "react-router-dom";
import RegistrationView from "@/pages/register/view/registration-view";

export const AUTH_ROUTES = [
  <Route
    key="login"
    path={AUTH_PATHS.LOGIN_PAGE}
    element={
      // <LogoutGuard>
      <LoginView />
      // </LogoutGuard>
    }
  />,
  <Route
    key="register"
    path={AUTH_PATHS.REGISTER_PAGE}
    element={
      // <LogoutGuard>
      <RegistrationView />
      // </LogoutGuard>
    }
  />,
];
