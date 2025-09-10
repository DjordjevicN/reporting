import { toast } from "sonner";
import type { CakeReport } from "../types";

import { useState } from "react";
import ModalWithAmount from "./ModalWithAmount";
import { Input } from "./ui/input";
import { cakeImages } from "../constants/cakeList";

const CakeButton = ({
  cake,
  handleChange,
}: {
  cake: CakeReport;
  handleChange: (cake: CakeReport, amount: number) => void;
}) => {
  const [amount, setAmount] = useState<number | null>(null);
  const confirm = () => {
    toast.success(`${cake.name} + ${amount || 1}`);
    handleChange(cake, amount || 1);
    setAmount(null);
  };
  return (
    <ModalWithAmount
      confirm={confirm}
      title={`Dodaj ${cake.name} u izveštaj`}
      trigger={
        <div className="relative">
          <div className="h-[150px] bg-muted flex items-center justify-center p-2">
            {cakeImages[cake.name] ? (
              <img
                src={cakeImages[cake.name]}
                alt={cake.name}
                width={150}
                height={150}
                className="object-cover"
                loading="lazy"
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
      }
    >
      <Input
        type="number"
        value={amount !== null ? amount.toString() : ""}
        onChange={(e) => {
          const val = e.target.value;
          setAmount(val === "" ? null : Number(val));
        }}
      />
    </ModalWithAmount>
  );
};

export default CakeButton;
