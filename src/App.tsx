import { useEffect, useState } from "react";
import { ThemeProvider } from "./components/theme-provider";
import { AllRoutes } from "./routes/all-routes";
import { supabase } from "./supabase";
import { useAtom } from "jotai";
import { profileAtom, userAtom } from "./store/auth";
import { getProfileInfo } from "./supabase/account";

function App() {
  const [user, setUser] = useAtom(userAtom);
  const [isLoading, setIsloading] = useState(true);
  const [profile, setUserProfile] = useAtom(profileAtom);

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

  useEffect(() => {
    if (user)
      getProfileInfo(user.user.id).then((res) =>
        setUserProfile(res.data[0] || "")
      );
  }, [user, setUserProfile]);
  console.log(profile);

  if (isLoading) {
    return <div>loading</div>;
  }
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <AllRoutes />
    </ThemeProvider>
  );
}

export default App;
