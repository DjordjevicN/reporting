import { useDispatch, useSelector } from "react-redux";
import CakeButton from "../components/CakeButton";
import type { RootState } from "../store";
import type { CakeReport } from "../types";
import { updateCake } from "../slices/reportSlice";
import { isoToDisplay } from "../constants/dateFormats";
import { Link } from "react-router";
// test

const TabletReportForm = () => {
  const dispatch = useDispatch();
  const report = useSelector((state: RootState) => state.report);

  const handleChange = (cake: CakeReport, amount: number) => {
    dispatch(
      updateCake({ ...cake, outflow: (Number(cake.outflow) || 0) + amount })
    );
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <p>{isoToDisplay(report.date)}</p>
        <Link className="buttonCustom" to="/daily-report">
          Detaljni pregled
        </Link>
      </div>
      <div className="grid grid-cols-5 gap-3">
        {report.items.map((cake) => {
          return (
            <CakeButton
              key={cake.id}
              cake={cake}
              handleChange={(cake, amount) => handleChange(cake, amount)}
            />
          );
        })}
      </div>
    </div>
  );
};

export default TabletReportForm;
