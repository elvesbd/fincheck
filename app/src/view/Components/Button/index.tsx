import { ComponentProps } from "react";
import { cn } from "../../../app/utils";

interface ButtonProps extends ComponentProps<'button'> {
  isLoading?: boolean;
}

export function Button({ children, className, isLoading, disabled, ...props }: ButtonProps) {
  return (
    <button
      {...props}
      disabled={disabled ?? isLoading}
      className={cn("bg-teal-900 hover:bg-teal-800 disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed px-6 h-12 rounded-2xl font-medium text-white transition-all", className)}
    >
      {children}
    </button>
  )
}
