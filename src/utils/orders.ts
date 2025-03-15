import { Order } from "@/UI/products/types/types";


export const orders: Order[] = [
    {
        id: "o1",
        userId: "u1",
        amount: 80,
        status: "pending",
        deliverStatus: "pending",
        createDate: new Date(),
    },
    {
        id: "o2",
        userId: "u2",
        amount: 80,
        status: "pending",
        deliverStatus: "pending",
        createDate: new Date(),
    },
] 