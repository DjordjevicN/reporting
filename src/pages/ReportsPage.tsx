import { useQuery } from "@tanstack/react-query";
import { DateInput } from "../components/DateInput";
import { Card, CardHeader, CardTitle } from "../components/ui/card";
import { useNavigate } from "react-router";
import { supabase } from "../supabase";
import { Button } from "../components/ui/button";
import { useState } from "react";

const ReportsPage = () => {
  const navigate = useNavigate();
  const [searchDate, setSearchDate] = useState<string | null>(null);

  const getReports = async () => {
    if (!searchDate) {
      const res = await supabase
        .from("daily_reports")
        .select("*")
        .order("report_date", { ascending: false });
      return res.data;
    } else {
      const res = await supabase
        .from("daily_reports")
        .select("*")
        .eq("report_date", searchDate);
      return res.data;
    }
  };
  const { data } = useQuery({
    queryKey: ["reports", searchDate],
    queryFn: getReports,
  });
  const redirectToReport = (id: number) => {
    navigate(`/report/${id}`);
  };
  const handleDeleteReport = async (id: number, e: React.MouseEvent) => {
    e.stopPropagation();
    await supabase.from("daily_reports").delete().eq("id", id);
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="flex justify-between mb-6">
        <h1 className="text-3xl font-bold mb-6 text-center">Daily Reports</h1>
        <DateInput change={setSearchDate} />
      </div>

      <div className="space-y-4 mb-8">
        {data?.map((report) => (
          <div key={report.id} className="mt-1">
            <div onClick={() => redirectToReport(report.id)}>
              <Card className="cursor-pointer hover:shadow-md">
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <CardTitle>Report: {report.report_date}</CardTitle>
                    <Button
                      variant="destructive"
                      onClick={(e) => handleDeleteReport(report.id, e)}
                    >
                      Delete
                    </Button>
                  </div>
                </CardHeader>
              </Card>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReportsPage;
