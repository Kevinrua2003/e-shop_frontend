'use client'
import React, { useEffect, useState } from 'react';
import { useCart } from "@/hooks/cart/useCart";
import Link from "next/link";
import { MdArrowBack } from "react-icons/md";
import Heading from "@/UI/Headings/components/Heading";
import Button from "@/UI/buttons/components/Button";
import ItemContent from "@/UI/cart/componenets/ItemContent";
import { formatPrice } from "@/utils/functions/formatPrice";
import axios from 'axios';
import { CartProductType } from '@/UI/products/types/types';
import toast from 'react-hot-toast';
import { useAuth } from '@/app/auth/context/AuthContext';
import { useRouter } from 'next/navigation';

// Función para obtener el producto completo desde la API
const getProduct = async (id: string): Promise<CartProductType | null> => {
  try {    
    const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/product/${id}`);
    return res.data;
  } catch (error) {
    console.log(error);
    return null;
  }
};

const CartClient = () => {
  const { cartProducts, handleClearCart, handleCheckout, cartTotalAmount } = useCart();
  const [products, setProducts] = useState<CartProductType[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const {user} = useAuth();
  const router = useRouter()

  useEffect(() => {
    if (cartProducts && cartProducts.length > 0) {
      setLoading(true);
      // Para cada producto del carrito, se obtienen los detalles y se combina con la cantidad
      Promise.all(
        cartProducts.map(async (item) => {
          const productDetail = await getProduct(item.id);
          return productDetail ? { ...productDetail, quantity: item.quantity } : null;
        })
      )
        .then((fetchedProducts) => {
          // Filtramos los posibles nulos en caso de error
          setProducts(fetchedProducts.filter((prod) => prod !== null) as CartProductType[]);
        })
        .catch(console.error)
        .finally(() => setLoading(false));
    }
  }, [cartProducts]);

  if (!cartProducts || cartProducts.length === 0) {
    return (
      <div className="flex flex-col items-center">
        <p className="text-2xl">Your Cart is empty</p>
        <div>
          <Link href="/" className="text-slate-500 flex items-center justify-center gap-1 mt-1">
            <MdArrowBack />
            <span>Start Shopping</span>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Heading title="Shopping Cart" center />
      <div className="grid grid-cols-5 text-xs gap-4 pb-2 items-center">
        <div className="col-span-2 justify-self-start">Product</div>
        <div className="justify-self-center">Price</div>
        <div className="justify-self-center">Quantity</div>
        <div className="justify-self-end">Total</div>
      </div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div>
          {products.map((product) => (
            <ItemContent item={product} key={product.id} />
          ))}
        </div>
      )}
      <div className="border-t-[1.5px] border-slate-200 py-4 flex justify-between gap-4">
        <Button custom="max-w-[90px]" label="Clear Cart" onClick={handleClearCart} small outline />
      </div>
      <div className="text-sm flex flex-col gap-1 items-end">
        <div>
          <div className="flex justify-between w-full text-base font-semibold">
            <span>Subtotal</span>
            <span>{formatPrice(cartTotalAmount)}</span>
          </div>
          <p className="text-slate-500">Taxes and shipping calculates at checkout</p>
          <Button label="Checkout" onClick={() => {
            if(!user){
              toast.error("You must be logged in to checkout");
              router.push("/auth/login");
            }
            else{
              handleCheckout();
            }
          }}/>
          <Link href="/" className="text-slate-500 flex items-center gap-1 mt-2">
            <MdArrowBack />
            <span>Continue Shopping</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CartClient;
