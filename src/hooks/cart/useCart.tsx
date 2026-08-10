import React, {createContext, useCallback, useContext, useEffect, useState} from "react";
import { API_URL } from "@/utils/api";
import {CartContextProviderProps, CartContextType} from "@/hooks/cart/types/types";
import {CartItem} from "@/UI/products/types/types";
import toast from "react-hot-toast";
import { useAuth } from "@/app/auth/context/AuthContext";

const getProductPrice = async (productId: string): Promise<number> => {
  try {
    const res = await fetch(`${API_URL}/product/${productId}`);
    const data = await res.json();
    const price = data.price;
    return price;
  } catch (error) {
    toast.error(`Error fetching product price: ${error}`);
    return 0; 
  }
};

export const CartContext = createContext<CartContextType | null>(null);

export const CartContextProvider = ( props : CartContextProviderProps ) => {
  const [cartTotalQty, setCartTotalQty] = useState(0);
  const [cartTotalAmount, setCartTotalAmount] = useState(0);
  const [cartProducts, setCartProducts] = useState<CartItem[] | null>([]);
  const {user} = useAuth();

    useEffect(() => {
        const storedCart = localStorage.getItem("eShopCartProducts");
        const products: CartItem[] | null = storedCart ? JSON.parse(storedCart) : [];
        setCartProducts(products);
      }, []);

      useEffect(() => {
        if (cartProducts) {
          const { total, qty } = cartProducts.reduce(
            (acc, item) => {
              acc.total += item.price * item.quantity;
              acc.qty += item.quantity;
              return acc;
            },
            { total: 0, qty: 0 }
          );
          setCartTotalAmount(total);
          setCartTotalQty(qty);
        }
      }, [cartProducts]);

    const handleAddProductToCart = useCallback(async (productId: string) => {
      const price = await getProductPrice(productId);
        setCartProducts((prev) => {
          let updatedCart: CartItem[] = [];
          if (prev && prev.length > 0) {
            const existing = prev.find(item => item.id === productId);
            if (existing) {
              updatedCart = prev.map(item =>
                item.id === productId ? { ...item, quantity: item.quantity + 1 } : item
              );
            } else {
              updatedCart = [...prev, { id: productId, quantity: 1, price }];
            }
          } else {
            updatedCart = [{ id: productId, quantity: 1, price }];
          }
          localStorage.setItem("eShopCartProducts", JSON.stringify(updatedCart));
          return updatedCart;
        });
        setTimeout(() => {
          toast.success("Product added to cart.");
        }, 0);
      }, []);

    const handleRemoveProductFromCart = useCallback((productId: string) => {
        setCartProducts((prev) => {
          const updatedCart = (prev || []).filter(item => item.id !== productId);
          localStorage.setItem("eShopCartProducts", JSON.stringify(updatedCart));
          return updatedCart;
        });
        setTimeout(() => {
          toast.success("Product removed from cart", );
        }, 0);
      }, []);

    const handleCartQtyIncrease = useCallback((productId: string) => {
        setCartProducts(prev => {
          if (prev) {
            const updatedCart = prev.map(item => {
              if (item.id === productId) {
                if (item.quantity >= 99) {
                  return item;
                }
                return { ...item, quantity: item.quantity + 1 };
              }
              return item;
            });
            localStorage.setItem("eShopCartProducts", JSON.stringify(updatedCart));
            return updatedCart;
          }
          return prev;
        });
      }, []);

    const handleCartQtyDecrease = useCallback((productId: string) => {
        setCartProducts(prev => {
          if (prev) {
            const updatedCart = prev.map(item => {
              if (item.id === productId) {
                if (item.quantity <= 1) {
                  return item;
                }
                return { ...item, quantity: item.quantity - 1 };
              }
              return item;
            });
            localStorage.setItem("eShopCartProducts", JSON.stringify(updatedCart));
            return updatedCart;
          }
          return prev;
        });
      }, []);

    const handleClearCart = useCallback(() => {
        setCartProducts([]);
        setCartTotalQty(0);
        setCartTotalAmount(0);
        localStorage.setItem("eShopCartProducts", JSON.stringify([]));
        toast.success("Cart Empty");
      }, []);

      const handleCheckout = useCallback(async () => {
        try {

          if (!cartProducts || cartProducts.length === 0) {
            toast.error('Cart is empty. Add something to do checkout');
            return;
          }
          
          const totalAmount = cartProducts.reduce((total, product) => total + product.price * product.quantity, 0);
      
          const order = {
            userId: user?.userId || '',
            amount: totalAmount,
            status: 'complete',
            deliverStatus: 'pending',
          };
      
          const orderRes = await fetch(`${API_URL}/order`, {
            method: 'POST',
            credentials: 'include',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(order),
          });
          const createdOrder = await orderRes.json();
      
          const orderItemPromises = cartProducts.map((product) => {
            const orderItem = {
              orderId: createdOrder.id,
              productId: product.id,
              price: product.price,
              quantity: product.quantity,
            };
            return fetch(`${API_URL}/order-item`, {
              method: 'POST',
              credentials: 'include',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(orderItem),
            });
          });
      
          await Promise.all(orderItemPromises);
      
          toast.success('Thanks for using our site to buy.');
      
          handleClearCart();
        } catch (error) {
            console.error('Error:', error);
            toast.error(`Error during payment: ${error}`);
        }
      }, [cartProducts, user, handleClearCart]);

    const value: CartContextType = {
        cartTotalQty,
        cartTotalAmount,
        cartProducts,
        handleAddProductToCart,
        handleRemoveProductFromCart,
        handleCartQtyIncrease,
        handleCartQtyDecrease,
        handleClearCart,
        handleCheckout,
      };

    return (<CartContext.Provider value = { value } { ...props }/>)
}

export const useCart = () => {
    const context = useContext(CartContext);
    if (context === null) {
        throw new Error("useCart() must be used within useContextProvider");
    }
    return context;
}

