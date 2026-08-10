'use client'
import React, { useEffect, useState } from 'react'
import { API_URL } from '@/utils/api'
import { resolveProductImage } from '@/utils/images'
import Image from "next/image";
import { Product } from '@/UI/products/types/types';
import Link from 'next/link';
import { formatPrice } from '@/utils/functions/formatPrice';

const HomeBanner = () => {

    const [prod, setProd] = useState<Product | null>(null);

    useEffect(() => {
        fetch(`${API_URL}/product/most/expensive`)
            .then(res => res.json())
            .then(data => setProd(data))
            .catch(() => {}) 
    }, []);

    if (!prod?.name) {
        return (
            <section className="
                mb-8
                rounded-[var(--radius-lg)]
                bg-[hsl(var(--surface-elevated))]
                border border-[hsl(var(--border-subtle))]
                overflow-hidden
            ">
                <div className="
                    py-16 px-6
                    flex flex-col items-center justify-center
                    text-center
                    space-y-4
                ">
                    <h2 className="
                        text-3xl md:text-5xl 
                        font-bold 
                        text-[hsl(var(--text-primary))]
                        tracking-tight
                    ">
                        Discover
                    </h2>
                    <p className="
                        text-lg 
                        text-[hsl(var(--text-secondary))]
                        max-w-md
                    ">
                        Explore our curated collection of premium products
                    </p>
                </div>
            </section>
        )
    }

    return (
        <section className="
            mb-8
            rounded-[var(--radius-lg)]
            bg-[hsl(var(--surface-elevated))]
            border border-[hsl(var(--border-subtle))]
            overflow-hidden
            transition-all duration-300
            hover:shadow-[var(--shadow-md)]
        ">
            <Link href={`/product/${prod.id}`} className="block">
                <div className="
                    grid md:grid-cols-2
                    gap-0
                ">
                    <div className="
                        relative 
                        aspect-square md:aspect-auto
                        bg-[hsl(var(--surface))]
                        flex items-center justify-center
                        p-8
                    ">
                        <div className="relative w-48 h-48 md:w-64 md:h-64">
                            <Image
                                src={resolveProductImage(prod.image)}
                                alt={prod.name}
                                fill
                                className="object-contain"
                                sizes="(max-width: 768px) 100vw, 50vw"
                            />
                        </div>
                    </div>
                    
                    <div className="
                        flex flex-col justify-center
                        p-8 md:p-12
                        space-y-4
                    ">
                        <span className="
                            text-xs 
                            uppercase 
                            tracking-widest 
                            text-[hsl(var(--text-muted))]
                        ">
                            Featured
                        </span>
                        
                        <h3 className="
                            text-2xl md:text-3xl
                            font-bold 
                            text-[hsl(var(--text-primary))]
                            leading-tight
                        ">
                            {prod.name}
                        </h3>
                        
                        <p className="
                            text-sm md:text-base
                            text-[hsl(var(--text-secondary))]
                            line-clamp-3
                        ">
                            {prod.description}
                        </p>
                        
                        <div className="pt-4 flex items-center justify-between">
                            <span className="
                                text-2xl md:text-3xl 
                                font-semibold 
                                text-[hsl(var(--accent))]
                            ">
                                {formatPrice(prod.price)}
                            </span>
                            
                            <span className={`
                                text-sm 
                                font-medium 
                                px-3 py-1 
                                rounded-full
                                ${prod.inStock 
                                    ? 'bg-[hsl(var(--success)/0.1)] text-[hsl(var(--success))]' 
                                    : 'bg-[hsl(var(--error)/0.1)] text-[hsl(var(--error))]'
                                }
                            `}>
                                {prod.inStock ? 'Available' : 'Out of Stock'}
                            </span>
                        </div>
                    </div>
                </div>
            </Link>
        </section>
    )
}
export default HomeBanner
