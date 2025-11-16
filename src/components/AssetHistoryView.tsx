import type { AssetHistoryEntry } from "@/types/asset.ts";
import type { IconName } from "lucide-react/dynamic";
import type { HistoryViewEntry } from "@/components/HistoryView.tsx";
import { HistoryView } from "@/components/HistoryView.tsx";

export function AssetHistoryView({
  history,
}: {
  history: Array<AssetHistoryEntry>;
}) {
  const getIcon = (entry: AssetHistoryEntry): IconName => {
    switch (entry.eventType) {
      case "created":
        return "plus";
      case "updated":
        return "pencil";
      case "scan_finished":
        return "search";
      default:
        return "chevron-right";
    }
  };

  const getHistoryEntry = (entry: AssetHistoryEntry): HistoryViewEntry => {
    let label = "";
    switch (entry.eventType) {
      case "created":
        label = "Asset created";
        break;
      case "updated":
        label = "Asset updated";
        break;
      case "scan_finished":
        label = "Scan Finished";
        break;
    }

    return {
      label: label,
      icon: getIcon(entry),
      timestamp: entry.timestamp,
      user: entry.userId,
    };
  };

  return <HistoryView entries={history.map(getHistoryEntry)} />;
}
