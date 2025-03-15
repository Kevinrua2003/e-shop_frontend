import React from 'react';
import { Product } from '@/UI/products/types/types';
import Image from 'next/image';

const ProductImage = (cartProduct: Product) => {                                                   
  return (
    <div className="grid grid-cols-6 gap-2 h-full max-h-[500px] min-h-[400px]">            
      <div className="col-span-5 relative aspect-square">
        {cartProduct.image ? (
          <Image 
            src={cartProduct.image} 
            fill 
            alt={cartProduct.name}
            className="w-full h-full object-contain max-h-[500px] min-h-[300px] sm:min-h-[400px]"
          />
        ) : null}
      </div>
    </div>
  );
}

export default ProductImage;
