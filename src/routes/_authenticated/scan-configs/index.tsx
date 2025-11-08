import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated/scan-configs/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div>
      <h1>Scan Configs</h1>
    </div>
  );
}
