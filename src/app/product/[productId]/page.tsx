'use client'

import React, { useEffect, useState } from 'react'
import Container from "@/UI/container/components/Container";
import ProductDetails from "@/UI/products/components/ProductDetails";
import { Product } from '@/UI/products/types/types';
import axios from 'axios';
import { useParams } from 'next/navigation';


const ProductPage = ( ) => {

    const {productId} = useParams()
    const [product, setProduct] = useState<Product>()

    useEffect(() => {
        axios.get(`http://localhost:5000/product/${productId}`).then(response => {
            setProduct(response.data);
        }).catch(err => {
            console.log(err);
            
        })
    })

    const productItem = product;

    let prod: Product = {
        id: "",
        name: "",
        brand: "",
        category: "",
        description: "",
        image: "",
        inStock: false,
        price: -1,   
    };
    if(productItem){
        prod = {
            id: productItem.id,
            name: productItem.name,
            brand: productItem.brand,
            category: productItem.category,
            description: productItem.description,
            image: productItem.image,
            inStock: productItem.inStock,
            price: productItem.price   
        }
    }

    return (
        <div className = "p-8">
            <Container>
                <ProductDetails id={prod.id} name={prod.name} description={prod.description} price={prod.price} brand={prod.brand} category={prod.category} inStock={prod.inStock} image={prod.image}/>
                <div className = { "flex flex-col mt-20 gap-4" }>
                    {/* <div>add rating</div>
                    <ListRating product = { productItem }/> */}
                </div>
            </Container>
        </div>
    )
}
export default ProductPage
