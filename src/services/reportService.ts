import { supabase } from "../supabase";
import type { Report } from "../types";

export const fetchReportByDate = async (
  date: string
): Promise<Report | null> => {
  const { data, error } = await supabase
    .from("daily_reports")
    .select("*")
    .eq("date", date)
    .single();

  if (error && error.code !== "PGRST116") {
    console.error(error);
  }

  return data || null;
};

export const upsertReport = async (report: Report) => {
  const { data, error } = await supabase
    .from("daily_reports")
    .upsert(report, { onConflict: "date" });

  if (error) console.error(error);
  return data;
};
