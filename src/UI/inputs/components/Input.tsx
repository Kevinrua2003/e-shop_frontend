import React from 'react'
import {InputProps} from "@/UI/inputs/types/types";

const Input : React.FC<InputProps> = ( {
    id,
    label,
    type = "text",
    disabled,
    required,
    large,
    register,
    errors,
} ) => {
    return (
        <div className = { "w-full relative" }>
            <input
                autoComplete = { "off" }
                id = { id }
                disabled = { disabled }
                type = { type }
                { ...register(id, { required }) }
                placeholder = { " " }
                className = { `
                    peer
                    w-full
                    px-4 
                    py-3 
                    outline-none 
                    bg-[hsl(var(--surface))]
                    border 
                    rounded-[var(--radius-md)]
                    transition-all duration-200
                    disabled:opacity-50 
                    disabled:cursor-not-allowed
                    placeholder-transparent
                    ${ errors[id] 
                        ? "border-[hsl(var(--error))] focus:border-[hsl(var(--error))]" 
                        : "border-[hsl(var(--border))] focus:border-[hsl(var(--accent))]" 
                    }
                    ${ large && "max-h-[150px] min-h-[150px] resize-none" }
                    text-[hsl(var(--text-primary))]
                    hover:border-[hsl(var(--text-muted))]
                ` }/>
            <label 
                htmlFor = { id }
                className = { `absolute 
                    cursor-text 
                    text-sm 
                    duration-200 
                    -translate-y-2.5 
                    top-3 
                    z-10 
                    origin-[0] 
                    left-4 
                    pointer-events-none
                    text-[hsl(var(--text-muted))]
                    peer-placeholder-shown:scale-100 
                    peer-placeholder-shown:translate-y-0 
                    peer-focus:scale-75 
                    peer-focus:-translate-y-2.5
                    ${ errors[id] ? "text-[hsl(var(--error))]" : "" }
                    bg-[hsl(var(--surface))] px-1
                    rounded
                ` }>
                { label }
                {required && <span className="text-[hsl(var(--error))] ml-0.5">*</span>}
            </label>
        </div>
    )
}
export default Input
