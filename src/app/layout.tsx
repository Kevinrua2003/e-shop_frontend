import type {Metadata} from "next";
import "./globals.css";
import {Poppins} from "next/font/google";
import NavBar from "@/UI/navBar/components/NavBar";
import Footer from "@/UI/footer/components/Footer";
import CartProvider from "@/providers/cart/components/CartProvider";
import {Toaster} from 'react-hot-toast'
import { AuthProvider } from "./auth/context/AuthContext";
import { ProductsFilterProvider } from "@/hooks/products/useProductsFilter";
import { ThemeProvider } from "@/providers/theme/components/ThemeProvider";

const poppins = Poppins({ 
    subsets: ["latin"], 
    weight: ['400', '500', '600', '700'],
    variable: '--font-poppins',
    display: 'swap',
})

export const metadata : Metadata = {
    title: "E-Shop",
    description: "Your premium e-commerce destination",
};

export default function RootLayout ( {
                                         children,
                                     } : Readonly<{
    children : React.ReactNode;
}> ) {

    return (
      <html lang="en" suppressHydrationWarning>
        <body className={`
            ${poppins.variable}
            antialiased
            text-[hsl(var(--text-primary))]
            bg-[hsl(var(--background))]
        `}>
        <ThemeProvider>
            <Toaster toastOptions = { {
                style: {
                    background: "hsl(var(--surface-elevated))",
                    color: "hsl(var(--text-primary))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "var(--radius-md)",
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
        </ThemeProvider>
        </body>
      </html>
    );
}
