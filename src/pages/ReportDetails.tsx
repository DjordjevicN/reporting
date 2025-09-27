import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { Card } from "../components/ui/card";
import { useNavigate, useParams } from "react-router";
import type { CakeReport, IStoreLocation } from "../types";
import { Button } from "../components/ui/button";
import { useState } from "react";
import { FullScreenLoader } from "../components/FullScreenLoader";
import { useGetReport } from "../hooks/apiHooks/useGetReport";
import { useDispatch } from "react-redux";
import { startReport } from "../slices/reportSlice";

const ReportDetails = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();
  const [showCakesToMake, setShowCakesToMake] = useState(false);
  const [showChart, setShowChart] = useState(false);
  const [showDetails, setShowDetails] = useState(true);
  const storeLocation = localStorage.getItem("shift") as IStoreLocation;
  const { report, isLoading } = useGetReport(id || "");
  const reportDate = report?.report_date || "Unknown Date";
  const cakes = report?.cake_entries || [];
  const totalSold = cakes.reduce((sum, i) => sum + i.outflow, 0);
  const totalWasted = cakes.reduce((sum, i) => sum + i.expense, 0);

  const handleEditReport = (id: string | undefined) => {
    if (id) {
      const workingReport = {
        date: reportDate,
        storeLocation: storeLocation,
        items: cakes,
      };
      dispatch(startReport(workingReport));
      navigate(`/edit-report/${id}`);
    }
  };

  const cakesToMake = cakes
    .filter((cake) => cake.dayend < 10)
    .sort((a, b) => b.dayend - a.dayend);

  return (
    <div className="max-w-4xl mx-auto px-6">
      <FullScreenLoader loading={isLoading} />
      <div className="mb-6">
        <div className="md:flex gap-6 items-center ">
          <p className="md:text-2xl font-bold">Izvestaj za {reportDate}</p>
        </div>
        <div className="flex gap-6 ">
          <p>
            {totalSold}
            <span className="text-muted-foreground"> prodatih kolača</span>
          </p>
          <p>
            {totalWasted}
            <span className="text-muted-foreground"> otpisanih kolača</span>
          </p>
        </div>
      </div>
      <div className="flex flex-col md:flex-row gap-4">
        <Button onClick={() => setShowCakesToMake(!showCakesToMake)}>
          {showCakesToMake ? "Hide Cakes to Make" : "Show Cakes to Make"}
        </Button>
        <Button onClick={() => setShowDetails(!showDetails)}>
          {showDetails ? "Hide Details" : "Show Details"}
        </Button>
        <Button onClick={() => setShowChart(!showChart)}>
          {showChart ? "Hide Chart" : "Show Chart"}
        </Button>
        <Button
          className="w-full md:w-fit ml-auto"
          onClick={() => handleEditReport(id)}
        >
          Izmeni
        </Button>
      </div>
      <div className="my-4">
        {showCakesToMake &&
          cakesToMake.map((cake) => {
            return (
              <div key={cake.id} className="border-b border-gray-600 py-1">
                <p>
                  {cake.name} - {cake.dayend}
                </p>
              </div>
            );
          })}
      </div>

      {showDetails && (
        <div>
          <div className="rounded-lg shadow space-y-2">
            {cakes.map((cake: CakeReport) => {
              return (
                <div
                  key={cake.id}
                  className="border border-gray-600 p-2 px-6 rounded-md"
                >
                  <div className="flex sm:flex-row flex-col items-start sm:items-center justify-between sm:gap-4">
                    <p className="min-w-[150px] text-xl sm:text-normal font-bold mb-2">
                      {cake.name}
                    </p>
                    <div className="sm:flex-col flex-row flex gap-2">
                      <p className="text-muted-foreground">Start</p>
                      <p
                        className={`${
                          Number(cake.start) > 0
                            ? "text-white"
                            : "text-muted-foreground"
                        }`}
                      >
                        {cake.start}
                      </p>
                    </div>
                    <div className="sm:flex-col flex-row flex gap-2">
                      <p className="text-muted-foreground">Ulaz</p>
                      <p
                        className={`${
                          Number(cake.inflow) > 0
                            ? "text-white"
                            : "text-muted-foreground"
                        }`}
                      >
                        {cake.inflow}
                      </p>
                    </div>
                    <div className="sm:flex-col flex-row flex gap-2">
                      <p className="text-muted-foreground">Prodato</p>
                      <p
                        className={`${
                          Number(cake.outflow) > 0
                            ? "text-white"
                            : "text-muted-foreground"
                        }`}
                      >
                        {cake.outflow}
                      </p>
                    </div>
                    <div className="sm:flex-col flex-row flex gap-2">
                      <p className="text-muted-foreground">Otpis</p>
                      <p
                        className={`${
                          Number(cake.expense) > 0
                            ? "text-white"
                            : "text-muted-foreground"
                        }`}
                      >
                        {cake.expense}
                      </p>
                    </div>
                    <div className="sm:flex-col flex-row flex gap-2">
                      <p className="text-muted-foreground">Wolt</p>
                      <p
                        className={`${
                          Number(cake.wolt) > 0
                            ? "text-white"
                            : "text-muted-foreground"
                        }`}
                      >
                        {cake.wolt}
                      </p>
                    </div>

                    <div className="sm:flex-col flex-row flex gap-2">
                      <p className="text-muted-foreground">Kraj</p>
                      <p
                        className={` ${
                          Number(cake.dayend) > 0
                            ? "text-white"
                            : "text-muted-foreground"
                        }`}
                      >
                        {cake.dayend}
                      </p>
                    </div>
                  </div>

                  {cake.description && (
                    <p>
                      <span className="text-muted-foreground">Opis:</span>{" "}
                      {cake.description}
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}
      {showChart && (
        <Card className="bg-muted mt-4">
          <div className="p-4 rounded-lg shadow">
            <h2 className="font-bold text-lg mb-4">Performance Chart</h2>
            <ResponsiveContainer width="100%" height={cakes.length * 60}>
              <BarChart
                data={cakes}
                layout="vertical"
                margin={{ top: 20, right: 10, left: 10, bottom: 20 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" />
                <YAxis
                  dataKey="name"
                  type="category"
                  width={100}
                  tick={{ fill: "white" }}
                />
                <Tooltip />
                <Legend />
                <Bar dataKey="outflow" fill="#22c55e" name="Prodato" />
                <Bar dataKey="wolt" fill="#00b7ff" name="Wolt" />
                <Bar dataKey="expense" fill="#ef4444" name="Otpisano" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
      )}
    </div>
  );
};

export default ReportDetails;
