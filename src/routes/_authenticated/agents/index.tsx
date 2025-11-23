import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import type { ToolbarItem } from "@/components/Toolbar.tsx";
import { Separator } from "@/components/ui/separator.tsx";
import { Toolbar } from "@/components/Toolbar.tsx";
import { listAgents } from "@/api/agents.ts";
import { AgentTable } from "@/components/AgentTable.tsx";

export const Route = createFileRoute("/_authenticated/agents/")({
  component: RouteComponent,
});

function RouteComponent() {
  const query = useQuery({
    queryKey: ["agents"],
    queryFn: listAgents,
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
      <AgentTable data={query.data} isLoading={query.isLoading} />
    </div>
  );
}
