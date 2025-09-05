import { Card } from "../components/ui/card";
import { Input } from "../components/ui/input";

const DailyReportItem = ({ name }: { name: string }) => {
  return (
    <Card className="mt-4 bg-muted-foreground/10">
      <div>
        <p className="text-xl font-bold">{name}</p>
      </div>
      <div className="flex justify-between items-center w-full">
        <div>
          <p>Start</p>
          <Input
            type="number"
            className="border border-gray-300 rounded-md p-2"
            placeholder="0"
          />
        </div>
        <div>
          <p>Ulaz</p>
          <Input
            type="number"
            className="border border-gray-300 rounded-md p-2"
            placeholder="0"
          />
        </div>
        <div>
          <p>Izlaz</p>
          <Input
            type="number"
            className="border border-gray-300 rounded-md p-2"
            placeholder="0"
          />
        </div>
        <div>
          <p>Wolt</p>
          <Input
            type="number"
            className="border border-gray-300 rounded-md p-2"
            placeholder="0"
          />
        </div>
        <div>
          <p>Rashod</p>
          <Input
            type="number"
            className="border border-gray-300 rounded-md p-2"
            placeholder="0"
          />
        </div>
        <div>
          <p>Kraj</p>
          <Input
            type="number"
            className="border border-gray-300 rounded-md p-2"
            placeholder="0"
          />
        </div>
      </div>
      <div>
        <p>Opis</p>
        <Input type="text" className="border border-gray-300 rounded-md p-2" />
      </div>
    </Card>
  );
};

export default DailyReportItem;
