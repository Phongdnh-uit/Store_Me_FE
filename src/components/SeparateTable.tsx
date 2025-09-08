import { cn } from "@/lib/utils";
import Empty from "@/assets/no_data.svg";
import {
  flexRender,
  type Cell,
  type Header,
  type Table,
} from "@tanstack/react-table";
import type { ReactNode } from "react";

export interface SeparateTableProps<TData> {
  table: Table<TData>;
  columnWidths?: Record<string, string>;
  className?: string;
  renderHeader?: (header: Header<TData, unknown>) => ReactNode;
  renderCell?: (cell: Cell<TData, unknown>) => ReactNode;
  separated?: boolean;
  rowMinHeight?: string;
}

export function SeparateTable<TData>({
  table,
  columnWidths,
  className,
  renderHeader,
  renderCell,
  separated = true,
  rowMinHeight = "4rem",
}: SeparateTableProps<TData>) {
  const headerGroups = table.getHeaderGroups();
  const rows = table.getRowModel().rows;

  return (
    <div className={cn("w-full", className)}>
      <div className="overflow-auto w-full rounded-2xl">
        <div className="min-w-max space-y-2">
          {/* Header (sticky) */}
          {headerGroups.map((hg) => (
            <div
              key={hg.id}
              className="sticky rounded-2xl top-0 z-10 grid items-center bg-background/95 px-4 py-2 text-sm font-medium text-muted-foreground backdrop-blur supports-[backdrop-filter]:bg-background/60"
              style={{
                gridTemplateColumns: hg.headers
                  .map((header) => {
                    const colId = header.column.id;
                    return columnWidths?.[colId] ?? "1fr";
                  })
                  .join(" "),
                minHeight: rowMinHeight,
              }}
            >
              {hg.headers.map((header) => {
                if (header.isPlaceholder) return null;
                return (
                  <div key={header.id} className="flex items-center gap-2">
                    {renderHeader
                      ? renderHeader(header)
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                  </div>
                );
              })}
            </div>
          ))}

          {rows.length === 0 ? (
            <div className="rounded-xl border bg-card px-4 py-8 h-50 text-center text-zinc-600 font-medium text-lg">
              <div className="flex flex-col items-center justify-center space-y-2 select-none">
                <img
                  src={Empty}
                  alt="No results"
                  className="h-70 w-70 opacity-100"
                />
              </div>
              No results.
            </div>
          ) : (
            rows.map((row) => (
              <div
                key={row.id}
                className={cn(
                  "grid items-center rounded-xl border bg-card px-4 py-3 shadow-sm",
                  separated && "hover:bg-muted/30",
                )}
                style={{
                  gridTemplateColumns: row
                    .getVisibleCells()
                    .map((cell) => {
                      const colId = cell.column.id;
                      return columnWidths?.[colId] ?? "1fr";
                    })
                    .join(" "),
                  minHeight: rowMinHeight,
                }}
              >
                {row.getVisibleCells().map((cell) => (
                  <div key={cell.id} className="min-w-0">
                    {renderCell
                      ? renderCell(cell)
                      : flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext(),
                        )}
                  </div>
                ))}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
