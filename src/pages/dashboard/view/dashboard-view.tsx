import { CaloriesChart } from "../components/calories-chart/calories-chart";
import { MacronutrientsChart } from "../components/macronutrients-chart/macronutrients-chart";

const DashboardView = () => {
  return (
    <>
      <CaloriesChart />
      <MacronutrientsChart />
      {/* <FoodList /> */}
    </>
  );
};

export default DashboardView;
