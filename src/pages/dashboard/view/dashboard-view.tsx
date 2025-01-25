import { useAtomValue } from "jotai";
import { useState, useEffect } from "react";
import { FoodDiaryEntry } from "../components/add-food/add-food";
import { DashboardCalendar } from "../components/calendar/calendar";
import { CaloriesChart } from "../components/calories-chart/calories-chart";
import { MacronutrientsChart } from "../components/macronutrients-chart/macronutrients-chart";
import { RecentMeals } from "../components/recent-meals/recent-meals";
import { WeightStatusChart } from "../components/weight/weight-control";
import { profileAtom } from "@/store/auth";
import { AUTH_PATHS } from "@/routes/auth/auth.enum";
import { useTranslation } from "react-i18next";

const DashboardView = () => {
  const profile = useAtomValue(profileAtom);
  const { t, i18n } = useTranslation();
  const lang = i18n.language;
  const [showMessage, setShowMessage] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowMessage(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <div className="text-center">
        {profile
          ? ""
          : showMessage && (
              <>
                {`${t("dashboard-translation.fill-info")} `}
                <a
                  style={{ color: "blue", textDecoration: "Underline" }}
                  href={`/${lang}/${AUTH_PATHS.USER_PROFILE}`}
                >
                  {lang === "ka" ? "აქ" : "here"}
                </a>
                .
              </>
            )}
      </div>
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
