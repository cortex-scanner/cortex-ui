import { createFileRoute, useParams } from "@tanstack/react-router";

export const Route = createFileRoute("/assets/$assetId")({
  component: RouteComponent,
});

function RouteComponent() {
  const { assetId } = useParams({ strict: false });

  return <div>Asset: {assetId}</div>;
}
