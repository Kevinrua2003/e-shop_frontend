'use client'

import React, { useEffect, useMemo, useState } from 'react'
import { API_URL } from '@/utils/api'
import ProductCard from '@/UI/products/components/ProductCard'
import { Product } from '@/UI/products/types/types'
import { useProductsFilter } from '@/hooks/products/useProductsFilter'
import NullData from '@/UI/messages/components/NullData'

const ProductsContainer = () => {
  const [products, setProducts] = useState<Product[]>([])
  const { category } = useProductsFilter()

  // Una sola petición al catálogo; el filtrado por categoría es local.
  // Solo se aceptan arrays: un error del backend llega como objeto JSON
  // (p. ej. {statusCode, message, path}) y rompería el .map().
  useEffect(() => {
    fetch(`${API_URL}/product`)
         .then(response => (response.ok ? response.json() : []))
         .then(data => setProducts(Array.isArray(data) ? data : []))
         .catch(() => setProducts([]))
  }, [])

  const visibleProducts = useMemo(
    () =>
      Array.isArray(products)
        ? category === "All"
          ? products
          : products.filter((prod) => prod.category === category)
        : [],
    [category, products]
  )

  return (
    visibleProducts.length === 0 ? (
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
          {visibleProducts.map(prod => (
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
