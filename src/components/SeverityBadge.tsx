import { VulnerabilitySeverity } from "@/types/asset.ts";
import { Badge } from "@/components/ui/badge.tsx";

export function SeverityBadge({
  severity,
}: {
  severity: VulnerabilitySeverity;
}) {
  let color = "bg-blue-500";
  switch (severity) {
    case VulnerabilitySeverity.Critical:
      color = "bg-pink-900";
      break;
    case VulnerabilitySeverity.High:
      color = "bg-red-500";
      break;
    case VulnerabilitySeverity.Medium:
      color = "bg-orange-600";
      break;
    case VulnerabilitySeverity.Low:
      color = "bg-yellow-400";
      break;
  }

  return (
    <Badge className={`${color} text-xs tracking-tight`}>
      {severity.toString()}
    </Badge>
  );
}
