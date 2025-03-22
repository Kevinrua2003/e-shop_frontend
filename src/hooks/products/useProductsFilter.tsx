'use client'

import React, {createContext, useContext, useEffect, useState} from "react";
import toast from "react-hot-toast";
import { ProductsFilterProviderProps, ProductsFilterType } from "./types/types";

export const ProductsFilterContext = createContext<ProductsFilterType | null>(null);

export const ProductsFilterProvider = ( props : ProductsFilterProviderProps ) => {
  const [category, setCategory] = useState<string>("All");

    useEffect(() => {
        const storedCategory = localStorage.getItem("ProductsCategory");
        const cat: string = storedCategory ? JSON.parse(storedCategory) : "All";
        setCategory(cat);
      }, []);

    const handleSetCategory = async (cat: string) => {
        setCategory(() => {
            const updatedCategory: string = cat;          
            localStorage.setItem("ProductsCategory", JSON.stringify(updatedCategory));
            return updatedCategory;
          });
          setTimeout(() => {
            toast.success(`Products filtered by ${cat}`);
          }, 0);
      };

    const value: ProductsFilterType = {
        category,
        handleSetCategory,
      };

    return (<ProductsFilterContext.Provider value = { value } { ...props }/>)
}

export const useProductsFilter = () => {
    const context = useContext(ProductsFilterContext);
    if (context === null) {
        throw new Error("useProductsFilter() must be used within useProductsFilterProvider");
    }
    return context;
}

