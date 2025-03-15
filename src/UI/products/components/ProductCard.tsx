'use client'

import React from 'react'
import {Product} from "@/UI/products/types/types"
import Image from "next/image";
import {truncate} from "@/utils/functions/truncate";
import {formatPrice} from "@/utils/functions/formatPrice";
import {useRouter} from "next/navigation";

const ProductCard : React.FC<Product> = ( data : Product ) => {
    const router = useRouter();
    // const rating : number = data.data.reviews.reduce(( acc, item ) => item.rating + acc, 0) / data.data.reviews.length;
    return (
        <article
            onClick = { () => router.push(`/product/${ data.id }`) }
            className = { "col-span-1 cursor-pointer border-[1.2px] border-slate-200 bg-slate-50 rounded-sm p-2 transition hover:scale-105 text-center text-sm" }>
            <div className = { "flex flex-col items-center gap-1 w-full" }>
                <div className = { "aspect-square overflow-hidden relative w-full" }>
                    <Image alt = { "imagen del producto" } fill className = { "w-full h-full object-contain " }
                           src = { data.image }/>
                </div>
                <p className = { "mt-4" }>
                    { truncate(data.name) }
                </p>
                {/* <p>
                    { data.data.reviews.length } reviews
                </p> */}
                <p className = { "font-semibold" }>{ formatPrice(data.price) }</p>
                {/* <div>
                    <Rating value = { rating }/>
                </div> */}
            </div>
        </article>
    )
}
export default ProductCard
