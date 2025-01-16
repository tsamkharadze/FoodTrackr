import { FoodDiaryEntry } from "../components/add-food/add-food";
import { DashboardCalendar } from "../components/calendar/calendar";
import { CaloriesChart } from "../components/calories-chart/calories-chart";
import { MacronutrientsChart } from "../components/macronutrients-chart/macronutrients-chart";
import { RecentMeals } from "../components/recent-meals/recent-meals";
import { WeightStatusChart } from "../components/weight/weight-control";

const DashboardView = () => {
  return (
    <>
      <WeightStatusChart />
      <FoodDiaryEntry />
      <DashboardCalendar />
      <CaloriesChart />
      <MacronutrientsChart />
      <RecentMeals />
      {/* <ProfileForm /> */}
      {/* <FoodList /> */}
    </>
  );
};

export default DashboardView;
