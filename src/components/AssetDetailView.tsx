import type {
  Asset,
  AssetFinding,
  AssetPortFindingData,
} from "@/types/asset.ts";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card.tsx";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table.tsx";
import { DateField } from "@/components/DateField.tsx";

export function AssetDetailView({
  asset,
  discoveryResults,
}: {
  asset: Asset;
  discoveryResults: Array<AssetFinding<AssetPortFindingData>>;
}) {
  return (
    <div>
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
                <TableCell>{asset.id}</TableCell>
                <TableCell>{asset.endpoint}</TableCell>
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
              {discoveryResults.map((discovery) => (
                <TableRow
                  key={`${discovery.data.port}-${discovery.data.protocol}`}
                >
                  <TableCell>{discovery.data.port}</TableCell>
                  <TableCell>{discovery.data.protocol}</TableCell>
                  <TableCell>
                    <DateField dateUnix={discovery.firstSeen} />
                  </TableCell>
                  <TableCell>
                    <DateField dateUnix={discovery.lastSeen} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
