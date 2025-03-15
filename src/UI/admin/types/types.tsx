import { Order, Product, User } from "@/UI/products/types/types";
import {IconType} from "react-icons";

export interface AdminNavItemProps {
    selected?: boolean;
    icon: IconType;
    label: string;
}

// export interface SummaryProps{
//     orders: Order[],
//     products: Product[],
//     users: User[],
// }

export interface SummaryTargetProps{
    label: string,
    value: string,
}