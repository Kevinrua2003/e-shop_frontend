'use client'
import React from 'react'
import {SetQuantityProps} from "@/UI/products/types/types";

const SetQuantity : React.FC<SetQuantityProps> = ( {
    cartCounter,
    cartProduct,
    handleQuantityIncrease,
    handleQuantityDecrease,
} : SetQuantityProps ) => {
    return (
        <div className = "flex gap-6 items-center">
            { cartCounter ? null :
                <div className = "font-medium text-[hsl(var(--text-secondary))]">QUANTITY:</div>
            }
            <div className = "flex gap-3 items-center">
                <button 
                    onClick = { handleQuantityDecrease }
                    className = "
                        w-8 h-8 
                        flex items-center justify-center
                        border border-[hsl(var(--border))]
                        rounded-[var(--radius-sm)]
                        text-[hsl(var(--text-secondary))]
                        hover:bg-[hsl(var(--surface-hover))]
                        hover:border-[hsl(var(--text-muted))]
                        transition-all duration-150
                    "
                >
                    -
                </button>
                <div className="w-8 text-center font-medium">
                    { cartProduct.quantity }
                </div>
                <button 
                    onClick = { handleQuantityIncrease }
                    className = "
                        w-8 h-8 
                        flex items-center justify-center
                        border border-[hsl(var(--border))]
                        rounded-[var(--radius-sm)]
                        text-[hsl(var(--text-secondary))]
                        hover:bg-[hsl(var(--surface-hover))]
                        hover:border-[hsl(var(--text-muted))]
                        transition-all duration-150
                    "
                >
                    +
                </button>
            </div>
        </div>
    )
}
export default SetQuantity
