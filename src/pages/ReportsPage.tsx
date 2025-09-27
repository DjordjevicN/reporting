import { useQuery } from "@tanstack/react-query";
import { DateInput } from "../components/DateInput";
import { Card, CardHeader, CardTitle } from "../components/ui/card";
import { useNavigate } from "react-router";
import { supabase } from "../supabase";
import { useState } from "react";
import PermissionModal from "../components/PermissionModal";
import { isoToDisplay } from "../constants/dateFormats";
import type { IStoreLocation } from "../types";

const ReportsPage = () => {
  const navigate = useNavigate();
  const [searchDate, setSearchDate] = useState<string | null>(null);
  const storeLocation = localStorage.getItem("shift") as IStoreLocation;
  const getReports = async () => {
    if (!searchDate) {
      let query = supabase
        .from("daily_reports")
        .select("*")

        .order("report_date", { ascending: false });
      if (storeLocation !== "admin") {
        query = query.eq("store_location", storeLocation);
      }
      const res = await query;
      return res.data;
    } else {
      let query = supabase
        .from("daily_reports")
        .select("*")

        .eq("report_date", searchDate);
      if (storeLocation !== "admin") {
        query = query.eq("store_location", storeLocation);
      }
      const res = await query;
      return res.data;
    }
  };
  const { data, refetch } = useQuery({
    queryKey: ["reports", searchDate],
    queryFn: getReports,
  });
  const redirectToReport = (id: number) => {
    navigate(`/report/${id}`);
  };
  const handleDeleteReport = async (id: number) => {
    await supabase.from("daily_reports").delete().eq("id", id);
    refetch();
  };

  return (
    <div className="max-w-2xl mx-auto md:p-6">
      <div className="flex flex-col md:flex-row items-center md:justify-between mb-6">
        <h1 className="text-normal md:text-3xl font-bold mb-6 text-center">
          Dnevni Izvestaj
        </h1>
        <DateInput change={setSearchDate} />
      </div>

      <div className="space-y-4 mb-8">
        {data?.map((report) => (
          <div key={report.id} className="mt-1">
            <div onClick={() => redirectToReport(report.id)}>
              <Card
                className={`cursor-pointer hover:shadow-md ${
                  report.store_location === "vcr"
                    ? "border-blue-800"
                    : "border-pink-900"
                }`}
              >
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <CardTitle>
                      Report: {isoToDisplay(report.report_date)}
                      {report.store_location &&
                        ` - ${report.store_location.toUpperCase()}`}
                    </CardTitle>
                    <PermissionModal
                      label="Da li si siguran da zelis da obrises izvestaj?"
                      title="Obrisi izvestaj"
                      confirm={() => handleDeleteReport(report.id)}
                    >
                      <p className="buttonCustom !bg-red-400 !text-white">
                        Obrisi
                      </p>
                    </PermissionModal>
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
