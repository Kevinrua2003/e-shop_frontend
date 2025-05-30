'use client'
import React from 'react'
import {useRouter} from "next/navigation";
import {useCart} from "@/hooks/cart/useCart";
import {CiShoppingCart} from "react-icons/ci";

const CartCount = () => {

    const router = useRouter();
    const { cartTotalQty } = useCart()
    return (
        <div className = { "relative cursor-pointer hover:scale-105 transition-all duration-300" } onClick = { () => {
            router.push('/cart')
        } }>
            <div className = { "text-3xl text-white" }>
                <CiShoppingCart/>
            </div>
            <span
                className = { "absolute top-[-10px] right-[-10px] bg-slate-700 text-white h-6 w-6 rounded-full flex items-center justify-center text-sm" }>{ cartTotalQty }</span>
        </div>
    )
}
export default CartCount
