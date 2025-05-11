'use client'
import React, { useEffect, useState } from 'react'
import Image from "next/image";
import axios from 'axios';
import { Product } from '@/UI/products/types/types';
import Link from 'next/link';
import { formatPrice } from '@/utils/functions/formatPrice';

const HomeBanner = () => {

    const [prod, setProd] = useState<Product | null>(null);

    useEffect(() => {
        axios.get(`${process.env.NEXT_PUBLIC_API_URL}/product/most/expensive`).then(res => {                 
            setProd(res.data);
        }) 
    }, [setProd]);

    return (
        <div>
            <div className="relative bg-gradient-to-r from-blue-500 to-purple-600 mb-8 rounded-xl shadow-2xl overflow-hidden">
                <div className="absolute inset-0 bg-black opacity-30"></div>
                <div 
                  className="relative mx-auto py-8 px-4 md:py-12 md:px-8 flex flex-col md:flex-row gap-4 items-center justify-evenly animate-fadeIn">
                    {prod ?
                        <div className="relative bg-gradient-to-r from-blue-500 to-purple-600 mb-8 rounded-xl shadow-2xl overflow-hidden ">
                            <Link href={`/product/${prod?.id}`}>
                                <div 
                                  className="relative mx-auto py-8 px-4 md:py-12 md:px-8 flex flex-col md:flex-row gap-4 items-center justify-evenly animate-fadeIn hover:scale-105 transition-transform duration-500 ease-in-out">
                                    <div className="flex flex-col md:flex-row items-center p-6 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-xl shadow-lg ">
                                        <div className="order-1 rounded-xl overflow-hidden">
                                            <div className="relative w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48">
                                                <Image
                                                    src={prod.image}
                                                    alt="Laptop, celular y reloj inteligente"
                                                    className="object-cover"
                                                    fill
                                                />
                                            </div>
                                        </div>
                                        <div className="order-2 mt-4 md:mt-0 md:ml-6 text-white">
                                            <p className="mt-3 text-xl font-bold tracking-wide">
                                                {prod.name.substring(0, 30) + "..."}
                                            </p>
                                            <p className="mt-2 text-base italic opacity-90">
                                                {prod.description.substring(0, 150) + "..."}
                                            </p>
                                            <p className="mt-2 text-2xl font-extrabold">
                                                {prod.inStock
                                                    ? `¡Get it now for: ${formatPrice(prod.price)}!`
                                                    : "Not available for now"}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        </div>          
                        :
                        <div>
                            <h2 className="text-4xl md:text-6xl font-bold text-white mb-4 drop-shadow-lg">
                                Products Sale!
                            </h2>
                            <p className="text-lg md:text-xl text-white mb-2 drop-shadow-md">
                                Enjoy a wide variety of items
                            </p>
                            <p className="text-2xl md:text-5xl text-yellow-400 font-bold drop-shadow-lg">
                                GET ANY YOU WANT!
                            </p>
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}
export default HomeBanner