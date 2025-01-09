import { Route } from "react-router-dom";
import { DASHBOARD_PATHS } from "./dashboard.enum";
import BmiCalcView from "@/pages/bmi-calc/views/bmi-calc-view";

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
];
