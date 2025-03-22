import {IconType} from "react-icons";

export interface AdminNavItemProps {
    selected?: boolean;
    icon: IconType;
    label: string;
}

export interface CategoryNavItemProps {
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