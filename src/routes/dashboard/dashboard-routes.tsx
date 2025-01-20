/* eslint-disable react-refresh/only-export-components */

import { Route } from "react-router-dom";
import { DASHBOARD_PATHS } from "./dashboard.enum";
import { lazy, Suspense } from "react";
import { AuthGuard } from "@/guards/route-guards/auth";
import { LogoutGuard } from "@/guards/route-guards/logout";
import { Spinner } from "@/components/ui/spinner";

const LandingView = lazy(() => import("@/pages/landing/landing-page"));
const BmiCalcView = lazy(() => import("@/pages/bmi-calc/views/bmi-calc-view"));
const DashboardView = lazy(
  () => import("@/pages/dashboard/view/dashboard-view")
);
const FoodsTable = lazy(() => import("@/pages/foods-table/foods-table"));

export const DASHBOARD_ROUTES = [
  <Route
    key="home"
    path={DASHBOARD_PATHS.HOME}
    element={
      <AuthGuard>
        <Suspense fallback={<Spinner size={"large"} />}>
          <LandingView />
        </Suspense>
      </AuthGuard>
    }
  />,
  <Route
    key="BMI-CALC"
    path={DASHBOARD_PATHS.BMI_CALC}
    element={
      <Suspense fallback={<Spinner size={"large"} />}>
        <BmiCalcView />
      </Suspense>
    }
  />,
  <Route
    key="Dashboard"
    path={DASHBOARD_PATHS.DASHBOARD}
    element={
      <LogoutGuard>
        <Suspense fallback={<Spinner size={"large"} />}>
          <DashboardView />
        </Suspense>
      </LogoutGuard>
    }
  />,
  <Route
    key="foods-table"
    path={DASHBOARD_PATHS.FOODS_TABLE}
    element={
      <Suspense fallback={<Spinner size={"large"} />}>
        <FoodsTable />
      </Suspense>
    }
  />,
];
