"use client"
import Container from "@/UI/container/components/Container";
import { Order } from "@/UI/products/types/types";
import ManageOrdersClient from "@/app/admin/manage-orders/ManageOrdersClient";
import axios from "axios";
import { useEffect, useState } from "react";


const ManageProducts = () => {

    const [orders, setOrders] = useState<Order[]>([]);
    
        useEffect(() => {
            axios.get(`${process.env.NEXT_PUBLIC_API_URL}/order`)
                .then(response => setOrders(response.data))
                .catch(err => console.log(err))
        }, []);

    return (
        <div className={"pt-8"}>
            <Container>
                <ManageOrdersClient orders={orders}/>
            </Container>
        </div>
    );
};

export default ManageProducts;