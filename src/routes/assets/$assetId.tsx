import { createFileRoute, useParams } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { getAsset, getAssetDiscoveries } from "@/api/assets.ts";
import { LoadingIndicator } from "@/components/LoadingIndicator.tsx";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table.tsx";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card.tsx";
import { Separator } from "@/components/ui/separator.tsx";
import { formatTimestamp } from "@/lib/utils.ts";

export const Route = createFileRoute("/assets/$assetId")({
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

  return (
    <div>
      {assetQuery.isLoading || discoveryQuery.isLoading ? (
        <LoadingIndicator text="Loading asset..." />
      ) : (
        <div>
          <span className="text-2xl ml-2">{assetQuery.data?.endpoint}</span>
          <Separator className="my-4" />
          <Card className="mb-4">
            <CardHeader>
              <CardTitle>Asset Details</CardTitle>
            </CardHeader>

            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Endpoint</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>{assetQuery.data?.id}</TableCell>
                    <TableCell>{assetQuery.data?.endpoint}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Port Discovery</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Port</TableHead>
                    <TableHead>Protocol</TableHead>
                    <TableHead>First Seen</TableHead>
                    <TableHead>Last Seen</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {discoveryQuery.data?.map((discovery) => (
                    <TableRow key={`${discovery.port}-${discovery.protocol}`}>
                      <TableCell>{discovery.port}</TableCell>
                      <TableCell>{discovery.protocol}</TableCell>
                      <TableCell>
                        {formatTimestamp(discovery.firstSeen)}
                      </TableCell>
                      <TableCell>
                        {formatTimestamp(discovery.lastSeen)}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
