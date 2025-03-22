import React from 'react';

export type ProductsFilterType = {
    category: string;
    handleSetCategory: (category: string) => void;
  };

export interface ProductsFilterProviderProps {
    [propName : string] : React.ReactNode
}