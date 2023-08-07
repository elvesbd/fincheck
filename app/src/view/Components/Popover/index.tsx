import * as RadixPopover from '@radix-ui/react-popover';
import { cn } from '../../../app/utils';


interface PopoverProps {
  children: React.ReactNode;
  className?: string;
  onSelect?: () => void;
}

function PopoverRoot({ children }: PopoverProps) {
  return (
    <RadixPopover.Root>
      {children}
    </RadixPopover.Root>
  );
}

function PopoverTrigger({ children }: PopoverProps) {
  return (
    <RadixPopover.Trigger asChild>
      {children}
    </RadixPopover.Trigger>
  );
}

function PopoverContent({ children, className }: PopoverProps) {
  return (
    <RadixPopover.Portal>
      <RadixPopover.Content
        className={cn(
          "flex items-center justify-center w-96 h-80 z-[99] rounded-2xl p-4 bg-white space-y-2 shadow-[0px_11px_20px_0px_rgba(0,0,0,0.10)]",
          "data-[side=bottom]:animate-slide-up-and-fade",
          "data-[side=top]:animate-slide-down-and-fade",
          className
        )}
      >
        {children}
      </RadixPopover.Content>
    </RadixPopover.Portal>
  )
}

export const Popover = {
  Root: PopoverRoot,
  Trigger: PopoverTrigger,
  Content: PopoverContent
}

