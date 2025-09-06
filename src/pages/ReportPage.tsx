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

const ReportPage = () => {
  const reportDate = "2025-09-01";
  const items = [
    { id: 1, name: "Čoko rolat", sold: 12, wasted: 1, wolt: 5 },
    { id: 2, name: "Vanilica", sold: 20, wasted: 3, wolt: 6 },
    { id: 3, name: "Krempita", sold: 15, wasted: 2, wolt: 4 },
    { id: 4, name: "Štrudla", sold: 10, wasted: 0, wolt: 3 },
    { id: 5, name: "Tiramisu", sold: 8, wasted: 1, wolt: 2 },
    { id: 6, name: "Voćna torta", sold: 5, wasted: 0, wolt: 1 },
    { id: 7, name: "Muffin", sold: 18, wasted: 2, wolt: 2 },
    { id: 8, name: "Cupcake", sold: 22, wasted: 1, wolt: 3 },
    { id: 9, name: "Brownie", sold: 14, wasted: 0, wolt: 4 },
    { id: 10, name: "Cheesecake", sold: 9, wasted: 1, wolt: 5 },
  ];

  const totalSold = items.reduce((sum, i) => sum + i.sold, 0);
  const totalWasted = items.reduce((sum, i) => sum + i.wasted, 0);

  return (
    <div className="max-w-4xl mx-auto px-6 space-y-8">
      <h1 className="text-2xl font-bold text-center">
        Report for {reportDate}
      </h1>
      <Card className="bg-muted">
        <div className="flex justify-between">
          {/* Text Report */}
          <div className="p-4 rounded-lg shadow space-y-2">
            {items.map((item) => (
              <div key={item.id} className="flex items-center ">
                <p className="font-semibold text-muted-foreground min-w-26">
                  {item.name}
                </p>
                <p>
                  : sold {item.sold}, wasted {item.wasted}
                </p>
              </div>
            ))}
          </div>
          {/* Summary */}
          <div className="p-4 rounded-lg shadow">
            <h2 className="font-bold text-lg mb-2">Summary</h2>
            <p>Total sold: {totalSold}</p>
            <p>Total wasted: {totalWasted}</p>
            <p>
              Waste %:{" "}
              {((totalWasted / (totalSold + totalWasted)) * 100).toFixed(1)}%
            </p>
          </div>
        </div>
      </Card>
      <Card className="bg-muted">
        {/* Chart */}
        <div className="p-4 rounded-lg shadow">
          <h2 className="font-bold text-lg mb-4">Performance Chart</h2>
          <ResponsiveContainer width="100%" height={500}>
            <BarChart
              data={items}
              layout="vertical"
              margin={{ top: 20, right: 30, left: 100, bottom: 20 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              {/* XAxis is numbers */}
              <XAxis type="number" />
              {/* YAxis is names */}
              <YAxis
                dataKey="name"
                type="category"
                width={100}
                tick={{ fill: "white" }}
              />
              <Tooltip />
              <Legend />
              <Bar dataKey="sold" fill="#22c55e" name="Sold" />
              <Bar dataKey="wasted" fill="#ef4444" name="Wasted" />
              <Bar dataKey="wolt" fill="#00b7ff" name="Wolt" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Card>
    </div>
  );
};

export default ReportPage;
