import { useSelector } from "react-redux";
import { Button } from "../components/ui/button";
import DailyReportItem from "./DailyReportItem";
import type { CakeReport } from "../types";
import type { RootState } from "../store";
import { useMutation } from "@tanstack/react-query";
import { supabase } from "../supabase";
import { useNavigate } from "react-router";

const DailyReportPage = () => {
  const report = useSelector((state: RootState) => state.report);
  const navigate = useNavigate();
  const { mutate } = useMutation({
    mutationFn: async () => {
      const today = report.date;

      // 1. Check if today's report exists
      const { data: existingReports } = await supabase
        .from("daily_reports")
        .select("id")
        .eq("report_date", today);

      if (existingReports && existingReports.length > 0) {
        const reportId = existingReports[0].id;

        // 2. Delete existing cakes
        await supabase.from("cake_entries").delete().eq("id", reportId);

        // 3. Delete existing report
        await supabase.from("daily_reports").delete().eq("id", reportId);
      }

      // 4. Insert new report
      const { data: newReport } = await supabase
        .from("daily_reports")
        .insert([{ report_date: today }])
        .select()
        .single();

      // 5. Insert cakes for the new report
      const cakesToInsert = report.items.map((cake: CakeReport) => ({
        name: cake.name || "Unnamed Cake",
        start: cake.start || 0,
        inflow: cake.inflow || 0,
        outflow: cake.outflow || 0,
        wolt: cake.wolt || 0,
        expense: cake.expense || 0,
        dayend: cake.dayend || 0,
        report_id: newReport.id,
      }));

      await supabase.from("cake_entries").insert(cakesToInsert);

      return true;
    },
    onSuccess: () => {
      console.log("Report and cakes submitted successfully");
      navigate("/reports");
    },
    onError: (error) => {
      console.error("Error submitting report:", error);
    },
  });

  const handleSubmit = () => {
    console.log("Submitting report:", report);
    mutate();
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
