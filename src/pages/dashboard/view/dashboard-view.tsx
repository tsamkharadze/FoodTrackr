import { DashboardCalendar } from "../components/calendar/calendar";
import { CaloriesChart } from "../components/calories-chart/calories-chart";
import { MacronutrientsChart } from "../components/macronutrients-chart/macronutrients-chart";

const DashboardView = () => {
  return (
    <>
      <CaloriesChart />
      <MacronutrientsChart />
      <DashboardCalendar />
      {/* <FoodList /> */}
    </>
  );
};

export default DashboardView;
