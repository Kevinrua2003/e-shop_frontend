'use client'

import React, { useEffect, useState } from 'react'
import ProductCard from '@/UI/products/components/ProductCard'
import { Product } from '@/UI/products/types/types'
import { useProductsFilter } from '@/hooks/products/useProductsFilter'
import NullData from '@/UI/messages/components/NullData'

const ProductsContainer = () => {
  const [products, setProducts] = useState<Product[]>([])
  const { category } = useProductsFilter()

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/product`)
         .then(response => response.json())
         .then(data => {
           if (category === "All") {
             setProducts(data)
           } else {
             setProducts(data.filter((prod: Product) => prod.category === category))
           }
         })
         .catch(() => {})
  }, [category])

  return (
    products.length === 0 ? (
      <div className="
        flex items-center justify-center
        p-12
        bg-[hsl(var(--surface-elevated))]
        border border-[hsl(var(--border-subtle))]
        rounded-[var(--radius-lg)]
      ">
        <NullData title="No products to display" />
      </div>
    ) : (
      <div className="
        p-6 md:p-8
        bg-[hsl(var(--surface))]
        rounded-[var(--radius-lg)]
      ">
        <div className="
            grid 
            grid-cols-1 
            sm:grid-cols-2 
            md:grid-cols-3 
            lg:grid-cols-4 
            xl:grid-cols-5 
            gap-4 md:gap-6
        ">
          {products.map(prod => (
            <ProductCard 
              key={prod.id} 
              id={prod.id} 
              name={prod.name} 
              description={prod.description} 
              price={prod.price} 
              brand={prod.brand} 
              category={prod.category} 
              inStock={prod.inStock} 
              image={prod.image} 
            />
          ))}
        </div>
      </div>
    )
  )
}

export default ProductsContainer
