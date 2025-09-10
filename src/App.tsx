import { createBrowserRouter, RouterProvider, Outlet } from "react-router";
import { lazy, Suspense } from "react";
const ShiftSelector = lazy(() => import("./pages/ShiftSelector"));
const HomePage = lazy(() => import("./pages/HomePage"));
const ReportsPage = lazy(() => import("./pages/ReportsPage"));
const ReportDetails = lazy(() => import("./pages/ReportDetails"));
const DailyReportPage = lazy(() => import("./pages/DailyReportPage"));
const TabletReportForm = lazy(() => import("./pages/TabletReportForm"));
const AdminControls = lazy(() => import("./pages/AdminControls"));
import Navigation from "./components/Navigation";
// staging

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
        { path: "/report/:id", element: <ReportDetails /> },
        { path: "/reports", element: <ReportsPage /> },
        { path: "/daily-report", element: <DailyReportPage /> },
        { path: "/tablet-report", element: <TabletReportForm /> },
        { path: "/admin-controls", element: <AdminControls /> },
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
