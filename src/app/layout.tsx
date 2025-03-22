import type {Metadata} from "next";
import "./globals.css";
import {Poppins} from "next/font/google";
import NavBar from "@/UI/navBar/components/NavBar";
import Footer from "@/UI/footer/components/Footer";
import CartProvider from "@/providers/cart/components/CartProvider";
import {Toaster} from 'react-hot-toast'
import { AuthProvider } from "./auth/context/AuthContext";
import { ProductsFilterProvider } from "@/hooks/products/useProductsFilter";

const poppins = Poppins({ subsets: ["latin"], weight: ['400', '700'] })

export const metadata : Metadata = {
    title: "E-shop",
    description: "E-commerce application",
};

export default function RootLayout ( {
                                         children,
                                     } : Readonly<{
    children : React.ReactNode;
}> ) {

    return (
      <html lang="en" className={poppins.className}>
        <body className="antialiased text-slate-700">
        <Toaster toastOptions = { {
            style: {
                background: "rgb(51 65 85)",
                color: "#fff"
            }
        } }/>
        <AuthProvider>
          <CartProvider>
            <ProductsFilterProvider>
              <div className="flex flex-col min-h-screen">
                <NavBar />
                <main className="flex-grow">{children}</main>
                <Footer />
              </div>
            </ProductsFilterProvider>
          </CartProvider>
        </AuthProvider>
        </body>
        </html>
    );
}
