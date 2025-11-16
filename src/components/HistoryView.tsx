import { DynamicIcon } from "lucide-react/dynamic";
import { Fragment } from "react";
import type { IconName } from "lucide-react/dynamic";
import {
  Item,
  ItemContent,
  ItemDescription,
  ItemHeader,
  ItemMedia,
  ItemTitle,
} from "@/components/ui/item.tsx";
import { formatTimestamp } from "@/lib/utils.ts";

export interface HistoryViewEntry {
  label: string;
  icon: IconName;
  timestamp: number;
  user?: string;
  details?: string;
}

export function HistoryView({ entries }: { entries: Array<HistoryViewEntry> }) {
  return (
    <div className="flex w-full flex-col gap-2">
      {entries.map((entry, index) => (
        <Fragment key={entry.timestamp}>
          <Item variant="outline" className="w-full">
            <ItemMedia variant="icon">
              <DynamicIcon name={entry.icon} />
            </ItemMedia>
            <ItemContent>
              <ItemHeader>
                <span className="text-sm text-gray-700">
                  {formatTimestamp(entry.timestamp)}
                </span>
              </ItemHeader>
              <ItemTitle className="w-full">
                <span>{entry.label}</span>
              </ItemTitle>
              {entry.user && <ItemDescription>by {entry.user}</ItemDescription>}
            </ItemContent>
          </Item>
          {index !== entries.length - 1 && (
            <div className="h-8 w-[2px] bg-gray-400 ml-8" />
          )}
        </Fragment>
      ))}
    </div>
  );
}
