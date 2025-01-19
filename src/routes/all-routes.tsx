import DefaultLayout from "@/layout/default/default-layout";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { AUTH_ROUTES } from "./auth/auth-routes";
import NotFoundPage from "@/pages/404/not-found-page";
import { DASHBOARD_ROUTES } from "./dashboard/dashboard-routes";
import HomeView from "@/pages/home/view/home-view";
import LanguageGuard from "@/guards/language-guard";
import { AuthGuard } from "@/guards/route-guards/auth";

export const AllRoutes = () => {
  return (
    <BrowserRouter>
      <LanguageGuard />
      <Routes>
        <Route path="/" element={<Navigate to="/ka" />} />
        <Route path="/:lang" element={<DefaultLayout />}>
          <Route
            index
            element={
              <AuthGuard>
                <HomeView />
              </AuthGuard>
            }
          />
          {AUTH_ROUTES}
          {DASHBOARD_ROUTES}
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
};
