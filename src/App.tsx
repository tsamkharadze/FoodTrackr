import { useEffect, useState } from "react";
import { ThemeProvider } from "./components/theme-provider";
import { AllRoutes } from "./routes/all-routes";
import { supabase } from "./supabase";
import { useAtom, useSetAtom } from "jotai";
import { profileAtom, userAtom } from "./store/auth";
import { useGetProfile } from "./react-query/query/profile/profile";
import { Spinner } from "./components/ui/spinner";

function App() {
  const [user, setUser] = useAtom(userAtom);
  const [isLoading, setIsloading] = useState(true);
  const setUserProfile = useSetAtom(profileAtom);

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

  const { data } = useGetProfile({
    userId: user?.user.id || "",
    queryOptions: {
      enabled: !!user?.user.id,
    },
  });

  useEffect(() => {
    if (data) {
      const updatedProfile = {
        ...data,
        sex:
          data.sex !== undefined && data.sex !== null ? String(data.sex) : null,
      };
      setUserProfile(updatedProfile);
    }
  }, [data, setUserProfile]);

  if (isLoading) {
    return <Spinner size={"large"} />;
  }
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <AllRoutes />
    </ThemeProvider>
  );
}

export default App;
