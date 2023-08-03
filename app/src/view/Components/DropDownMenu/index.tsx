import * as RdxDropDownMenu from '@radix-ui/react-dropdown-menu';


function DropDownMenuRoot({ children }: { children: React.ReactNode }) {
  return (
    <RdxDropDownMenu.Root>
      {children}
    </RdxDropDownMenu.Root>
  )
}

function DropDownMenuTrigger({ children }: { children: React.ReactNode }) {
  return (
    <RdxDropDownMenu.Trigger className="outline-none">
      {children}
    </RdxDropDownMenu.Trigger>
  )
}

function DropDownMenuContent({ children }: { children: React.ReactNode }) {
  return (
    <RdxDropDownMenu.Portal>
      <RdxDropDownMenu.Content
        className="rounded-2xl p-2 bg-white space-y-2 shadow-[0px_11px_20px_0px_rgba(0,0,0,0.10)]"
      >
        {children}
      </RdxDropDownMenu.Content>
    </RdxDropDownMenu.Portal>
  )
}

function DropDownMenuItem({ children }: { children: React.ReactNode }) {
  return (
    <RdxDropDownMenu.Item
      className="min-h-[48px] outline-none flex items-center p-4 text-sm text-gray-800 hover:bg-gray-50 rounded-2xl transition-colors"
    >
      {children}
    </RdxDropDownMenu.Item>
  )
}

export const DropDownMenu = {
  Root: DropDownMenuRoot,
  Trigger: DropDownMenuTrigger,
  Content: DropDownMenuContent,
  Item: DropDownMenuItem
}
