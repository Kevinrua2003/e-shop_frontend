'use client'

import SummaryTarget from "@/UI/admin/components/SummaryTarget";
// import { SummaryProps } from "@/UI/admin/types/types";
import Heading from "@/UI/Headings/components/Heading";
import { Order, OrderItem, Product, User } from "@/UI/products/types/types";
import { formatPrice } from "@/utils/functions/formatPrice";
import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const Summary = () => {

    const [products, setProducts] = useState<Product[]>([])
    const [orders, setOrders] = useState<Order[]>([])
    const [users, setUsers] = useState<User[]>([])
    const [items, setItems] = useState<OrderItem[]>([])
    const [ammountStored, setAmmountStored] = useState<number>(0)
    const [ammountSold, setAmmountSold] = useState<number>(0)
    


    useEffect(() => {
        async function fetchData(){
            try {
                await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/product`).then(response => {
                    setProducts(response.data);
                }).catch(err => {
                    console.log(err);                
                });
                await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/order`).then(response => {
                    setOrders(response.data);
                }).catch(err => {
                    console.log(err);                
                });
                await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/user`).then(response => {
                    setUsers(response.data);
                }).catch(err => {
                    console.log(err);                
                });
                await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/order-item`).then(response => {
                    setItems(response.data);
                }).catch(err => {
                    console.log(err);                
                });

                let stored = 0;
                products.forEach((prod) => {
                    if(prod.inStock) stored += prod.price
                })
                setAmmountStored(stored);

                let sold = 0;
                orders.forEach((order) => {
                    if(order.status === "complete"){
                        items.forEach((it) => {
                            if(it.orderId === order.id){
                                sold += it.price * it.quantity
                            }
                        })
                    }
                })
                setAmmountSold(sold);

            } catch (error) {
                console.log(error);
                toast.error(`Error fetching data: ${error}`)
            }


        }
        fetchData();
    })

    return (
        <div className="max-w-[1150px m-auto]">
            <div className="mb-4 mt-8"> <Heading title="Stats" center/> </div>
            <div className="grid grid-cols-2 gap-3 max-h-50vh overflow-y-auto">
                <SummaryTarget label={"Total Products"} value={new String(products.length).trim()}/>
                <SummaryTarget label={"Ammount in Store"} value={formatPrice(ammountStored)}/>
                <SummaryTarget label={"Products Sold"} value={new String(items.length).trim()}/>
                <SummaryTarget label={"Ammount Sold"} value={formatPrice(ammountSold)}/>
                <SummaryTarget label={"Total Orders"} value={new String(orders.length).trim()}/>
                <SummaryTarget label={"Total Users"} value={new String(users.length).trim()}/>
            </div>
        </div>
    )
}

export default Summary;