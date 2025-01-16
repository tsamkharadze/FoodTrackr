/* eslint-disable react-refresh/only-export-components */

import { Route } from "react-router-dom";
import { DASHBOARD_PATHS } from "./dashboard.enum";
import { lazy, Suspense } from "react";
import { AuthGuard } from "@/route-guards/auth";
import { LogoutGuard } from "@/route-guards/logout";

const HomeView = lazy(() => import("@/pages/home/view/home-view"));
const BmiCalcView = lazy(() => import("@/pages/bmi-calc/views/bmi-calc-view"));
const DashboardView = lazy(
  () => import("@/pages/dashboard/view/dashboard-view"),
);

export const DASHBOARD_ROUTES = [
  <Route
    key="home"
    path={DASHBOARD_PATHS.HOME}
    element={
      <AuthGuard>
        <Suspense>
          <HomeView />
        </Suspense>
      </AuthGuard>
    }
  />,
  <Route
    key="BMI-CALC"
    path={DASHBOARD_PATHS.BMI_CALC}
    element={
      <Suspense>
        <BmiCalcView />
      </Suspense>
    }
  />,
  <Route
    key="Dashboard"
    path={DASHBOARD_PATHS.DASHBOARD}
    element={
      <LogoutGuard>
        <Suspense>
          <DashboardView />
        </Suspense>
      </LogoutGuard>
    }
  />,
];
