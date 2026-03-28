'use client'
import React from 'react'
import { ItemContentProps } from "@/UI/cart/types/types";
import { formatPrice } from "@/utils/functions/formatPrice";
import Link from "next/link";
import { truncate } from "@/utils/functions/truncate";
import Button from "@/UI/buttons/components/Button";
import Image from "next/image";
import SetQuantity from "@/UI/products/components/SetQuantity";
import { useCart } from "@/hooks/cart/useCart";

const ItemContent: React.FC<ItemContentProps> = ({ item }: ItemContentProps) => {
  const { handleRemoveProductFromCart, handleCartQtyIncrease, handleCartQtyDecrease } = useCart();

  return (
    <div className="
        grid grid-cols-5 
        gap-4 
        border-t border-[hsl(var(--border-subtle))]
        py-4 
        items-center
        text-[hsl(var(--text-primary))]
    ">
      <div className="col-span-2 flex justify-self-start gap-3 md:gap-4">
        <Link href={`/product/${item.id}`}>
          <div className="relative w-[70px] aspect-square bg-[hsl(var(--surface))] rounded-[var(--radius-sm)] overflow-hidden">
            {item.image && (
              <Image 
                src={item.image} 
                alt={item.name} 
                fill 
                className="object-contain" 
              />
            )}
          </div>
        </Link>
        <div className="flex flex-col justify-between">
          <Link href={`/product/${item.id}`} className="text-sm font-medium hover:text-[hsl(var(--accent))]">
            {truncate(item.name)}
          </Link>
          <Button 
            variant="ghost"
            small 
            onClick={() => handleRemoveProductFromCart(item.id)} 
            label="Remove" 
          />
        </div>
      </div>
      <div className="justify-self-center text-[hsl(var(--text-secondary))]">
        {formatPrice(item.price)}
      </div>
      <div className="justify-self-center">
        <SetQuantity 
          cartCounter={true}
          cartProduct={item}
          handleQuantityIncrease={() => handleCartQtyIncrease(item.id)}
          handleQuantityDecrease={() => handleCartQtyDecrease(item.id)}
        />
      </div>
      <div className="justify-self-end font-semibold text-[hsl(var(--text-primary))]">
        {formatPrice(item.price * item.quantity)}
      </div>
    </div>
  )
}

export default ItemContent
