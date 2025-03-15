// import { DateTime } from "next-auth/providers/kakao";
import { IconType } from "react-icons";

export interface Product{
    id : string,
    name : string,
    description : string,
    price : number,
    brand : string,
    category : string,
    inStock : boolean,
    image : string,
}

export interface Order{
    id: string,
    userId: string,
    amount: number,
    status: string,
    deliverStatus: string,
    createDate: Date,
}

export interface OrderItem{
    id: string,
    orderId: string,
    productId: string,
    quantity: number,
    price: number,
}

export interface User{
    id : string, 
  name? : string,
  email : string, 
  hashedPassword : string,
  role : Role,
}
 export enum Role{
    ADMIN,USER
 }

// export interface ProductCardProps {
//     data : {
//         id : string
//         name : string
//         description : string
//         price : number
//         brand : string
//         category : string
//         inStock : boolean
//         image : string
//     }
// }

export interface ManageProductsClientProps {
    products: Product[];
}

export interface ManageOrdersClientProps {
    orders: Order[];
}

export type CartProductType = {
    id : string,
    name : string,
    description : string,
    category : string,
    brand : string,
    image : string,
    quantity : number,
    price : number,
}

export type CartItem = {
    id: string;
    quantity: number;
    price: number;
  };

export interface SetColorProps {
    image : string,
    cartProduct : CartProductType,
}

export interface SetQuantityProps {
    cartCounter? : boolean,
    cartProduct : CartProductType,
    handleQuantityIncrease : () => void,
    handleQuantityDecrease : () => void,
}

export interface StatusProps{
    text: string,
    icon: IconType,
    bg: string,
    color: string
}

export interface ProductImageProps {
    cartProduct : CartProductType,
}

// export interface ListRatingProps {
//     product : ProductCardProps
// }