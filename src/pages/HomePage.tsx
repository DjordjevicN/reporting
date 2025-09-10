import { useNavigate } from "react-router";
import { Button } from "../components/ui/button";
import { Card } from "../components/ui/card";
import { useDispatch } from "react-redux";
import { startReport } from "../slices/reportSlice";
import { generateInitCakeList } from "../constants/cakeList";
import { today } from "../constants/dateFormats";
import PermissionModal from "../components/PermissionModal";

const HomePage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const initCakeList = generateInitCakeList();
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
  const openTabletReport = () => {
    navigate("/tablet-report");
  };
  return (
    <div className="min-h-screen px-8 flex flex-col items-center gap-6">
      <h1 className="text-2xl font-bold">Mama Goca Pastry Report</h1>
      <div className="flex flex-col gap-4 justify-center">
        <Card
          onClick={() => navigate("/reports")}
          className="min-w-[400px] cursor-pointer"
        >
          <h2 className="text-xl font-semibold mb-2">Reports</h2>
          <p>Istorija izveštaja</p>
          <Button className="mt-2">Go</Button>
        </Card>

        <Card
          className="min-w-[400px] cursor-pointer"
          onClick={() => openTodaysReport()}
        >
          <h2 className="text-xl font-semibold mb-2">
            Detaljni pregled danasnjeg izvestaja
          </h2>
          <p>Edituj danasnji izvestaj</p>
          <Button className="mt-2">Go</Button>
        </Card>
        <Card
          className="min-w-[400px] cursor-pointer"
          onClick={() => openTabletReport()}
        >
          <h2 className="text-xl font-semibold mb-2">Prodaja</h2>
          <p>Samo klikci kada prodas nesto</p>
          <p className="bg-white text-black px-3 py-1 rounded text-sm font-medium text-center">
            Go
          </p>
        </Card>

        <PermissionModal confirm={() => handleStartReport()}>
          <Card className="cursor-pointer">
            <h2 className="text-xl font-semibold mb-2 text-center">
              Novi izveštaj
            </h2>
            <p>Forma za unos dnevnog stanja kolača</p>
            <p className="bg-white text-black px-3 py-1 rounded text-sm font-medium">
              Go
            </p>
          </Card>
        </PermissionModal>
      </div>
    </div>
  );
};
export default HomePage;
