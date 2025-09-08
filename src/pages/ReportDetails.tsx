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
    <div className="max-w-4xl mx-auto px-6 space-y-8">
      <h1 className="text-2xl font-bold text-center">
        Report for {reportDate}
      </h1>
      <Card className="bg-muted">
        <div className="flex justify-between">
          <div className="p-4 rounded-lg shadow space-y-2">
            {cakes.map((cake) => {
              return (
                <div key={cake.id} className="flex items-center ">
                  <p className="font-semibold text-muted-foreground min-w-26">
                    {cake.name}
                  </p>
                  <p>
                    : Prodato {cake.outflow}, Otpis {cake.expense}
                  </p>
                </div>
              );
            })}
          </div>

          <div className="p-4 rounded-lg shadow">
            <h2 className="font-bold text-lg mb-2">Ukupno</h2>
            <p>Prodato: {totalSold}</p>
            <p>Otpisano: {totalWasted}</p>
            <p>
              Waste:{" "}
              {((totalWasted / (totalSold + totalWasted)) * 100).toFixed(1)}%
            </p>
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
