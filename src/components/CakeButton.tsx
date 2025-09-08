import { toast } from "sonner";
import type { CakeReport } from "../types";
import PermissionModal from "./PermissionModal";
import { cakeImages } from "../constants/cakeList";

const CakeButton = ({
  cake,
  handleChange,
}: {
  cake: CakeReport;
  handleChange: (cake: CakeReport) => void;
}) => {
  const confirm = () => {
    toast.success(cake.name);
    handleChange(cake);
  };
  return (
    <PermissionModal
      confirm={confirm}
      label={`${cake.name} + 1`}
      title="Dodaj kolac u izveštaj"
    >
      <div className="relative">
        <div className="h-[150px] bg-muted flex items-center justify-center p-2">
          {cakeImages[cake.name] ? (
            <img
              src={cakeImages[cake.name]}
              alt={cake.name}
              className="h-full object-cover "
            />
          ) : (
            <span className="text-sm">{cake.name}</span>
          )}
        </div>
        <div className="absolute z-10 top-1 right-1">
          <p>
            {cake.name} - {cake.outflow}
          </p>
        </div>
      </div>
    </PermissionModal>
  );
};

export default CakeButton;
