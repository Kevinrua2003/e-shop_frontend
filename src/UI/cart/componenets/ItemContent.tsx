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
    <div className="grid grid-cols-5 text-sx md:text-sm gap-4 border-t-[1.5px] border-slate-200 py-4 items-center">
      <div className="col-span-2 flex justify-self-start gap-2 md:gap-4">
        <Link href={`/products/${item.id}`}>
          <div className="relative w-[70px] aspect-square">
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
          <Link href={`/products/${item.id}`}>{truncate(item.name)}</Link>
          <div className="w-[70px]">
            <Button 
              outline 
              small 
              onClick={() => handleRemoveProductFromCart(item.id)} 
              label="Remove" 
              custom="text-slate-500" 
            />
          </div>
        </div>
      </div>
      <div className="justify-self-center">{formatPrice(item.price)}</div>
      <div className="justify-self-center">
        <SetQuantity 
          cartCounter={true}
          cartProduct={item}
          handleQuantityIncrease={() => handleCartQtyIncrease(item.id)}
          handleQuantityDecrease={() => handleCartQtyDecrease(item.id)}
        />
      </div>
      <div className="justify-self-end font-semibold">
        {formatPrice(item.price * item.quantity)}
      </div>
    </div>
  )
}

export default ItemContent;
