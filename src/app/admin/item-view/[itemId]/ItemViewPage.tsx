'use client'
import NullData from '@/UI/messages/components/NullData';
import ProductImage from '@/UI/products/components/ProductImage';
import { Product } from '@/UI/products/types/types';
import axios from 'axios';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';

function ItemViewPage() {

    const {itemId} = useParams();
    const [product, setProduct] = useState<Product>({
        id: '',
        name: '',
        description: '',
        brand: '',
        category: '',
        price: -1,
        inStock: false,
        image: '',
    })

    useEffect(() => {
        try {
            axios.get(`${process.env.NEXT_PUBLIC_API_URL}/product/${itemId}`).then(response => {
                setProduct(response.data);
            });            
        } catch (error) {
            setProduct({
                id: '',
                name: '',
                description: '',
                brand: '',
                category: '',
                price: -1,
                inStock: false,
                image: '',
            });
            toast.error(`Error fetching item: ${error}`);
        }
    }, [setProduct, itemId]);

    if(product.id === '') return (<div><NullData title={'There is no item to show'}/></div>)

  return (
    <div className="grid md:grid-cols-2">
        <div>
            <ProductImage id={product.id} name={product.name} description={product.description} price={product.price} brand={product.brand} category={product.category} inStock={product.inStock} image={product.image}/>
        </div>
        <div className="flex flex-col gap-1 text-slate-500 text-sm content-center items-center justify-center">
                <h2 className="text-3xl font-medium text-slate-700">{product.name}</h2>
                <p className="text-justify">{product.description}</p>
                <div className="flex flex-col mt-2">
                  <p>
                    <span className="font-semibold">BRAND: </span>{product.brand}
                  </p>
                  <p>
                    <span className="font-semibold">CATEGORY: </span>{product.category}
                  </p>
                  <p>
                    <span className="font-semibold">PRICE: </span>{product.price}
                  </p>
                </div>
                <p className={product.inStock ? "text-teal-400" : "text-rose-400"}>
                  {product.inStock ? "In Stock" : "Out of Stock"}
                </p>
              </div>
    </div>
  )
}

export default ItemViewPage;