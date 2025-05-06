'use client'

import React from 'react'
import { Product, Role } from "@/UI/products/types/types"
import Image from "next/image"
import { truncate } from "@/utils/functions/truncate"
import { formatPrice } from "@/utils/functions/formatPrice"
import { useRouter } from "next/navigation"
import { useAuth } from '@/app/auth/context/AuthContext'

const ProductCard: React.FC<Product> = (data: Product) => {
  const {user} = useAuth()
  const router = useRouter()
  return (
    <article
      onClick={() => router.push(`${user && user.userRole === Role.ADMIN ? `/admin/item-view/${data.id}`:`/product/${data.id}`}`)}
      className="cursor-pointer rounded-xl p-4 transition-transform duration-300 ease-in-out hover:scale-105 hover:shadow-2xl bg-white bg-opacity-90 backdrop-blur-md"
    >
      <div className="flex flex-col items-center gap-3">
        <div className="aspect-square relative w-full rounded-xl overflow-hidden shadow-md">
          <Image
            alt="imagen del producto"
            src={data.image}
            fill
            className="w-full h-full object-contain transition-transform duration-300 ease-in-out hover:scale-110"
          />
        </div>
        <div className="w-full text-center">
          <p className="mt-2 text-lg font-semibold text-gray-800">
            {truncate(data.name)}
          </p>
          <p className="mt-1 text-xl font-bold text-indigo-600">
            {formatPrice(data.price)}
          </p>
        </div>
      </div>
    </article>
  )
}

export default ProductCard
