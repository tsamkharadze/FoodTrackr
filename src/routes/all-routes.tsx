import DefaultLayout from "@/layout/default/default-layout";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AUTH_ROUTES } from "./auth/auth-routes";
import NotFoundPage from "@/pages/404/not-found-page";
import { DASHBOARD_ROUTES } from "./dashboard/dashboard-routes";

export const AllRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/:lang" element={<DefaultLayout />}>
          {AUTH_ROUTES}
          {DASHBOARD_ROUTES}
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
};
