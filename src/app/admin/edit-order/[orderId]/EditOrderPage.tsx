'use client'

import { OrderItem } from '@/UI/products/types/types';
import axios from 'axios';
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import Heading from '@/UI/Headings/components/Heading';

interface OrderItemRow {
    id: string;
    orderId: string;
    productId: string;
    quantity: number;
    price: number;
}

function EditOrderPage() {

    const { orderId } = useParams();
    const [rows, setRows] = useState<OrderItemRow[]>([]);

    useEffect(() => {
        axios.get(`${process.env.NEXT_PUBLIC_API_URL}/order-item`).then(response => {
            setRows(response.data
                .filter((item: OrderItem) => item.orderId === orderId)
                .map((item: OrderItem) => ({
                    id: item.id,
                    orderId: item.orderId,
                    productId: item.productId,
                    quantity: item.quantity,
                    price: item.price,
                }))
            );
        });
    }, [orderId]);
    
    const columns: GridColDef[] = [
        { field: 'id', headerName: 'ID', flex: 1 },
        { field: 'orderId', headerName: 'Order ID', flex: 1 },
        { field: 'productId', headerName: 'Product ID', flex: 1 },
        { field: 'quantity', headerName: 'Quantity', flex: 0 },
        { field: 'price', headerName: 'Price', flex: 0 },
    ];

  return (
    <div>
        <div className={"max-w-[1150px] m-auto text-xl"}>
            <div className={"mb-4 mt-8"}>
                <Heading title={"Items Available"} center/>
            </div>
            <DataGrid 
              rows={rows}
              columns={columns}
              getRowId={(row) => row.id}
              initialState={{ pagination: { paginationModel: { page: 0, pageSize: 5 } } }}
              pageSizeOptions={[5, 10, 15]}
              sx={{ border: 0 }}
            />
        </div>
    </div>
  )
}

export default EditOrderPage