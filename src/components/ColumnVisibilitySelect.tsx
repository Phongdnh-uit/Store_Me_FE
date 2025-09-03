import { ChevronDown, Columns3, RefreshCcw } from "lucide-react";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuLabel,
} from "./ui/dropdown-menu";
import type { Table } from "@tanstack/react-table";
import { Checkbox } from "./ui/checkbox";
import { cn } from "@/lib/utils";

interface ColumnVisibilitySelectProps<TData> {
  table: Table<TData>;
  className?: string;
}

export function ColumnVisibilitySelect<TData>({
  table,
  className,
}: ColumnVisibilitySelectProps<TData>) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant={"outlinePrimary"}
          size={"lg"}
          className={cn("", className)}
        >
          <Columns3 /> Columns <ChevronDown className="ml-3" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Columns</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {table
          .getAllColumns()
          .filter((column) => column.getCanHide())
          .map((column) => (
            <DropdownMenuItem
              key={column.id}
              className="capitalize h-8 hover:!bg-purple-200/40 pr-4"
              onSelect={(e) => e.preventDefault()}
              onClick={() => column.toggleVisibility(!column.getIsVisible())}
            >
              <div className="flex items-center gap-3">
                <Checkbox
                  className="bg-white data-[state=checked]:bg-blue-500 data-[state=checked]:border-transparent"
                  checked={column.getIsVisible()}
                  onCheckedChange={(value) => column.toggleVisibility(!!value)}
                />
                <div>{column.id}</div>
              </div>
            </DropdownMenuItem>
          ))}
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={() => {
            table.resetColumnVisibility();
          }}
        >
          <RefreshCcw /> Reset
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
