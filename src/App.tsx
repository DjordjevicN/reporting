import { createBrowserRouter, RouterProvider, Outlet } from "react-router";
import { lazy, Suspense } from "react";
const ShiftSelector = lazy(() => import("./pages/ShiftSelector"));
const HomePage = lazy(() => import("./pages/HomePage"));
const ReportPage = lazy(() => import("./pages/ReportPage"));
const ReportsPage = lazy(() => import("./pages/ReportsPage"));
const DailyReportPage = lazy(() => import("./pages/DailyReportPage"));
import Navigation from "./components/Navigation";

import "./App.css";

const Layout = () => (
  <div>
    <Navigation />
    <main className="p-4">
      <Suspense fallback={<div>Loading...</div>}>
        <Outlet />
      </Suspense>
    </main>
  </div>
);

const App = () => {
  const router = createBrowserRouter([
    {
      element: <Layout />,
      children: [
        { path: "/", element: <HomePage /> },
        { path: "/report/:id", element: <ReportPage /> },
        { path: "/reports", element: <ReportsPage /> },
        { path: "/daily-report", element: <DailyReportPage /> },
      ],
    },
    { path: "/login", element: <ShiftSelector /> },
  ]);

  return (
    <Suspense fallback={<p className="text-center">Loading app...</p>}>
      <RouterProvider router={router} />
    </Suspense>
  );
};

export default App;
