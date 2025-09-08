import { Input } from "../components/ui/input";
import { Card } from "../components/ui/card";
import { useDispatch } from "react-redux";
import type { CakeReport } from "../types";
import { updateCake } from "../slices/reportSlice";

interface DailyReportItemProps {
  cake: CakeReport;
}

const DailyReportForm: React.FC<DailyReportItemProps> = ({ cake }) => {
  const dispatch = useDispatch();

  const handleChange = (field: keyof CakeReport, value: number | string) => {
    dispatch(updateCake({ ...cake, [field]: value }));
  };
  const calculateDayEnd = (cake: CakeReport) => {
    return cake.start + cake.inflow - cake.outflow - cake.wolt - cake.expense;
  };
  return (
    <Card className="mt-4 bg-muted-foreground/10">
      <div>
        <p className="text-xl font-bold">{cake.name}</p>
      </div>

      <div className="flex justify-between items-center w-full gap-1">
        <div>
          <p>Start</p>
          <Input
            type="number"
            value={cake.start}
            onChange={(e) => handleChange("start", Number(e.target.value))}
          />
        </div>
        <div>
          <p>Ulaz</p>
          <Input
            type="number"
            value={cake.inflow}
            onChange={(e) => handleChange("inflow", Number(e.target.value))}
          />
        </div>
        <div>
          <p>Izlaz</p>
          <Input
            type="number"
            value={cake.outflow}
            onChange={(e) => handleChange("outflow", Number(e.target.value))}
          />
        </div>
        <div>
          <p>Wolt</p>
          <Input
            type="number"
            value={cake.wolt}
            onChange={(e) => handleChange("wolt", Number(e.target.value))}
          />
        </div>
        <div>
          <p>Rashod</p>
          <Input
            type="number"
            value={cake.expense}
            onChange={(e) => handleChange("expense", Number(e.target.value))}
          />
        </div>
        <div>
          <p>Kraj</p>
          <Input
            type="number"
            value={calculateDayEnd(cake) || cake.dayend}
            onChange={(e) => handleChange("dayend", Number(e.target.value))}
          />
        </div>
      </div>

      <div className="mt-2">
        <p>Opis</p>
        <Input
          type="text"
          placeholder="Dodatni opis..."
          value={cake.description}
          onChange={(e) => handleChange("description", e.target.value)}
        />
      </div>
    </Card>
  );
};

export default DailyReportForm;
