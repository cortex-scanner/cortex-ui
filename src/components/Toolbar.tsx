import { DynamicIcon } from "lucide-react/dynamic";
import type { IconName } from "lucide-react/dynamic";
import { Button } from "@/components/ui/button.tsx";

export interface ToolbarItem {
  label: string;
  onClick: () => void;
  icon?: IconName;
}

export function Toolbar({
  itemsStart,
  itemsEnd,
}: {
  itemsStart?: Array<ToolbarItem>;
  itemsEnd?: Array<ToolbarItem>;
}) {
  return (
    <div className="flex items-center gap-2 justify-between">
      <div>
        {itemsStart?.map((item) => (
          <Button key={item.label} variant="ghost" onClick={item.onClick}>
            {item.icon && <DynamicIcon name={item.icon} />}
            {item.label}
          </Button>
        ))}
      </div>
      <div>
        {itemsEnd?.map((item) => (
          <Button key={item.label} variant="ghost" onClick={item.onClick}>
            {item.icon && <DynamicIcon name={item.icon} />}
            {item.label}
          </Button>
        ))}
      </div>
    </div>
  );
}
