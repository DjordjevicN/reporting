import { DateInput } from "../components/DateInput";
import { Card, CardHeader, CardTitle } from "../components/ui/card";
import { Link } from "react-router";

const ReportsPage = () => {
  const reports = [
    { id: 1, date: "2025-09-01" },
    { id: 2, date: "2025-09-02" },
    { id: 3, date: "2025-09-03" },
  ];
  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="flex justify-between mb-6">
        <h1 className="text-3xl font-bold mb-6 text-center">Daily Reports</h1>
        <DateInput />
      </div>

      <div className="space-y-4 mb-8">
        {reports.map((report) => (
          <div key={report.id} className="mt-1">
            <Link to={`/report`}>
              {/* <Link to={`/report/${report.id}`} key={report.id}> */}
              <Card className="cursor-pointer hover:shadow-md">
                <CardHeader>
                  <CardTitle>Report: {report.date}</CardTitle>
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
