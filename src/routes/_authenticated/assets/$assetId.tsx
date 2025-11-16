import { createFileRoute, useParams } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import {
  getAsset,
  getAssetDiscoveries,
  getAssetHistory,
} from "@/api/assets.ts";
import { LoadingIndicator } from "@/components/LoadingIndicator.tsx";
import { AssetDetailView } from "@/components/AssetDetailView.tsx";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs.tsx";
import { Separator } from "@/components/ui/separator.tsx";
import { AssetHistoryView } from "@/components/AssetHistoryView.tsx";

export const Route = createFileRoute("/_authenticated/assets/$assetId")({
  component: RouteComponent,
});

function RouteComponent() {
  const { assetId } = useParams({ strict: false });

  const assetQuery = useQuery({
    queryKey: ["asset", assetId],
    queryFn: ({ queryKey }) => getAsset(queryKey[1] as string),
  });
  const discoveryQuery = useQuery({
    queryKey: ["asset", assetId, "discovery"],
    queryFn: ({ queryKey }) => getAssetDiscoveries(queryKey[1] as string),
  });
  const historyQuery = useQuery({
    queryKey: ["asset", assetId, "history"],
    queryFn: ({ queryKey }) => getAssetHistory(queryKey[1] as string),
  });

  return (
    <div>
      {assetQuery.isLoading ||
      discoveryQuery.isLoading ||
      historyQuery.isLoading ? (
        <LoadingIndicator text="Loading asset..." />
      ) : (
        <div>
          <span className="text-2xl ml-2">{assetQuery.data?.endpoint}</span>
          <Separator className="my-4" />
          <Tabs defaultValue="details">
            <TabsList>
              <TabsTrigger value="details">Details</TabsTrigger>
              <TabsTrigger value="history">History</TabsTrigger>
            </TabsList>
            <TabsContent value="details">
              <AssetDetailView
                asset={assetQuery.data!}
                discoveryResults={discoveryQuery.data!}
              />
            </TabsContent>
            <TabsContent value="history">
              <AssetHistoryView history={historyQuery.data!} />
            </TabsContent>
          </Tabs>
        </div>
      )}
    </div>
  );
}
