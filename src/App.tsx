import { useEffect, useState } from "react";
import { ModeToggle } from "./components/mode-toogle";
import { ThemeProvider } from "./components/theme-provider";
import { AllRoutes } from "./routes/all-routes";
import { supabase } from "./supabase";
import { useSetAtom } from "jotai";
import { userAtom } from "./store/auth";
import { ChangeLagunge } from "./components/lang-switcher";

function App() {
  const setUser = useSetAtom(userAtom);
  const [isLoading, setIsloading] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session);
      setIsloading(false);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session);
    });

    return () => subscription.unsubscribe();
  }, [setUser]);

  if (isLoading) {
    return <div>loading</div>;
  }
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <AllRoutes />
      <ModeToggle />
      <ChangeLagunge />
    </ThemeProvider>
  );
}

export default App;
