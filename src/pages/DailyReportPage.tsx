import { Button } from "../components/ui/button";
import DailyReportItem from "./DailyReportItem";

const DailyReportPage = () => {
  const listOfCakes = [
    { name: "Čoko rolat", id: 1, sold: 0, wasted: 0 },
    { name: "Vanilica", id: 2, sold: 0, wasted: 0 },
    { name: "Krempita", id: 3, sold: 0, wasted: 0 },
    { name: "Šampita", id: 4, sold: 0, wasted: 0 },
    { name: "Lenja pita", id: 5, sold: 0, wasted: 0 },
    { name: "Voćna pita", id: 6, sold: 0, wasted: 0 },
    { name: "Bajadera", id: 7, sold: 0, wasted: 0 },
    { name: "Kokos torta", id: 8, sold: 0, wasted: 0 },
    { name: "Ledene kocke", id: 9, sold: 0, wasted: 0 },
    { name: "Tiramisu", id: 10, sold: 0, wasted: 0 },
    { name: "Čupavci", id: 11, sold: 0, wasted: 0 },
    { name: "Krofne", id: 12, sold: 0, wasted: 0 },
    { name: "Mafini", id: 13, sold: 0, wasted: 0 },
  ];
  return (
    <div className="px-4">
      <p className="text-3xl font-bold text-center my-10 ">Report: 4.6.2025</p>
      {listOfCakes.map((cake) => (
        <DailyReportItem key={cake.id} name={cake.name} />
      ))}
      <div className="w-full">
        <Button className="m-4 w-full">Submit Report</Button>
      </div>
    </div>
  );
};

export default DailyReportPage;
