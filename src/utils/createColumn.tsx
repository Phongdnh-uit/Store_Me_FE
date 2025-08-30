import { Checkbox } from "@/components/ui/checkbox";
import type { AccessorColumnDef, ColumnDef } from "@tanstack/react-table";
import { z } from "zod";

type ColumnOptions<TData, TValue> = Partial<
  AccessorColumnDef<TData, TValue>
> & {
  key: keyof TData;
};

type ColumnOverride<TData> = Partial<
  Omit<AccessorColumnDef<TData, unknown>, "id" | "accessorKey" | "accessorFn">
> & {
  key: keyof TData;
};

export function createColumn<TData, TValue = unknown>(
  opts: ColumnOptions<TData, TValue>,
): AccessorColumnDef<TData, TValue> {
  const key = opts.key as string;
  return {
    id: key,
    accessorKey: key,
    header: opts.header ?? key.toUpperCase(),
    cell: opts.cell ?? ((info) => String(info.getValue() ?? "")),
    ...opts,
  };
}

export function createColumnsFromSchema<T extends z.ZodRawShape>(
  schema: z.ZodObject<T>,
  overrides: ColumnOverride<z.infer<z.ZodObject<T>>>[] = [],
): ColumnDef<z.infer<z.ZodObject<T>>>[] {
  type TRow = z.infer<z.ZodObject<T>>;
  const shapeKeys = Object.keys(schema.shape) as (keyof TRow)[];
  const base: AccessorColumnDef<TRow, unknown>[] = shapeKeys.map((key) =>
    createColumn<TRow>({ key }),
  );
  const merged: AccessorColumnDef<TRow, unknown>[] = base.map((col) => {
    const o = overrides.find((o) => o.key === col.id);
    return o ? ({ ...col, ...o } as AccessorColumnDef<TRow, unknown>) : col;
  });
  return merged;
}

export function createSelectionColumn<TData>(): ColumnDef<TData> {
  return {
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
        className="bg-white data-[state=checked]:bg-blue-500 data-[state=checked]:border-transparent"
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  };
}
