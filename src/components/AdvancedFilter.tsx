import { useState, type ReactNode } from "react";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import DateInput from "./input/DateInput";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "./ui/select";
import { Switch } from "./ui/switch";
import { Sheet, SheetContent } from "./ui/sheet";
import { Button } from "./ui/button";

export interface FilterField {
    key: string;
    label?: string;
    type:
    | "text"
    | "number"
    | "date"
    | "select"
    | "multiselect"
    | "boolean"
    | "custom";
    options?: { label: string; value: string | number | boolean }[];
    placeholder?: string;
    description?: string;
    customComponent?: (
        value: unknown,
        onChange: (value: unknown) => void,
    ) => ReactNode;
}

interface FilterFieldRenderProps {
    field: FilterField;
    value: unknown;
    onChange: (value: unknown) => void;
}

const FilterFieldRender = ({
    field,
    value,
    onChange,
}: FilterFieldRenderProps) => {
    switch (field.type) {
        case "text":
            return (
                <div>
                    <Label className="mb-2 ml-2">{field.label}</Label>
                    <Input
                        className="h-14 rounded-xl border border-zinc-400 hover:border-blue-500 focus-visible:border-blue-500 focus-visible:ring-blue-200/40"
                        type="text"
                        value={(value as string) || ""}
                        onChange={(e) => onChange(e.target.value)}
                        placeholder={field.placeholder}
                    />
                    <div className="text-sm text-gray-500 mt-2 ml-2">
                        {field.description}
                    </div>
                </div>
            );
        case "number":
            return (
                <div>
                    <Label className="mb-2 ml-2">{field.label}</Label>
                    <Input
                        className="h-14 rounded-xl border border-zinc-400 hover:border-blue-500 focus-visible:border-blue-500 focus-visible:ring-blue-200/40"
                        type="number"
                        value={(value as number) || ""}
                        onChange={(e) => onChange(Number(e.target.value))}
                        placeholder={field.placeholder}
                    />
                    <div className="text-sm text-gray-500 mt-2 ml-2">
                        {field.description}
                    </div>
                </div>
            );
        case "date":
            return (
                <div>
                    <Label className="mb-2 ml-2">{field.label}</Label>
                    <DateInput
                        value={value instanceof Date ? value : undefined}
                        onChange={(v) => onChange(v)}
                    />
                    <div className="text-sm text-gray-500 mt-2 ml-2">
                        {field.description}
                    </div>
                </div>
            );
        case "select":
            return (
                <div className="grow">
                    <Label>{field.label}</Label>
                    <Select defaultValue={value as string} onValueChange={onChange}>
                        <SelectTrigger>
                            <SelectValue placeholder={field.placeholder} />
                        </SelectTrigger>
                        <SelectContent position="popper">
                            <SelectGroup>
                                <SelectLabel>{field.label}</SelectLabel>
                                {field.options?.map((option, idx) => (
                                    <SelectItem key={idx} value={option.value.toString()}>
                                        {option.label}
                                    </SelectItem>
                                ))}
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>
            );
        case "multiselect":
            return <div>Not implemented yet</div>;
        case "boolean":
            return (
                <div>
                    <Label>{field.label}</Label>
                    <Switch
                        checked={value == true}
                        onCheckedChange={(v) => onChange(v)}
                    />
                    <div className="text-sm text-gray-500">{field.description}</div>
                </div>
            );
        case "custom":
            return (
                <div>
                    {field.customComponent
                        ? field.customComponent(value, onChange)
                        : "No custom component provided"}
                </div>
            );
    }
};

interface AdvancedFilterProps {
    fields: FilterField[];
    onApply: (filters: Record<string, unknown>) => void;
    open?: boolean;
    onOpenChange?: (open: boolean) => void;
}

export const AdvancedFilter = ({
    fields,
    onApply,
    open,
    onOpenChange,
}: AdvancedFilterProps) => {
    const [values, setValues] = useState<Record<string, unknown>>({});

    const handleChange = (key: string, value: unknown) => {
        setValues((prev) => ({ ...prev, [key]: value }));
    };

    const handleApply = () => {
        onApply(values);
    };

    return (
        <Sheet open={open} onOpenChange={onOpenChange}>
            <SheetContent className="w-md sm:max-w-5xl bg-white">
                <div className="p-4">
                    <h2 className="text-lg font-semibold mb-4">Advanced Filter</h2>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                        {fields.map((field) => (
                            <FilterFieldRender
                                key={field.key}
                                field={field}
                                value={values[field.key]}
                                onChange={(v) => handleChange(field.key, v)}
                            />
                        ))}
                    </div>
                    <div className="mt-4 flex justify-end space-x-2">
                        <Button variant="outlineSecondary" onClick={() => setValues({})}>
                            Clear
                        </Button>
                        <Button
                            variant={"outlinePrimary"}
                            className="bg-blue-500 text-white"
                            onClick={handleApply}
                        >
                            Apply
                        </Button>
                    </div>
                </div>
            </SheetContent>
        </Sheet>
    );
};
