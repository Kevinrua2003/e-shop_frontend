'use client'
import React from 'react'
import {ButtonProps} from "@/UI/buttons/types/types";

const Button : React.FC<ButtonProps> = ( {
                                             label,
                                             disabled,
                                             outline,
                                             small,
                                             custom,
                                             icon: Icon,
                                             onClick,
                                         } : ButtonProps ) => {
    return (
        <button
            className = { `disabled:opacity-70 disabled:cursor-not-allowed hover:opacity-80 transition border-slate-700 
            flex items-center justify-center gap-2 w-full rounded-md
            ${ outline ? "bg-white" : "bg-slate-700" } 
            ${ outline ? "text-slate-700" : "text-white" } 
            ${ small ? "text-sm" : "text-md" }
            ${ small ? "py-1 px-2 border-[1px]" : "py-3 px-4 border-2" }
            ${ custom ? custom : "" }` }
            disabled = { disabled }
            onClick = { onClick }>
            { Icon && <Icon size = { 24 }/> }
            { label }
        </button>
    )
}
export default Button
