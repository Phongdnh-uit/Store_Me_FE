import { Rows2, Rows3, Rows4 } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

export default function DensitySelect({
  density,
  setDensity,
}: {
  density: "compact" | "normal" | "flexible";
  setDensity: (density: "compact" | "normal" | "flexible") => void;
}) {
  return (
    <Select value={density} onValueChange={setDensity}>
      <SelectTrigger className="ml-auto w-[180px]">
        <SelectValue placeholder={density} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Density</SelectLabel>
          <SelectItem value="compact" className="hover:!bg-purple-200/40">
            <div className="flex items-center gap-2">
              <Rows4 className="h-4 w-4" />
              Compact
            </div>
          </SelectItem>
          <SelectItem
            value="normal"
            className="flex items-center gap-2 hover:!bg-purple-200/40"
          >
            <div className="flex items-center gap-2">
              <Rows3 className="h-4 w-4" /> Normal
            </div>
          </SelectItem>
          <SelectItem
            value="flexible"
            className="flex items-center gap-2 hover:!bg-purple-200/40"
          >
            <div className="flex items-center gap-2">
              <Rows2 className="h-4 w-4" />
              Flexible
            </div>
          </SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
