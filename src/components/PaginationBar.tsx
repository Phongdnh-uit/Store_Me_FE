import { cn } from "@/lib/utils";
import PaginationTabs from "./PaginationTabs";
import { Card, CardContent } from "./ui/card";
import { Label } from "./ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

interface PaginationBarProps {
  className?: string;
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  size: number;
  onSizeChange: (size: number) => void;
  totalElements: number;
  numberOfElements: number;
}

export const PaginationBar = ({
  className,
  totalPages,
  currentPage,
  onPageChange,
  size,
  onSizeChange,
  totalElements,
  numberOfElements,
}: PaginationBarProps) => {
  return (
    <Card className={cn("py-0 rounded-3xl", className)}>
      <CardContent className="w-full h-16 flex items-center justify-between">
        <div className="w-full">
          <Label>
            Showing {(currentPage - 1) * size + 1} -{" "}
            {(currentPage - 1) * size + 1 + numberOfElements} of {totalElements}
          </Label>
        </div>
        <PaginationTabs
          totalPages={totalPages}
          currentPage={currentPage}
          onPageChange={onPageChange}
        />
        <div className="flex items-center w-full justify-end gap-2">
          <Label>Rows per page</Label>
          <Select
            defaultValue={"" + size}
            onValueChange={(v) => onSizeChange(Number(v))}
          >
            <SelectTrigger>
              <SelectValue placeholder={10} />
            </SelectTrigger>
            <SelectContent position="popper">
              <SelectGroup>
                <SelectItem value={"1"} key={"1"}>
                  1
                </SelectItem>
                <SelectItem value={"5"} key={"5"}>
                  5
                </SelectItem>
                <SelectItem value={"10"} key={"10"}>
                  10
                </SelectItem>
                <SelectItem value={"20"} key={"20"}>
                  20
                </SelectItem>
                <SelectItem value={"50"} key={"50"}>
                  50
                </SelectItem>
                <SelectItem value={"100"} key={"100"}>
                  100
                </SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </CardContent>
    </Card>
  );
};
