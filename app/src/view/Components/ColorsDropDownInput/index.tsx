import { ChevronDownIcon, CrossCircledIcon } from "@radix-ui/react-icons";
import { cn } from "../../../app/utils";
import { DropDownMenu } from "../DropDownMenu";
import { ColorIcon } from "../icons/ColorIcon";
import { COLORS } from "../../../app/config/constants";
import { useState } from "react";


type Color = {
  color: string;
  bg: string;
}


interface ColorsDropDownInputProps {
  error?: string;
  className?: string;
}

export function ColorsDropDownInput({ error, className }: ColorsDropDownInputProps) {
  const [selectedColor, setSelectedColor] = useState<null | Color>(null);

  function handleSelect(color: Color) {
    setSelectedColor(color);
  }

  return (
    <div>
      <DropDownMenu.Root>
        <DropDownMenu.Trigger>
          <button
            className={cn(
              "bg-white w-full rounded-lg border border-gray-500 px-3 h-[52px] text-gray-700 focus:border-gray-800 transition-all outline-none text-left relative",
              error && "!border-red-900",
              className
            )}
          >
            Cor

            <div className="absolute right-3 top-1/2 -translate-y-1/2">
              {!selectedColor && (
                <ChevronDownIcon
                  className="w-6 h-6 text-gray-800"
                />
              )}

              {selectedColor && (
                <ColorIcon color={selectedColor.color} bg={selectedColor.bg} />
              )}
            </div>
          </button>
        </DropDownMenu.Trigger>

        <DropDownMenu.Content
          className="grid grid-cols-5"
        >
          {COLORS.map(color => (
            <DropDownMenu.Item key={color.bg}
              onSelect={() => handleSelect(color)}
            >
                <ColorIcon color={color.color} bg={color.bg} />
            </DropDownMenu.Item>
          ))}
        </DropDownMenu.Content>
      </DropDownMenu.Root>

      {error && (
        <div className="flex gap-2 items-center mt-2 text-red-900">
          <CrossCircledIcon />
          <span className="text-xs">{error}</span>
        </div>
      )}
    </div>
  );
}
