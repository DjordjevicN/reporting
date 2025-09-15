import { useQuery } from "@tanstack/react-query";
import { supabase } from "../supabase";
import { cakeList } from "../constants/cakeList";
import { Card } from "../components/ui/card";
import {
  Bar,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  BarChart,
} from "recharts";
import { useMemo } from "react";

const AdminControls = () => {
  const getAllCakes = async () => {
    const { data } = await supabase.from("cake_entries").select("*");
    return data;
  };
  const { data } = useQuery({
    queryKey: ["allCakes"],
    queryFn: getAllCakes,
  });

  const combinedCakes = useMemo(() => {
    const cakes: { [key: string]: number } = {};
    cakeList.forEach((cake) => {
      cakes[cake] = 0;
    });
    data?.forEach((entry) => {
      if (cakes[entry.name] !== undefined) {
        cakes[entry.name] += entry.outflow;
      }
    });
    return cakes;
  }, [data]);

  const chartList = Object.keys(combinedCakes).map((key) => ({
    name: key,
    outflow: combinedCakes[key],
  }));
  return (
    <div>
      <Card className="bg-muted mt-4">
        <div className="p-4 rounded-lg shadow">
          <h2 className="font-bold text-lg mb-4">Performance Chart</h2>
          <ResponsiveContainer width="100%" height={chartList.length * 60}>
            <BarChart
              data={chartList}
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
              <Bar
                dataKey="outflow"
                fill="#22c55e"
                name="Broj Prodatih kolaca"
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Card>
    </div>
  );
};

export default AdminControls;
