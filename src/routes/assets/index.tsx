import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useRef } from "react";
import type { Asset } from "@/types/asset.ts";
import type { ToolbarItem } from "@/components/Toolbar.tsx";
import type {
  AssetDialogRef,
  AssetDialogResult,
} from "@/components/AssetDialog.tsx";
import AssetDialog from "@/components/AssetDialog.tsx";
import { createAsset, deleteAsset, listAssets } from "@/api/assets.ts";
import { AssetTable } from "@/components/AssetTable.tsx";
import { Separator } from "@/components/ui/separator.tsx";
import { Toolbar } from "@/components/Toolbar.tsx";

export const Route = createFileRoute("/assets/")({
  component: RouteComponent,
});

function RouteComponent() {
  const assetDialogRef = useRef<AssetDialogRef>(null);

  const query = useQuery({
    queryKey: ["assets"],
    queryFn: listAssets,
    initialData: [],
  });

  const createMutation = useMutation({
    mutationFn: (endpoint: string) => {
      return createAsset(endpoint);
    },
    onSuccess: () => {
      query.refetch();
      assetDialogRef.current?.closeDialog();
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (assetId: string) => {
      return deleteAsset(assetId);
    },
    onSuccess: () => {
      query.refetch();
    },
  });

  const toolbarActionsLeft: Array<ToolbarItem> = [
    {
      label: "Add",
      icon: "plus",
      onClick: () => {
        assetDialogRef.current?.openDialog();
      },
    },
    {
      label: "Delete",
      icon: "trash",
      onClick: () => {
        if (selectedAssets.length > 0) {
          for (const asset of selectedAssets) {
            deleteMutation.mutate(asset.id);
          }
          // FIXME: selection of tables needs to be updated to accommodate the deleted rows
        }
      },
    },
  ];

  const toolbarActionsRight: Array<ToolbarItem> = [
    {
      label: "Reload",
      icon: "refresh-cw",
      onClick: () => {
        query.refetch();
      },
    },
  ];

  const navigate = useNavigate();

  const onAssetOpen = (a: Asset) => {
    navigate({ to: "/assets/$assetId", params: { assetId: a.id } });
  };

  let selectedAssets: Array<Asset> = [];
  const onAssetsSelected = (assets: Array<Asset>) => {
    selectedAssets = assets;
  };

  const onAssetDialogSubmit = (asset: AssetDialogResult) => {
    createMutation.mutate(asset.endpoint);
  };

  return (
    <div className="w-full flex flex-col gap-4">
      <span className="ml-2 text-2xl">Assets</span>
      <Separator />
      <Toolbar itemsStart={toolbarActionsLeft} itemsEnd={toolbarActionsRight} />
      <AssetTable
        data={query.data}
        isLoading={query.isLoading}
        onAssetOpen={onAssetOpen}
        onRowSelectionChange={onAssetsSelected}
      />
      <AssetDialog
        ref={assetDialogRef}
        onConfirm={onAssetDialogSubmit}
        isLoading={createMutation.isPending}
      />
    </div>
  );
}
