import { createBrowserRouter, RouterProvider, Outlet } from "react-router";
import HomePage from "./pages/HomePage";
import ReportPage from "./pages/ReportPage";
import CakeListPage from "./pages/CakeListPage";
import ReportsPage from "./pages/ReportsPage";
import DailyReportPage from "./pages/DailyReportPage";
import { Login } from "./pages/Login";
import Navigation from "./components/Navigation";

import "./App.css";

const Layout = () => (
  <div>
    <Navigation />
    <main className="p-4">
      <Outlet />
    </main>
  </div>
);

const App = () => {
  const router = createBrowserRouter([
    {
      element: <Layout />,
      children: [
        { path: "/", element: <HomePage /> },
        { path: "/report", element: <ReportPage /> },
        { path: "/cakes", element: <CakeListPage /> },
        { path: "/reports", element: <ReportsPage /> },
        { path: "/daily-report", element: <DailyReportPage /> },
      ],
    },
    { path: "/login", element: <Login /> },
  ]);

  return <RouterProvider router={router} />;
};

export default App;
