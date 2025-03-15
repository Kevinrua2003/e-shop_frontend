import React from 'react';
import {CartItem} from "@/UI/products/types/types";

export type CartContextType = {
    cartTotalQty: number;
    cartTotalAmount: number;
    cartProducts: CartItem[] | null;
    handleAddProductToCart: (product: string) => void;
    handleRemoveProductFromCart: (product: string) => void;
    handleCartQtyIncrease: (product: string) => void;
    handleCartQtyDecrease: (product: string) => void;
    handleClearCart: () => void;
    handleCheckout: () => void;
  };

export interface CartContextProviderProps {
    [propName : string] : React.ReactNode
}