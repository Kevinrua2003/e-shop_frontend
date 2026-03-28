import React from "react";
import { SummaryTargetProps } from "../types/types";

const SummaryTarget: React.FC<SummaryTargetProps> = ({label, value}) => {
    return (
        <div className="
            p-6
            rounded-[var(--radius-md)]
            bg-[hsl(var(--surface-elevated))]
            border border-[hsl(var(--border-subtle))]
            flex flex-col items-center justify-center gap-2
            transition-all duration-300
            hover:border-[hsl(var(--accent)/0.3)]
            hover:shadow-[var(--shadow-sm)]
        ">
            <span className="
                text-xs 
                uppercase 
                tracking-widest 
                text-[hsl(var(--text-muted))]
            ">
                {label}
            </span>
            <span className="
                text-3xl 
                font-bold 
                text-[hsl(var(--text-primary))]
            ">
                {value}
            </span>
        </div>
    )
}

export default SummaryTarget;
