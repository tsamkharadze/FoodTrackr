import { DashboardCalendar } from "../components/calendar/calendar";
import { CaloriesChart } from "../components/calories-chart/calories-chart";
import { MacronutrientsChart } from "../components/macronutrients-chart/macronutrients-chart";

const DashboardView = () => {
  return (
    <>
      <DashboardCalendar />
      <CaloriesChart />
      <MacronutrientsChart />
      {/* <FoodList /> */}
    </>
  );
};

export default DashboardView;
