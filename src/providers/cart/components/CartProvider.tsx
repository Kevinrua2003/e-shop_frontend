'use client'
import React from 'react'
import {CartProviderProps} from "@/providers/cart/types/types";
import {CartContextProvider} from "@/hooks/cart/useCart";

const CartProvider : React.FC<CartProviderProps> = ( { children } : CartProviderProps ) => {
    return (
        <CartContextProvider>{ children }</CartContextProvider>
    )
}
export default CartProvider
