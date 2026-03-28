'use client'
import React from 'react'
import {useRouter} from "next/navigation";
import {useCart} from "@/hooks/cart/useCart";
import {CiShoppingCart} from "react-icons/ci";

const CartCount = () => {

    const router = useRouter();
    const { cartTotalQty } = useCart()
    
    return ( 
        <button 
            onClick={() => router.push('/cart')}
            className="
                relative 
                p-2
                rounded-[var(--radius-md)]
                text-[hsl(var(--text-primary))]
                hover:bg-[hsl(var(--surface-hover))]
                transition-all duration-200
            "
            aria-label="Shopping cart"
        >
            <CiShoppingCart size={24} />
            {cartTotalQty > 0 && (
                <span className="
                    absolute 
                    top-0 
                    right-0 
                    bg-[hsl(var(--accent))] 
                    text-white 
                    h-5 w-5 
                    rounded-full 
                    flex items-center justify-center 
                    text-xs 
                    font-medium
                ">
                    {cartTotalQty}
                </span>
            )}
        </button>
    )
}
export default CartCount
