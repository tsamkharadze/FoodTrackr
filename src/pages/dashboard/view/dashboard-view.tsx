import { DashboardCalendar } from "../components/calendar/calendar";
import { CaloriesChart } from "../components/calories-chart/calories-chart";
import { MacronutrientsChart } from "../components/macronutrients-chart/macronutrients-chart";
import { WeightStatusChart } from "../components/weight/weight-control";

const DashboardView = () => {
  return (
    <>
      <WeightStatusChart />
      <DashboardCalendar />
      <CaloriesChart />
      <MacronutrientsChart />
      {/* <FoodList /> */}
    </>
  );
};

export default DashboardView;
