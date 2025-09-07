import { useEffect, useState } from "react";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "./ui/select";
import { Button } from "./ui/button";
import { ListOrdered, Plus, X } from "lucide-react";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";

type SortOption = {
    key: string;
    label: string;
};

export type SortRule = {
    key: string;
    direction: "asc" | "desc";
};

interface MultiSortSelectProps {
    options: SortOption[];
    value: SortRule[];
    onChange: (rules: SortRule[]) => void;
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export function MultiSortSelect({
    options,
    value,
    onChange,
}: MultiSortSelectProps) {
    const [open, setOpen] = useState(false);
    const [draft, setDraft] = useState<SortRule[]>(value);

    useEffect(() => setDraft(value), [value]);

    const handleAdd = () => {
        if (options.length > 0) {
            const usedKeys = draft.map((r) => r.key);
            const available = options.find((opt) => !usedKeys.includes(opt.key));
            if (!available) return; // hết cột để chọn

            setDraft([...draft, { key: available.key, direction: "asc" }]);
        }
    };

    const handleUpdate = (idx: number, rule: Partial<SortRule>) => {
        setDraft((prev) => prev.map((r, i) => (i === idx ? { ...r, ...rule } : r)));
    };

    const handleRemove = (idx: number) => {
        setDraft((prev) => prev.filter((_, i) => i !== idx));
    };

    const handleApply = () => {
        onChange(draft);
        setOpen(false);
    };

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="outlinePrimary"
                    size="lg"
                    className="sm:flex-none min-w-[80px]"
                >
                    <ListOrdered className="size-5 mr-1" />
                    <span className="hidden sm:inline">Sort</span>
                </Button>
            </PopoverTrigger>
            <PopoverContent
                align="end"
                className="sm:!max-w-[500px] w-fit bg-white shadow-lg p-4 rounded-xl z-20 border-2 border-zinc-100"
            >
                <div>
                    <div>Sort settings</div>
                    <div>
                        Chọn nhiều cột và hướng sort, ưu tiên theo thứ tự trên xuống dưới.
                    </div>
                </div>

                <div className="space-y-3">
                    {draft.map((rule, idx) => (
                        <div
                            key={idx}
                            className="flex items-center gap-2 border rounded-lg p-2"
                        >
                            <Select
                                value={rule.key}
                                onValueChange={(v) => handleUpdate(idx, { key: v })}
                            >
                                <SelectTrigger className="w-[160px]">
                                    <SelectValue placeholder="Column" />
                                </SelectTrigger>
                                <SelectContent position="popper" className="z-30">
                                    {options.map((opt) => {
                                        const selected = draft.some(
                                            (r, i) => r.key === opt.key && i !== idx,
                                        );
                                        if (selected && rule.key !== opt.key) return null;
                                        return (
                                            <SelectItem key={opt.key} value={opt.key}>
                                                {opt.label}
                                            </SelectItem>
                                        );
                                    })}
                                </SelectContent>
                            </Select>

                            <Select
                                value={rule.direction}
                                onValueChange={(v: "asc" | "desc") =>
                                    handleUpdate(idx, { direction: v })
                                }
                            >
                                <SelectTrigger className="w-[120px]">
                                    <SelectValue placeholder="Direction" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="asc">ASC</SelectItem>
                                    <SelectItem value="desc">DESC</SelectItem>
                                </SelectContent>
                            </Select>

                            <Button
                                size="icon"
                                variant="ghost"
                                onClick={() => handleRemove(idx)}
                            >
                                <X className="size-4" />
                            </Button>
                        </div>
                    ))}
                    <Button
                        onClick={handleAdd}
                        variant="outlineSecondary"
                        className="gap-2"
                    >
                        <Plus className="size-4" /> Add rule
                    </Button>
                </div>
                <div className="flex justify-between mt-4">
                    <Button
                        variant="outline"
                        onClick={() => {
                            setDraft(value);
                        }}
                    >
                        Reset
                    </Button>
                    <Button
                        onClick={() => {
                            handleApply();
                            setOpen(false);
                        }}
                        variant={"outlinePrimary"}
                    >
                        Apply
                    </Button>
                </div>
            </PopoverContent>
        </Popover>
    );
}
