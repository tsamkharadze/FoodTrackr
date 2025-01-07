import { ThemeProvider } from "./components/theme-provider";
import Test from "./pages/test";

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Test />
    </ThemeProvider>
  );
}

export default App;
