import { useQuery } from "@tanstack/react-query";
import { DateInput } from "../components/DateInput";
import { Card, CardHeader, CardTitle } from "../components/ui/card";
import { Link } from "react-router";
import { supabase } from "../supabase";

const ReportsPage = () => {
  const getReports = async () => {
    const res = await supabase.from("daily_reports").select("*");
    return res.data;
  };
  const { data } = useQuery({
    queryKey: ["reports"],
    queryFn: getReports,
  });

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="flex justify-between mb-6">
        <h1 className="text-3xl font-bold mb-6 text-center">Daily Reports</h1>
        <DateInput />
      </div>

      <div className="space-y-4 mb-8">
        {data?.map((report) => (
          <div key={report.id} className="mt-1">
            <Link to={`/report`}>
              {/* <Link to={`/report/${report.id}`} key={report.id}> */}
              <Card className="cursor-pointer hover:shadow-md">
                <CardHeader>
                  <CardTitle>Report: {report.report_date}</CardTitle>
                </CardHeader>
              </Card>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReportsPage;
