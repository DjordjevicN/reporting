import { useSelector } from "react-redux";
import { Button } from "../components/ui/button";
import DailyReportItem from "./DailyReportItem";
import type { CakeReport } from "../types";
import type { RootState } from "../store";

const DailyReportPage = () => {
  const report = useSelector((state: RootState) => state.report);

  const handleSubmit = () => {
    console.log("Submitting report:", report);
  };

  return (
    <div className="px-4 pb-30">
      <div className="flex gap-4 items-center">
        <p className="text-3xl font-bold text-center my-10 ">
          Report: {report.date}
        </p>
        <Button onClick={handleSubmit}>Submit Report</Button>
      </div>
      {report.items.map((cake: CakeReport) => (
        <DailyReportItem key={cake.id} cake={cake} />
      ))}
    </div>
  );
};

export default DailyReportPage;
