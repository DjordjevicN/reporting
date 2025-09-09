import * as React from "react";
import { ChevronDownIcon } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../components/ui/popover";

import { Button } from "./ui/button";
import { Calendar } from "./ui/calendar";
import { toLocalISO } from "../constants/dateFormats";

export function DateInput({ change }: { change: (date: string) => void }) {
  const [open, setOpen] = React.useState(false);
  const [date, setDate] = React.useState<Date | undefined>(undefined);

  return (
    <div className="flex flex-col gap-3">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            id="date"
            className="w-48 justify-between font-normal"
          >
            {date ? date?.toLocaleDateString("en-GB") : "Select date"}
            <ChevronDownIcon />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto overflow-hidden p-0" align="start">
          <Calendar
            mode="single"
            selected={date}
            captionLayout="dropdown"
            onSelect={(selectedDate) => {
              if (!selectedDate) return;
              const localISO = toLocalISO(selectedDate);
              change(localISO);
              setDate(selectedDate);
              setOpen(false);
            }}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
