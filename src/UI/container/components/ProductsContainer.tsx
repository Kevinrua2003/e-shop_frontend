'use client'

import React, { useEffect, useState } from 'react'
import ProductCard from '@/UI/products/components/ProductCard'
import axios from 'axios'
import { Product } from '@/UI/products/types/types'
import { useProductsFilter } from '@/hooks/products/useProductsFilter'
import NullData from '@/UI/messages/components/NullData'

const ProductsContainer = () => {
  const [products, setProducts] = useState<Product[]>([])
  const { category } = useProductsFilter()

  useEffect(() => {
    axios.get(`${process.env.NEXT_PUBLIC_API_URL}/product`)
         .then(response => {
           if (category === "All") {
             setProducts(response.data)
           } else {
             setProducts(response.data.filter((prod: Product) => prod.category === category))
           }
         })
         .catch(err => console.log(err))
  }, [category])

  return (
    products.length === 0 ? (
      <div className="flex items-center justify-center p-12 bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl shadow-lg">
        <NullData title="No products to display" />
      </div>
    ) : (
      <div className="p-8 bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-xl">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8 animate-fadeIn">
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
