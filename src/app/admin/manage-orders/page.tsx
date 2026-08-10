"use client"
import Container from "@/UI/container/components/Container";
import { API_URL } from "@/utils/api";
import { Order } from "@/UI/products/types/types";
import ManageOrdersClient from "@/app/admin/manage-orders/ManageOrdersClient";
import { useEffect, useState } from "react";


const ManageProducts = () => {

    const [orders, setOrders] = useState<Order[]>([]);
    
        useEffect(() => {
            fetch(`${API_URL}/order`, { credentials: 'include' })
                .then(response => response.json())
                .then(data => setOrders(data))
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