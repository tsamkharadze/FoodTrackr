import { FoodDiaryEntry } from "../components/add-food/add-food";
import { DashboardCalendar } from "../components/calendar/calendar";
import { CaloriesChart } from "../components/calories-chart/calories-chart";
import { MacronutrientsChart } from "../components/macronutrients-chart/macronutrients-chart";
import { RecentMeals } from "../components/recent-meals/recent-meals";
import { WeightStatusChart } from "../components/weight/weight-control";

const DashboardView = () => {
  return (
    <>
      <DashboardCalendar />
      <div className="text-center flex flex-col md:flex-row md:justify-center md:items-center gap-4 h-full">
        <div className="flex-grow">
          <CaloriesChart />
        </div>
        <div className="flex-grow">
          <MacronutrientsChart />
        </div>
      </div>

      <WeightStatusChart />
      <FoodDiaryEntry />
      <RecentMeals />
    </>
  );
};

export default DashboardView;
