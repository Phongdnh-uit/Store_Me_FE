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
import { cn } from "@/lib/utils";

interface DensitySelectProps {
  density: "compact" | "normal" | "flexible";
  setDensity: (density: "compact" | "normal" | "flexible") => void;
  className?: string;
}

export default function DensitySelect({
  density,
  setDensity,
  className,
}: DensitySelectProps) {
  return (
    <Select value={density} onValueChange={setDensity}>
      <SelectTrigger
        className={cn(
          "h-10! px-3 border border-blue-500 text-blue-500 bg-transparent hover:bg-blue-500 hover:text-white flex items-center gap-2 transition-colors rounded-md [&_svg]:!text-blue-500 hover:[&_svg]:!text-white",
          className,
        )}
      >
        <SelectValue placeholder={density} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Density</SelectLabel>
          <SelectItem
            value="compact"
            className="flex items-center gap-2 cursor-pointer hover:bg-purple-200/40 data-[state=checked]:bg-purple-100/50"
          >
            <Rows4 className="h-4 w-4" /> Compact
          </SelectItem>
          <SelectItem
            value="normal"
            className="flex items-center gap-2 cursor-pointer hover:bg-purple-200/40 data-[state=checked]:bg-purple-100/50"
          >
            <Rows3 className="h-4 w-4" /> Normal
          </SelectItem>
          <SelectItem
            value="flexible"
            className="flex items-center gap-2 cursor-pointer hover:bg-purple-200/40 data-[state=checked]:bg-purple-100/50"
          >
            <Rows2 className="h-4 w-4" /> Flexible
          </SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
