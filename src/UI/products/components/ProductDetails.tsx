'use client'
import React, { useEffect, useState } from 'react'
import { Product } from "@/UI/products/types/types";
import Button from "@/UI/buttons/components/Button";
import { useCart } from "@/hooks/cart/useCart";
import { MdCheckCircle } from "react-icons/md";
import { useRouter } from "next/navigation";
import ProductImage from './ProductImage';

const ProductDetails = (product: Product) => {
  const { handleAddProductToCart, cartProducts } = useCart();
  const [isProductInCart, setIsProductInCart] = useState(false);
  const router = useRouter();

  // Verifica si el producto ya está en el carrito usando el id
  useEffect(() => {
    if (cartProducts) {
      const exists = cartProducts.some(item => item.id === product.id);
      setIsProductInCart(exists);
    } else {
      setIsProductInCart(false);
    }
  }, [cartProducts, product.id]);

  return (
    <div className="grid md:grid-cols-2">
      <div>
        <ProductImage 
          id={product.id} 
          name={product.name} 
          description={product.description} 
          price={product.price} 
          brand={product.brand} 
          category={product.category} 
          inStock={product.inStock} 
          image={product.image}
        />
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
        { isProductInCart ? (
          <>
            <p className="mb-2 text-slate-500 flex items-center gap-1">
              <MdCheckCircle className="text-teal-400" size={20}/>
              <span>Producto agregado al carrito</span>
            </p>
            <div>
              <Button 
                label="View Cart" 
                outline 
                onClick={() => router.push("/cart")} 
                custom="max-w-[300px]"
              />
            </div>
          </>
        ) : (
          <Button 
            custom="max-w-[300px]" 
            disabled={!product.inStock}
            label={`${product.inStock ? `Add to cart` : `Sorry, not in stock`}`}
            onClick={() => handleAddProductToCart(product.id)}
          />
        )}
      </div>
    </div>
  )
}

export default ProductDetails;
