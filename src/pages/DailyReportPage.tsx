import { useDispatch, useSelector } from "react-redux";
import type { CakeReport } from "../types";
import type { RootState } from "../store";
import { useMutation, useQuery } from "@tanstack/react-query";
import { supabase } from "../supabase";
import { Link, useParams } from "react-router";
import DailyReportForm from "./DailyReportForm";
import { useState } from "react";
import { DateInput } from "../components/DateInput";
import PermissionModal from "../components/PermissionModal";
import { toast } from "sonner";
import { changeDate, startReport } from "../slices/reportSlice";
import { isoToDisplay } from "../constants/dateFormats";
import { Button } from "../components/ui/button";
import { MdKeyboardDoubleArrowUp } from "react-icons/md";

const DailyReportPage = () => {
  const { id } = useParams();

  const [reportDate, setReportDate] = useState<string | null>(null);
  const report = useSelector((state: RootState) => state.report);
  const dispatch = useDispatch();
  const selectedDate = reportDate || report.date;

  const { data: existingReport } = useQuery({
    enabled: !!id,
    queryKey: ["existingReport", id],
    queryFn: async () => {
      if (!id) return null;
      const { data, error } = await supabase
        .from("daily_reports")
        .select("id, report_date, cake_entries(*)")
        .eq("id", id)
        .single();

      if (error) {
        console.error("Error fetching existing report:", error);
        return null;
      }
      const { cake_entries, ...reportData } = data;
      const newReport = {
        ...reportData,
        items: cake_entries,
        date: data.report_date,
        id: data.id,
      };
      dispatch(
        startReport({
          date: newReport.date,
          items: newReport.items,
        })
      );
      return newReport;
    },
  });
  console.log(existingReport);

  const { mutate } = useMutation({
    mutationFn: async () => {
      // 1. Check if today's report exists
      const { data: existingReports } = await supabase
        .from("daily_reports")
        .select("id")
        .eq("report_date", report.date);

      if (existingReports && existingReports.length > 0) {
        const reportId = existingReports[0].id;

        // 2. Delete existing cakes
        await supabase.from("cake_entries").delete().eq("report_id", reportId);

        // 3. Delete existing report
        await supabase.from("daily_reports").delete().eq("id", reportId);
      }

      // 4. Insert new report
      const { data: newReport } = await supabase
        .from("daily_reports")
        .insert([{ report_date: report.date }])
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
        description: cake.description || "",
        report_id: newReport.id,
      }));

      await supabase.from("cake_entries").insert(cakesToInsert);

      return true;
    },
    onSuccess: () => {
      console.log("Report and cakes submitted successfully");
      toast.success("Report submitted successfully");
    },
    onError: (error) => {
      toast.error("Error submitting report");
      console.error("Error submitting report:", error);
    },
  });

  const handleSubmit = () => {
    mutate();
  };
  const handleDateChange = (date: string) => {
    setReportDate(date);
    dispatch(changeDate(date));
  };

  return (
    <div className="px-4 pb-30">
      <div className="flex justify-between items-center mb-4">
        <div className="flex gap-4 items-center">
          <p className="text-3xl font-bold text-center my-10 ">
            <span className="text-muted-foreground">Report:</span>{" "}
            {isoToDisplay(selectedDate)}
          </p>
          <DateInput change={handleDateChange} />
          <PermissionModal confirm={handleSubmit}>
            <p className="buttonCustom">Sacuvaj</p>
          </PermissionModal>
        </div>
        <div>
          <Link className="buttonCustom" to="/tablet-report">
            Prodaja
          </Link>
        </div>
      </div>
      {report?.items.map((cake: CakeReport) => (
        <DailyReportForm key={cake.id} cake={cake} />
      ))}
      <div className="fixed bottom-4 right-4">
        <Button className="cursor-pointer" onClick={() => scrollTo(0, 0)}>
          <MdKeyboardDoubleArrowUp />
        </Button>
      </div>
    </div>
  );
};

export default DailyReportPage;
