import { Route } from "react-router-dom";
import { DASHBOARD_PATHS } from "./dashboard.enum";
import BmiCalcView from "@/pages/bmi-calc/views/bmi-calc-view";
import DashboardView from "@/pages/dashboard/view/dashboard-view";

export const DASHBOARD_ROUTES = [
  <Route
    key="BMI-CALC"
    path={DASHBOARD_PATHS.BMI_CALC}
    element={
      // <LogoutGuard>
      <BmiCalcView />
      // </LogoutGuard>
    }
  />,
  <Route
    key="Dashboard"
    path={DASHBOARD_PATHS.DASHBOARD}
    element={
      // <LogoutGuard>
      <DashboardView />
      // </LogoutGuard>
    }
  />,
];
