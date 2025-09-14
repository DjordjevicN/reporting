import { useDispatch, useSelector } from "react-redux";
import type { CakeReport } from "../types";
import type { RootState } from "../store";
import { useMutation } from "@tanstack/react-query";
import { supabase } from "../supabase";
import { Link } from "react-router";
import DailyReportForm from "./DailyReportForm";
import { useState } from "react";
import { DateInput } from "../components/DateInput";
import PermissionModal from "../components/PermissionModal";
import { toast } from "sonner";
import { changeDate } from "../slices/reportSlice";
import { isoToDisplay } from "../constants/dateFormats";
import { Button } from "../components/ui/button";
import { MdKeyboardDoubleArrowUp } from "react-icons/md";
import { FullScreenLoader } from "../components/FullScreenLoader";

const DailyReportPage = () => {
  const [reportDate, setReportDate] = useState<string | null>(null);
  const report = useSelector((state: RootState) => state.report);
  const dispatch = useDispatch();
  const selectedDate = reportDate || report.date;

  const { mutate, isPending } = useMutation({
    mutationFn: async () => {
      const { data: existingReports } = await supabase
        .from("daily_reports")
        .select("id")
        .eq("report_date", report.date);

      if (existingReports && existingReports.length > 0) {
        const reportId = existingReports[0].id;
        await supabase.from("cake_entries").delete().eq("report_id", reportId);
        await supabase.from("daily_reports").delete().eq("id", reportId);
      }

      const { data: newReport } = await supabase
        .from("daily_reports")
        .insert([{ report_date: report.date }])
        .select()
        .single();

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
      <FullScreenLoader loading={isPending} />
      <div className="flex justify-between items-center mb-4">
        <div className="flex flex-col md:flex-row gap-4 items-center">
          <p className="md:text-3xl font-bold text-center md:my-10 ">
            <span className="text-muted-foreground">Izvestaj:</span>{" "}
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
