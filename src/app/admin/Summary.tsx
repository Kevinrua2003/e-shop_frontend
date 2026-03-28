'use client'

import SummaryTarget from "@/UI/admin/components/SummaryTarget";
import Heading from "@/UI/Headings/components/Heading";
import { Order, OrderItem, Product, User } from "@/UI/products/types/types";
import { formatPrice } from "@/utils/functions/formatPrice";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { motion } from "framer-motion";

const Summary = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [orders, setOrders] = useState<Order[]>([]);
    const [users, setUsers] = useState<User[]>([]);
    const [items, setItems] = useState<OrderItem[]>([]);
    const [ammountStored, setAmmountStored] = useState<number>(0);
    const [ammountSold, setAmmountSold] = useState<number>(0);

    useEffect(() => {
        async function fetchData() {
            try {
                const [productRes, orderRes, userRes, itemRes] = await Promise.all([
                    fetch(`${process.env.NEXT_PUBLIC_API_URL}/product`).then(res => res.json()),
                    fetch(`${process.env.NEXT_PUBLIC_API_URL}/order`).then(res => res.json()),
                    fetch(`${process.env.NEXT_PUBLIC_API_URL}/user`).then(res => res.json()),
                    fetch(`${process.env.NEXT_PUBLIC_API_URL}/order-item`).then(res => res.json()),
                ]);

                setProducts(productRes);
                setOrders(orderRes);
                setUsers(userRes);
                setItems(itemRes);

                const stored = productRes.reduce((acc: number, prod: Product) => prod.inStock ? acc + prod.price : acc, 0);
                setAmmountStored(stored);

                let sold = 0;
                orderRes.forEach((order: Order) => {
                    if (order.status === "complete") {
                        itemRes.forEach((it: OrderItem) => {
                            if (it.orderId === order.id) {
                                sold += it.price * it.quantity;
                            }
                        });
                    }
                });
                setAmmountSold(sold);

            } catch (error) {
                toast.error(`Error fetching data`);
            }
        }
        fetchData();
    }, []);

    return (
        <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="
                max-w-[1150px] m-auto p-6 mt-8
                bg-[hsl(var(--surface-elevated))]
                border border-[hsl(var(--border-subtle))]
                rounded-[var(--radius-lg)]
                shadow-[var(--shadow-md)]
            "
        >
            <div className="mb-6 text-center">
                <Heading title="Dashboard Overview" center/>
                <p className="text-sm text-[hsl(var(--text-muted))] mt-1">
                    A quick glance at key business metrics
                </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                <SummaryTarget label={"Total Products"} value={products.length.toString()} />
                <SummaryTarget label={"Amount in Store"} value={formatPrice(ammountStored)} />
                <SummaryTarget label={"Products Sold"} value={items.length.toString()} />
                <SummaryTarget label={"Amount Sold"} value={formatPrice(ammountSold)} />
                <SummaryTarget label={"Total Orders"} value={orders.length.toString()} />
                <SummaryTarget label={"Total Users"} value={users.length ? users.length.toString() : '0'} />
            </div>
        </motion.div>
    );
}

export default Summary;
