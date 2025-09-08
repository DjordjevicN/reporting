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
import { useParams } from "react-router";
import { supabase } from "../supabase";
import type { CakeReport } from "../types";

const ReportDetails = () => {
  const { id } = useParams();
  console.log(id);
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

  return (
    <div className="max-w-4xl mx-auto px-6">
      <div className="mb-6">
        <p className="text-2xl font-bold text-center">
          Report for {reportDate}
        </p>
        <div className="flex gap-6 justify-center">
          <p>Sold: {totalSold}</p>
          <p>Wasted: {totalWasted}</p>
        </div>
      </div>
      <Card className="bg-muted">
        <div className="">
          <div className="p-4 rounded-lg shadow space-y-2">
            {cakes.map((cake: CakeReport) => {
              return (
                <div
                  key={cake.id}
                  className="border border-gray-600 p-2 px-6 rounded-md"
                >
                  <div className="flex items-center justify-between gap-4">
                    <p className="min-w-[100px]">{cake.name}</p>
                    <div>
                      <p className="text-muted-foreground">Start</p>
                      <p>{cake.start}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Prodato</p>
                      <p>{cake.outflow}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Otpis</p>
                      <p>{cake.expense}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Wolt</p>
                      <p>{cake.wolt}</p>
                    </div>

                    <div>
                      <p className="text-muted-foreground">Kraj</p>
                      <p>{cake.dayend}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </Card>
      <Card className="bg-muted">
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
    </div>
  );
};

export default ReportDetails;
