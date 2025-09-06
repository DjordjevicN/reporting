import { useNavigate } from "react-router";
import { Button } from "../components/ui/button";
import { Card } from "../components/ui/card";
import { useDispatch } from "react-redux";
import { startReport } from "../slices/reportSlice";
import { generateInitCakeList } from "../constants/cakeList";

const HomePage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const initCakeList = generateInitCakeList();
  return (
    <div className="min-h-screen px-8 flex flex-col items-center gap-6">
      <h1 className="text-2xl font-bold">Mama Goca Pastry Report</h1>
      <div className="flex flex-col gap-4 justify-center">
        <Card>
          <h2 className="text-xl font-semibold mb-2">Novi izveštaj</h2>
          <p>Forma za unos dnevnog stanja kolača</p>
          <Button
            className="mt-2"
            onClick={() => {
              dispatch(
                startReport({
                  date: new Date().toISOString().split("T")[0],
                  items: initCakeList,
                })
              );
              navigate("/daily-report");
            }}
          >
            Go
          </Button>
        </Card>

        <Card>
          <h2 className="text-xl font-semibold mb-2">Reports</h2>
          <p>Istorija izveštaja</p>
          <Button className="mt-2" onClick={() => navigate("/reports")}>
            Go
          </Button>
        </Card>
      </div>
    </div>
  );
};
export default HomePage;
