import DefaultLayout from "@/layout/default-layout";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AUTH_ROUTES } from "./auth/auth-routes";
import NotFoundPage from "@/pages/404/not-found-page";

export const AllRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<DefaultLayout />}>
          {AUTH_ROUTES}
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
};
