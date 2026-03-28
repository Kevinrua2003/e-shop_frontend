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
    variant = 'primary',
} : ButtonProps ) => {
    
    const baseStyles = `
        relative overflow-hidden
        inline-flex items-center justify-center gap-2
        font-medium rounded-[var(--radius-md)]
        transition-all duration-200 ease-out
        disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none
        focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2
    `;

    const sizeStyles = small 
        ? "text-sm px-3 py-1.5" 
        : "text-sm px-5 py-2.5";

    const variantStyles = {
        primary: `
            bg-[hsl(var(--accent))] text-white
            hover:bg-[hsl(var(--accent-hover))]
            focus-visible:ring-[hsl(var(--accent))]
            active:scale-[0.98]
            ${outline ? 'bg-transparent border-2 border-[hsl(var(--accent))] text-[hsl(var(--accent))] hover:bg-[hsl(var(--accent)/0.1)]' : ''}
        `,
        secondary: `
            bg-[hsl(var(--surface-elevated))] text-[hsl(var(--text-primary))]
            border border-[hsl(var(--border))]
            hover:bg-[hsl(var(--surface-hover))]
            hover:border-[hsl(var(--text-muted))]
            focus-visible:ring-[hsl(var(--border))]
            active:scale-[0.98]
            ${outline ? 'bg-transparent' : ''}
        `,
        ghost: `
            bg-transparent text-[hsl(var(--text-secondary))]
            hover:bg-[hsl(var(--surface-hover))]
            hover:text-[hsl(var(--text-primary))]
            focus-visible:ring-[hsl(var(--border))]
            active:scale-[0.98]
        `,
        danger: `
            bg-[hsl(var(--error))] text-white
            hover:opacity-90
            focus-visible:ring-[hsl(var(--error))]
            active:scale-[0.98]
        `
    };

    return (
        <button
            className = { `
                ${baseStyles}
                ${sizeStyles}
                ${variantStyles[variant]}
                ${custom ? custom : ""}
            ` }
            disabled = { disabled }
            onClick = { onClick }>
            { Icon && <Icon size = { small ? 18 : 20 }/> }
            { label }
        </button>
    )
}
export default Button
