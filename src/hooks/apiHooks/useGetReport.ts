import { useQuery } from "@tanstack/react-query";
import { supabase } from "../../supabase";

const fetchReportDetails = async (id: string) => {
  if (!id) return null;

  const { data, error } = await supabase
    .from("daily_reports")
    .select("id, report_date, cake_entries(*)")
    .eq("id", id)
    .single();

  if (error) throw new Error(error.message);
  return data;
};

export const useGetReport = (id: string) => {
  const {
    data: report,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["reportDetails", id],
    queryFn: () => fetchReportDetails(id),
  });
  return { report, isLoading, error };
};
