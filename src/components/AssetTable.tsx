import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useEffect, useState } from "react";
import type { ColumnDef } from "@tanstack/react-table";
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
import { Checkbox } from "@/components/ui/checkbox.tsx";
import { DateField } from "@/components/DateField.tsx";

export function AssetTable({
  data,
  isLoading,
  onAssetOpen,
  onRowSelectionChange,
}: {
  data: Array<Asset>;
  isLoading: boolean;
  onAssetOpen?: (asset: Asset) => void;
  onRowSelectionChange?: (selectedAssets: Array<Asset>) => void;
}) {
  const columns: Array<ColumnDef<Asset>> = [
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "endpoint",
      header: "Endpoint",
    },
    {
      accessorKey: "stats.discoveredPortsCount",
      header: "Open Ports",
    },
    {
      accessorKey: "stats.lastDiscovery",
      header: "Last Discovery",
      cell: ({ row }) => (
        <DateField
          dateUnix={row.original.stats.lastDiscovery}
          defaultText="Never"
        />
      ),
    },
  ];

  const [rowSelection, setRowSelection] = useState({});

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onRowSelectionChange: setRowSelection,
    enableRowSelection: true,
    state: {
      rowSelection,
    },
  });

  useEffect(() => {
    if (onRowSelectionChange) {
      const selectedRows = table
        .getSelectedRowModel()
        .rows.map((row) => row.original);
      onRowSelectionChange(selectedRows);
    }
  }, [rowSelection, table, onRowSelectionChange]);

  const onRowDoubleClick = (a: Asset) => {
    if (onAssetOpen) onAssetOpen(a);
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
                <LoadingIndicator text="Fetching assets..." />
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
                No assets.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
