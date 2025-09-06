import { useNavigate } from "react-router";
import { Button } from "../components/ui/button";
import { Card } from "../components/ui/card";

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen px-8 flex flex-col items-center gap-6">
      <h1 className="text-2xl font-bold">Mama Goca Pastry Report</h1>
      <div className="flex flex-col gap-4 justify-center">
        <Card>
          <h2 className="text-xl font-semibold mb-2">Novi izveštaj</h2>
          <p>Forma za unos dnevnog stanja kolača</p>
          <Button className="mt-2" onClick={() => navigate("/daily-report")}>
            Go
          </Button>
        </Card>

        {/* <Card>
          <h2 className="text-xl font-semibold mb-2">Cake List</h2>
          <p>View, add, or remove cakes from the list.</p>
          <Button className="mt-2" onClick={() => navigate("/cake-list")}>
            Go
          </Button>
        </Card> */}

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
