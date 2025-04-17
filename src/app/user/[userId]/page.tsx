'use client'
import { Order } from '@/UI/products/types/types';
import axios from 'axios';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';

function Page() {

    const {userId} = useParams();
    const [userOrders, setUserOrders] = useState<Order[] | null>(null);

    useEffect(() => {
      axios.get(`${process.env.NEXT_PUBLIC_API_URL}/order/byUser/${userId}`).then((response) => {
        setUserOrders(response.data);
      }).catch(() => {
        toast.error("Error during fetch");
      });
    }, [userId])

  return (
    <div>
      <ul>
        {userOrders?.map((order) => 
          <li key={order.id}>
              {order.id}
              {order.amount}
          </li>
        )}
      </ul>
    </div>
  )
}

export default Page;