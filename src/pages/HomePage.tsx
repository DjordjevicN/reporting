import { useNavigate } from "react-router";
import { Button } from "../components/ui/button";
import { Card } from "../components/ui/card";
import { useDispatch, useSelector } from "react-redux";
import { startReport } from "../slices/reportSlice";
import { generateInitCakeList } from "../constants/cakeList";
import type { RootState } from "../store";
import { today } from "../constants/dateFormats";

const HomePage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isAdmin = localStorage.getItem("shift") === "admin";
  const initCakeList = generateInitCakeList();
  const report = useSelector((state: RootState) => state.report);
  const isThisTodaysReport = report?.date === today;

  const handleStartReport = () => {
    dispatch(
      startReport({
        date: today,
        items: initCakeList,
      })
    );
    navigate("/daily-report");
  };
  const openTodaysReport = () => {
    navigate("/daily-report");
  };
  return (
    <div className="min-h-screen px-8 flex flex-col items-center gap-6">
      <h1 className="text-2xl font-bold">Mama Goca Pastry Report</h1>
      <div className="flex flex-col gap-4 justify-center">
        {isAdmin && (
          <Card className="">
            <h2 className="text-xl font-semibold mb-2">Reports</h2>
            <p>Istorija izveštaja</p>
            <Button className="mt-2" onClick={() => navigate("/reports")}>
              Go
            </Button>
          </Card>
        )}

        <Card
          className="min-w-[400px] cursor-pointer"
          onClick={() => openTodaysReport()}
        >
          <h2 className="text-xl font-semibold mb-2">Danasnji izveštaj</h2>
          <p>Edituj danasnji izvestaj</p>
          <Button className="mt-2">Go</Button>
        </Card>

        {!isThisTodaysReport && (
          <Card onClick={() => handleStartReport()} className="cursor-pointer">
            <h2 className="text-xl font-semibold mb-2">Novi izveštaj</h2>
            <p>Forma za unos dnevnog stanja kolača</p>
            <Button className="mt-2">Go</Button>
          </Card>
        )}

        {isAdmin && (
          <Card className="bg-red-400" onClick={() => handleStartReport()}>
            <h2 className="text-xl font-semibold mb-2">
              Obrisi danasnji izvestaj i pokreni novi
            </h2>
            <p>Forma za unos dnevnog stanja kolača</p>
            <Button className="mt-2">Go</Button>
          </Card>
        )}
      </div>
    </div>
  );
};
export default HomePage;
