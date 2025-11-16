import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  CheckCircle,
  CircleAlert,
  CircleQuestionMark,
  CircleX,
} from "lucide-react";
import { TooltipTrigger } from "@radix-ui/react-tooltip";
import type { ColumnDef } from "@tanstack/react-table";
import type { ScanConfig, ScanExecution } from "@/types/scan.ts";
import type { Asset } from "@/types/asset.ts";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table.tsx";
import { LoadingIndicator } from "@/components/LoadingIndicator.tsx";
import { Spinner } from "@/components/ui/spinner.tsx";
import { Tooltip, TooltipContent } from "@/components/ui/tooltip.tsx";
import { formatTimestamp } from "@/lib/utils.ts";

export function ScanTable({
  data,
  configurations,
  isLoading,
  onScanOpen,
}: {
  data: Array<ScanExecution>;
  configurations: Array<ScanConfig>;
  isLoading: boolean;
  onScanOpen?: (scan: ScanExecution) => void;
}) {
  const getStatusIcon = (status: string) => {
    let iconElem = null;
    let tooltipText = "";
    switch (status) {
      case "queued":
        iconElem = <Spinner />;
        tooltipText = "Queued for execution";
        break;
      case "running":
        iconElem = <Spinner />;
        tooltipText = "Running";
        break;
      case "complete":
        iconElem = <CheckCircle color="green" />;
        tooltipText = "Complete";
        break;
      case "failed":
        iconElem = <CircleAlert color="red" />;
        tooltipText = "Failed";
        break;
      case "cancelled":
        iconElem = <CircleX color="gray" />;
        tooltipText = "Cancelled";
        break;
      default:
        iconElem = <CircleQuestionMark color="gray" />;
        break;
    }

    return (
      <Tooltip>
        <TooltipTrigger asChild>{iconElem}</TooltipTrigger>
        <TooltipContent>
          <span>{tooltipText}</span>
        </TooltipContent>
      </Tooltip>
    );
  };

  const getAssetCount = (assets: Array<Asset>) => {
    return (
      <Tooltip>
        <TooltipTrigger>{assets.length}</TooltipTrigger>
        <TooltipContent>
          {assets.map((a) => (
            <span key={a.id}>{a.endpoint}</span>
          ))}
        </TooltipContent>
      </Tooltip>
    );
  };

  const capitalizeFirstLetter = (val: string | undefined) => {
    if (!val) return "";
    return String(val).charAt(0).toUpperCase() + String(val).slice(1);
  };

  const columns: Array<ColumnDef<ScanExecution>> = [
    {
      accessorKey: "status",
      header: "Status",
      cell: (c) => {
        return getStatusIcon(c.row.original.status);
      },
    },
    {
      header: "Type",
      cell: (c) => {
        return (
          capitalizeFirstLetter(
            configurations.find(
              (config) => config.id === c.row.original.scanConfigurationId
            )?.type
          ) || "Unknown"
        );
      },
    },
    {
      accessorKey: "scanConfigurationId",
      header: "Configuration",
      cell: (c) => {
        return (
          configurations.find((config) => config.id === c.getValue())?.name ||
          "Unknown"
        );
      },
    },
    {
      accessorKey: "assets",
      header: "Assets",
      cell: (c) => {
        return getAssetCount(c.row.original.assets);
      },
    },
    {
      accessorKey: "startTime",
      header: "Start",
      cell: (c) => {
        return formatTimestamp(c.row.original.startTime);
      },
    },
    {
      accessorKey: "endTime",
      header: "End",
      cell: (c) => {
        return formatTimestamp(c.row.original.endTime);
      },
    },
  ];

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    enableRowSelection: true,
  });

  const onRowDoubleClick = (s: ScanExecution) => {
    if (onScanOpen) onScanOpen(s);
  };

  return (
    <div className="overflow-hidden rounded-md border">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {isLoading ? (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                <LoadingIndicator text="Fetching scans..." />
              </TableCell>
            </TableRow>
          ) : table.getRowModel().rows.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                className="cursor-pointer select-none"
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
                onDoubleClick={() => onRowDoubleClick(row.original)}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No scans.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
