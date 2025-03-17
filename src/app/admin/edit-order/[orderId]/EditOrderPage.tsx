'use client'

import { OrderItem } from '@/UI/products/types/types';
import axios from 'axios';
import { useParams, useRouter } from 'next/navigation'
import React, { useCallback, useEffect, useState } from 'react'
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import Heading from '@/UI/Headings/components/Heading';
import ActionButton from '@/UI/products/components/ActionButton';
import { MdDelete, MdRemoveRedEye } from 'react-icons/md';
import toast from 'react-hot-toast';

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
    const router = useRouter();

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

    const handleDelete = useCallback((id: string) => {
            axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/order-item/${id}`)
              .then(() => {
                toast.success("Item deleted successfully");
                window.location.reload();
              })
              .catch((err) => {
                toast.error(`Error deleting item: ${err}`);
              });
          }, []);
    
    const columns: GridColDef[] = [
        { field: 'id', headerName: 'ID', flex: 1 , align: 'center', headerAlign: 'center'},
        { field: 'orderId', headerName: 'Order ID', flex: 1 , align: 'center',headerAlign: 'center'},
        { field: 'productId', headerName: 'Product ID', flex: 1 , align: 'center', headerAlign: 'center'},
        { field: 'quantity', headerName: 'Quantity', flex: 0 , align: 'center', headerAlign: 'center'},
        { field: 'price', headerName: 'Price', flex: 0 , align: 'center', headerAlign: 'center'},
        { field: 'action', headerName: 'Actions', flex: 1, align: 'center', headerAlign: 'center', renderCell: params => {
            return (
                <div className="flex w-full justify-center items-center text-center gap-1 m-2">
                     <ActionButton icon={MdDelete} onClick={() => {handleDelete(params.row.id)}}/>
                     <ActionButton icon={MdRemoveRedEye} onClick={() => {router.push(`/admin/item-view/${params.row.productId}`)}}/>
                </div>
            )
        }}
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