import React from "react";
import { SummaryTargetProps } from "../types/types";

const SummaryTarget: React.FC<SummaryTargetProps> = ({label, value}) => {
    return (
        <div className="rounded-xl border-2 items-center flex flex-col gap-2 transition">
           <div className="font-bold text-xl">{label}</div>
           <div>{value}</div>
        </div>
    )
}

export default SummaryTarget;