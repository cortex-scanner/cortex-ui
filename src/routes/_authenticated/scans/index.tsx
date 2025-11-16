import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import type { ToolbarItem } from "@/components/Toolbar.tsx";
import { Separator } from "@/components/ui/separator.tsx";
import { listScanConfigs, listScanExecutions } from "@/api/scans.ts";
import { ScanTable } from "@/components/ScanTable.tsx";
import { Toolbar } from "@/components/Toolbar.tsx";

export const Route = createFileRoute("/_authenticated/scans/")({
  component: RouteComponent,
});

function RouteComponent() {
  const scansQuery = useQuery({
    queryKey: ["scans"],
    queryFn: listScanExecutions,
    initialData: [],
  });

  const scanConfigQuery = useQuery({
    queryKey: ["scan-configs"],
    queryFn: listScanConfigs,
    initialData: [],
  });

  const toolbarActionsRight: Array<ToolbarItem> = [
    {
      label: "Reload",
      icon: "refresh-cw",
      onClick: () => {
        scansQuery.refetch();
      },
    },
  ];

  return (
    <div className="w-full flex flex-col gap-4">
      <span className="ml-2 text-2xl">Scans</span>
      <Separator />
      <Toolbar itemsEnd={toolbarActionsRight} />
      <ScanTable
        data={scansQuery.data}
        isLoading={scansQuery.isLoading}
        configurations={scanConfigQuery.data}
      />
    </div>
  );
}
