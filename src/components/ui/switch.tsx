import * as React from "react";
import * as SwitchPrimitive from "@radix-ui/react-switch";

import { cn } from "@/lib/utils";
import { motion } from "motion/react";
import { useState } from "react";

function Switch({
    className,
    checked: controlledChecked,
    onCheckedChange: onCheckedChange,
    ...props
}: React.ComponentProps<typeof SwitchPrimitive.Root>) {
    // Use internal state only for uncontrolled component
    const [internalChecked, setInternalChecked] = useState<boolean>(
        props.defaultChecked ?? false,
    );

    // Determine if component is controlled
    const isControlled = controlledChecked !== undefined;

    // Use controlledChecked if provided, otherwise use internalChecked
    const checked = isControlled ? controlledChecked : internalChecked;

    // Handle checked change
    const handleCheckedChange = (newChecked: boolean) => {
        if (!isControlled) {
            setInternalChecked(newChecked);
        }
        onCheckedChange?.(newChecked);
    };
    return (
        <SwitchPrimitive.Root
            checked={checked}
            onCheckedChange={handleCheckedChange}
            data-slot="switch"
            className={cn(
                "peer data-[state=checked]:bg-primary data-[state=unchecked]:bg-input focus-visible:border-ring focus-visible:ring-ring/50 dark:data-[state=unchecked]:bg-input/80 inline-flex h-6 w-10 shrink-0 items-center rounded-full border border-transparent shadow-xs transition-all outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 overflow-hidden",
                className,
            )}
            {...props}
        >
            <SwitchPrimitive.Thumb data-slot="switch-thumb" asChild>
                <motion.div
                    className={cn(
                        "bg-background dark:data-[state=unchecked]:bg-foreground dark:data-[state=checked]:bg-primary-foreground block size-5 rounded-full ring-0",
                    )}
                    style={{ originX: !checked ? "left" : "right" }}
                    whileTap={{
                        scale: 1.1,
                        transition: { type: "spring", stiffness: 550, damping: 10 },
                    }}
                    animate={{ x: checked ? "calc(100% - 2px)" : "2px"}}
                    transition={{ type: "spring", stiffness: 550, damping: 35, mass: 2 }}
                />
            </SwitchPrimitive.Thumb>
        </SwitchPrimitive.Root>
    );
}

export { Switch };
