import { Outlet } from "react-router-dom";
import { Header } from "./default/header";

export default function DefaultLayout() {
  return (
    <div className="min-h-screen dark:bg-black bg-gray-100">
      <Header />
      <main className="py-10">
        <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
