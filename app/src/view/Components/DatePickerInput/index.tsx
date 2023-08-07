import { CrossCircledIcon } from "@radix-ui/react-icons";
import { cn } from "../../../app/utils";
import { useState } from "react";
import { formatDate } from "../../../app/utils/formatDate";

interface DatePickerInputProps {
  error?: string;
  className?: string;
}

export function DatePickerInput({ error, className }: DatePickerInputProps) {
  const [selectedDate, setSelectedDate] = useState(new Date())

  return (
    <div>
      <button
        type="button"
        className={cn(
          "bg-white w-full rounded-lg border border-gray-500 px-3 h-[52px] text-gray-700 focus:border-gray-800 transition-all outline-none text-left relative pt-4",
          error && "!border-red-900",
          className
        )}
      >
        <span
          className="absolute text-gray-700 text-xs left-[13px] top-2 pointer-events-none"
        >
          Data
        </span>
        <span>
          {formatDate(selectedDate)}
        </span>
      </button>

      {error && (
        <div className="flex gap-2 items-center mt-2 text-red-900">
          <CrossCircledIcon />
          <span className="text-xs">{error}</span>
        </div>
      )}
    </div>
  );
}
