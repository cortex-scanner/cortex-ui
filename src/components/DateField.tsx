import { dateDistance, formatTimestamp } from "@/lib/utils.ts";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip.tsx";

export function DateField({
  dateUnix,
  defaultText = "Unknown",
}: {
  dateUnix: number;
  defaultText?: string;
}) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <span>{dateUnix > 0 ? dateDistance(dateUnix) : defaultText}</span>
      </TooltipTrigger>
      <TooltipContent>
        <span>{dateUnix > 0 ? formatTimestamp(dateUnix) : defaultText}</span>
      </TooltipContent>
    </Tooltip>
  );
}
