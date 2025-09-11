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
import { useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router";
import { supabase } from "../supabase";
import type { CakeReport } from "../types";
import { Button } from "../components/ui/button";
import { useState } from "react";

const ReportDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [showCakesToMake, setShowCakesToMake] = useState(false);
  const [showChart, setShowChart] = useState(false);
  const [showDetails, setShowDetails] = useState(true);

  const fetchReportDetails = async (id: string | undefined) => {
    if (!id) return null;

    const { data, error } = await supabase
      .from("daily_reports")
      .select("id, report_date, cake_entries(*)")
      .eq("id", id)
      .single();

    if (error) throw new Error(error.message);
    return data;
  };

  const { data: report } = useQuery({
    queryKey: ["reportDetails", id],
    queryFn: () => fetchReportDetails(id),
  });

  const reportDate = report?.report_date || "Unknown Date";
  const cakes = report?.cake_entries || [];
  const totalSold = cakes.reduce((sum, i) => sum + i.outflow, 0);
  const totalWasted = cakes.reduce((sum, i) => sum + i.expense, 0);

  const handleEditReport = (id: string | undefined) => {
    if (id) {
      navigate(`/edit-report/${id}`);
    }
  };
  console.log(report);

  const cakesToMake = cakes
    .filter((cake) => cake.dayend < 12)
    .sort((a, b) => b.dayend - a.dayend);

  return (
    <div className="max-w-4xl mx-auto px-6">
      <div className="mb-6">
        <div className="flex gap-6 items-center ">
          <p className="text-2xl font-bold text-center">
            Report for {reportDate}
          </p>
          <Button onClick={() => handleEditReport(id)}>Edit</Button>
        </div>
        <div className="flex gap-6 ">
          <p>
            {totalSold}{" "}
            <span className="text-muted-foreground">prodatih kolača</span>
          </p>
          <p>
            {totalWasted}{" "}
            <span className="text-muted-foreground">otpisanih kolača</span>
          </p>
        </div>
      </div>
      <div className="flex gap-4">
        <Button onClick={() => setShowCakesToMake(!showCakesToMake)}>
          {showCakesToMake ? "Hide Cakes to Make" : "Show Cakes to Make"}
        </Button>
        <Button onClick={() => setShowDetails(!showDetails)}>
          {showDetails ? "Hide Details" : "Show Details"}
        </Button>
        <Button onClick={() => setShowChart(!showChart)}>
          {showChart ? "Hide Chart" : "Show Chart"}
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
        // <Card className="bg-muted">
        <div>
          <div className="rounded-lg shadow space-y-2">
            {cakes.map((cake: CakeReport) => {
              return (
                <div
                  key={cake.id}
                  className="border border-gray-600 p-2 px-6 rounded-md"
                >
                  <div className="flex sm:flex-row flex-col items-start sm:items-center justify-between sm:gap-4">
                    <p className="min-w-[100px] text-xl sm:text-normal font-bold mb-2">
                      {cake.name}
                    </p>
                    <div className="sm:flex-col flex-row flex gap-2">
                      <p className="text-muted-foreground">Start</p>
                      <p
                        className={`${
                          cake.start > 0
                            ? "text-white"
                            : "text-muted-foreground"
                        }`}
                      >
                        {cake.start}
                      </p>
                    </div>
                    <div className="sm:flex-col flex-row flex gap-2">
                      <p className="text-muted-foreground">Prodato</p>
                      <p
                        className={`${
                          cake.outflow > 0
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
                          cake.expense > 0
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
                          cake.wolt > 0 ? "text-white" : "text-muted-foreground"
                        }`}
                      >
                        {cake.wolt}
                      </p>
                    </div>

                    <div className="sm:flex-col flex-row flex gap-2">
                      <p className="text-muted-foreground">Kraj</p>
                      <p
                        className={` ${
                          cake.dayend > 0
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
        // </Card>
      )}
      {showChart && (
        <Card className="bg-muted mt-4">
          <div className="p-4 rounded-lg shadow">
            <h2 className="font-bold text-lg mb-4">Performance Chart</h2>
            <ResponsiveContainer width="100%" height={cakes.length * 60}>
              <BarChart
                data={cakes}
                layout="vertical"
                margin={{ top: 20, right: 30, left: 100, bottom: 20 }}
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
