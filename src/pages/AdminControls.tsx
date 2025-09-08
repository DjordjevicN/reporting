import { useDispatch } from "react-redux";
import { Button } from "../components/ui/button";
import { clearReport } from "../slices/reportSlice";

const AdminControls = () => {
  const dispatch = useDispatch();
  return (
    <div>
      <Button onClick={() => dispatch(clearReport())} variant="outline">
        Clear redux
      </Button>
    </div>
  );
};

export default AdminControls;
