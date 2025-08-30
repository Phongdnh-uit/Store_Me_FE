import {
  getCoreRowModel,
  useReactTable,
  type ColumnDef,
  type VisibilityState,
} from "@tanstack/react-table";
import { useState } from "react";

interface DataTableStateProps<TData> {
  columns: ColumnDef<TData>[];
  data: TData[];
  pageCount?: number;
}
export function useDataTable<TData>({
  columns,
  data,
  pageCount,
}: DataTableStateProps<TData>) {
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});
  const [density, setDensity] = useState<"compact" | "normal" | "flexible">(
    "normal",
  );

  const table = useReactTable({
    columns,
    data,
    manualPagination: true,
    manualFiltering: true,
    manualSorting: true,
    pageCount,
    state: {
      columnVisibility,
      rowSelection,
    },
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    getCoreRowModel: getCoreRowModel(),
  });
  return {
    table,
    columnVisibility,
    setColumnVisibility,
    rowSelection,
    setRowSelection,
    density,
    setDensity,
  };
}
