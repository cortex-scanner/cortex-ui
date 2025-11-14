import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import type { ToolbarItem } from "@/components/Toolbar.tsx";
import { listScanConfigs } from "@/api/scans.ts";
import { Toolbar } from "@/components/Toolbar.tsx";
import { Separator } from "@/components/ui/separator.tsx";
import { ScanConfigTable } from "@/components/ScanConfigTable.tsx";

export const Route = createFileRoute("/_authenticated/scan-configs/")({
  component: RouteComponent,
});

function RouteComponent() {
  const query = useQuery({
    queryKey: ["scan-configs"],
    queryFn: listScanConfigs,
    initialData: [],
  });

  const toolbarActionsRight: Array<ToolbarItem> = [
    {
      label: "Reload",
      icon: "refresh-cw",
      onClick: () => {
        query.refetch();
      },
    },
  ];

  return (
    <div className="w-full flex flex-col gap-4">
      <span className="ml-2 text-2xl">Scan Configurations</span>
      <Separator />
      <Toolbar itemsEnd={toolbarActionsRight} />
      <ScanConfigTable data={query.data} isLoading={query.isLoading} />
    </div>
  );
}
