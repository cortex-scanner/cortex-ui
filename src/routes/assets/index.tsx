import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import type { Asset } from "@/types/asset.ts";
import { listAssets } from "@/api/assets.ts";
import { AssetTable } from "@/components/AssetTable.tsx";

export const Route = createFileRoute("/assets/")({
  component: RouteComponent,
});

function RouteComponent() {
  const query = useQuery({
    queryKey: ["assets"],
    queryFn: listAssets,
    initialData: [],
  });

  const navigate = useNavigate();

  const onAssetOpen = (a: Asset) => {
    navigate({ to: "/assets/$assetId", params: { assetId: a.id } });
  };

  return (
    <div className="w-full ">
      <AssetTable
        data={query.data}
        isLoading={query.isLoading}
        onAssetOpen={onAssetOpen}
      />
    </div>
  );
}
