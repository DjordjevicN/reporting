import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import HomePage from "./pages/HomePage";
import ReportPage from "./pages/ReportPage";
import CakeListPage from "./pages/CakeListPage";
import ReportsPage from "./pages/ReportsPage";
import DailyReportPage from "./pages/DailyReportPage";
import { Login } from "./pages/Login";
import "./App.css";

const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <HomePage />,
    },
    {
      path: "/report",
      element: <ReportPage />,
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/cakes",
      element: <CakeListPage />,
    },
    {
      path: "/reports",
      element: <ReportsPage />,
    },
    {
      path: "/daily-report",
      element: <DailyReportPage />,
    },
  ]);
  return <RouterProvider router={router} />;
};

export default App;
