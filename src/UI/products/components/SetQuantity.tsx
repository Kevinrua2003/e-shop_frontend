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
        <div className = { "flex gap-8 items-center" }>
            { cartCounter ? null :
                <div className = { "font-semibold" }>QUANTITY:</div>
            }
            <div className = { "flex gap-4 items-center text-base" }>
                <button onClick = { handleQuantityDecrease }
                        className = { "border-[1.2px] border-salte-300 px-2 rounded" }>-
                </button>
                <div>{ cartProduct.quantity }</div>
                <button onClick = { handleQuantityIncrease }
                        className = { "border-[1.2px] border-salte-300 px-2 rounded" }>+
                </button>
            </div>
        </div>
    )
}
export default SetQuantity
