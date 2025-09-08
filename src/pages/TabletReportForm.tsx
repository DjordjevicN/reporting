import { useDispatch, useSelector } from "react-redux";
import CakeButton from "../components/CakeButton";
import type { RootState } from "../store";
import type { CakeReport } from "../types";
import { updateCake } from "../slices/reportSlice";

const TabletReportForm = () => {
  const dispatch = useDispatch();
  const report = useSelector((state: RootState) => state.report);

  const handleChange = (cake: CakeReport) => {
    dispatch(updateCake({ ...cake, outflow: cake.outflow + 1 }));
  };
  return (
    <div>
      <div className="grid grid-cols-5 gap-3">
        {report.items.map((cake) => {
          return (
            <CakeButton
              key={cake.id}
              cake={cake}
              handleChange={() => handleChange(cake)}
            />
          );
        })}
      </div>
    </div>
  );
};

export default TabletReportForm;
