import React from "react";
import { SummaryTargetProps } from "../types/types";

const SummaryTarget: React.FC<SummaryTargetProps> = ({label, value}) => {
    return (
        <div className="hover:scale-125 transition-transform duration-500 bg-blue-50 rounded-xl border-2 border-blue-400 items-center flex flex-col gap-2 transition ">
           <div className="font-bold text-xl text-blue-900">{label}</div>
           <div>{value}</div>
        </div>
    )
}

export default SummaryTarget;