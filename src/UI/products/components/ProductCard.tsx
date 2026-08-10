'use client'

import React from 'react'
import { Product, Role } from "@/UI/products/types/types"
import Image from "next/image"
import { truncate } from "@/utils/functions/truncate"
import { formatPrice } from "@/utils/functions/formatPrice"
import { resolveProductImage } from "@/utils/images"
import { useRouter } from "next/navigation"
import { useAuth } from '@/app/auth/context/AuthContext'

const ProductCard: React.FC<Product> = (data: Product) => {
  const {user} = useAuth()
  const router = useRouter()
  
  return (
    <article
      onClick={() => router.push(`${user && user.userRole === Role.ADMIN ? `/admin/item-view/${data.id}`:`/product/${data.id}`}`)}
      className="
        group
        cursor-pointer
        rounded-[var(--radius-lg)]
        bg-[hsl(var(--surface-elevated))]
        border border-[hsl(var(--border-subtle))]
        overflow-hidden
        transition-all duration-300 ease-out
        hover:border-[hsl(var(--accent)/0.3)]
        hover:shadow-[var(--shadow-md)]
        hover:-translate-y-1
      "
    >
      <div className="relative aspect-square overflow-hidden bg-[hsl(var(--surface))]">
        <Image
          alt={data.name}
          src={resolveProductImage(data.image)}
          fill
          className="
            object-contain
            transition-transform duration-500 ease-out
            group-hover:scale-105
          "
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        {!data.inStock && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <span className="text-white font-medium text-sm tracking-wide uppercase">
              Out of Stock
            </span>
          </div>
        )}
      </div>
      
      <div className="p-4 space-y-2">
        <h3 className="
          text-[hsl(var(--text-primary))]
          font-medium
          text-sm
          leading-snug
          line-clamp-2
          group-hover:text-[hsl(var(--accent))]
          transition-colors duration-200
        ">
          {truncate(data.name)}
        </h3>
        
        <div className="flex items-center justify-between pt-1">
          <p className="
            text-[hsl(var(--accent))]
            font-semibold
            text-lg
          ">
            {formatPrice(data.price)}
          </p>
          <span className="
            text-xs
            text-[hsl(var(--text-muted))]
            uppercase
            tracking-wider
          ">
            {data.category}
          </span>
        </div>
      </div>
    </article>
  )
}

export default ProductCard
