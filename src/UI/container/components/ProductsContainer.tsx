'use client'

import React, { useEffect, useState } from 'react'
import ProductCard from '@/UI/products/components/ProductCard'
import axios from 'axios'
import { Product } from '@/UI/products/types/types'

const ProductsContainer = () => {

    const [products, setProducts] = useState<Product[]>([])

    useEffect(() => {
        axios.get(`${process.env.NEXT_PUBLIC_API_URL}/product`).then(response => {
            setProducts(response.data);
        }).catch(err => {
            console.log(err);            
        })
    })

    return (
        <div className = { "grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8" }>{
            products.map(prod => {
                // eslint-disable-next-line react/jsx-key
                return (<ProductCard key={prod.id} id={prod.id} name={prod.name} description={prod.description} price={prod.price} brand={prod.brand} category={prod.category} inStock={prod.inStock} image={prod.image}/>)
            })
        }</div>
    )
}
export default ProductsContainer;