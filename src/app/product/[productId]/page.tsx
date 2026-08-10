'use client'

import React, { useEffect, useState } from 'react'
import { API_URL } from '@/utils/api'
import Container from "@/UI/container/components/Container";
import ProductDetails from "@/UI/products/components/ProductDetails";
import { Product } from '@/UI/products/types/types';
import { useParams } from 'next/navigation';


const ProductPage = ( ) => {

    const {productId} = useParams()
    const [product, setProduct] = useState<Product>()

    useEffect(() => {
        // Sin deps este effect se repetiría en cada render (bucle de fetches).
        fetch(`${API_URL}/product/${productId}`)
          .then(response => (response.ok ? response.json() : null))
          .then(data => {
            if (data) setProduct(data);
          })
          .catch(err => {
            console.log(err);
          });
    }, [productId])

    const prod: Product = product ?? {
        id: "",
        name: "",
        brand: "",
        category: "",
        description: "",
        image: "",
        inStock: false,
        price: -1,   
    };

    return (
        <div className = "p-8">
            <Container>
                <ProductDetails id={prod.id} name={prod.name} description={prod.description} price={prod.price} brand={prod.brand} category={prod.category} inStock={prod.inStock} image={prod.image}/>
            </Container>
        </div>
    )
}
export default ProductPage
