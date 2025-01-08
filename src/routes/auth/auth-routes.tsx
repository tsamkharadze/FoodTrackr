import LoginView from "@/pages/login/view/login-view";
import { AUTH_PATHS } from "./auth.enum";
import { Route } from "react-router-dom";

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
];
