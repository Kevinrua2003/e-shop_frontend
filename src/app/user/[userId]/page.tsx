'use client'
import Heading from '@/UI/Headings/components/Heading';
import NullData from '@/UI/messages/components/NullData';
import { Order, OrderItem, Product } from '@/UI/products/types/types';
import axios from 'axios';
import { useParams } from 'next/navigation';
import React, { useCallback, useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import ActionButton from '@/UI/products/components/ActionButton';
import { MdAccessTimeFilled, MdDelete, MdDone } from 'react-icons/md';
import { formatPrice } from '@/utils/functions/formatPrice';
import Status from '@/UI/products/components/Status';
import Swal from 'sweetalert2';
import Image from 'next/image';
import { OrderItemRow } from '@/app/admin/edit-order/[orderId]/EditOrderPage';

interface OrderRow {
  id: string;
  amount: string;
  paymentStatus: string;
  date: string;
  deliverStatus: string;
}

function Page() {
  const {userId} = useParams();
  const [userOrders, setUserOrders] = useState<Order[] | null>(null);
  const [orderItems, setOrderItems] = useState<OrderItem[]>([]);
  const [products, setProducts] = useState<Product[]>([]);

  let rows: OrderRow[] = [];
    
        if (userOrders) {
            rows = userOrders.map(order => {
                return {
                    id: order.id,
                    amount: formatPrice(order.amount),
                    paymentStatus: order.status,
                    date: order.createDate.toString(),
                    deliverStatus: order.deliverStatus,
                };
            });
        }

    useEffect(() => {
      axios.get(`${process.env.NEXT_PUBLIC_API_URL}/order/byUser/${userId}`).then((response) => {
        setUserOrders(response.data);
      }).catch(() => {
        toast.error("Error during fetch");
      });
    }, [userId]);

    useEffect(() => {
      axios.get(`${process.env.NEXT_PUBLIC_API_URL}/order-item`)
        .then(response => setOrderItems(response.data))
        .catch(() => toast.error("Error loading order items"));
    }, []);

    useEffect(() => {
      axios.get(`${process.env.NEXT_PUBLIC_API_URL}/product`)
        .then(response => setProducts(response.data))
        .catch(() => toast.error("Error loading order items"));
    }, []);

  const handleDelete = useCallback((id: string) => {
      axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/order/${id}`)
        .then(() => {
          toast.success("Order deleted successfully");
          window.location.reload();
        })
        .catch((err) => {
          toast.error(`Error deleting order: ${err}`);
        });
    }, []);

    if(userOrders?.length === 0) return (<NullData title={'You have no orders in the store'}/>);

    const columns: GridColDef[] = [
      { field: "amount", headerName: "Amount(USD)", width: 200, align: "center", headerAlign: "center", resizable: false, renderCell: params => (
          <div className="font-bold text-slate-800">{params.row.amount}</div>
      )},
      { field: "paymentStatus", headerName: "Payment Status", width: 100, align: "center", headerAlign: "center", resizable: false, renderCell: params => {
          return (
              <div>
                  {params.row.paymentStatus === 'pending' ? (
                      <Status
                      text="pending"
                      icon={MdAccessTimeFilled}
                      bg="bg-slate-200"
                      color="text-slate-700"
                      />
                  ) : params.row.paymentStatus === 'complete' ? (
                      <Status
                      text="complete"
                      icon={MdDone}
                      bg="bg-green-200"
                      color="text-green-700"
                      />
                  ) : <></>}
              </div>
          );
      }},
      { field: 'deliveryStatus', headerName: "Delivery Status", width: 120, align: "center", headerAlign: "center" , resizable: false, renderCell: params => {
          return (
              <div>
                  {params.row.deliverStatus === 'pending' ? 
                  <Status 
                  text="pending"
                  icon={MdAccessTimeFilled}
                  bg="bg-slate-200"
                  color="text-slate-700"    
                  /> : params.row.deliverStatus === 'delivered' ?
                  <Status 
                  text="delivered"
                  icon={MdDone}
                  bg="bg-green-200"
                  color="text-green-700"    
                  /> : <></>
                  }
              </div>
          );
      }},
      { field: 'actions', headerName: "Cancel order", width: 180, align: "center", headerAlign: "center" , resizable: false, renderCell: (params) => {
          return (
              <div className="flex w-full justify-center items-center text-center gap-1 m-2">                  
                  <ActionButton icon={MdDelete} onClick={() => {
                      Swal.fire({
                              title: "Do you want to cancel this order?",
                              showDenyButton: true,
                              showCancelButton: false,
                              confirmButtonText: "Delete",
                              denyButtonText: "Don't Delete it",
                              cancelButtonText: "Cancel",
                          }).then((result) => {
                                  if(result.isConfirmed){
                                     handleDelete(params.row.id)
                                  }
                            })
                      }}/>
              </div>
          );
      }},
      { field: 'products', headerName: "Products overview", width: 500, align: "center", headerAlign: "center" , resizable: false, renderCell: (params) => {
        // Agrupar productos únicos y sumar cantidades
        const uniqueProducts = orderItems
          .filter(item => item.orderId === params.row.id)
          .reduce((acc, item) => {
            const existing = acc.find(p => p.productId === item.productId);
            if (existing) {
              existing.quantity += item.quantity;
            } else {
              acc.push({
                ...item,
                quantity: item.quantity
              });
            }
            return acc;
          }, [] as OrderItemRow[]);
    
        return (
          <div className="relative w-full group">
            <div className={`flex gap-3 ${
              uniqueProducts.length > 3 ? 
              'overflow-x-auto pb-3 scrollbar-thin scrollbar-thumb-gray-200 scrollbar-track-gray-50' : 
              'flex-wrap'
            }`}>
              {uniqueProducts.map((item, index) => {
                const product = products.find(p => p.id === item.productId);
                
                return (
                  <div 
                    key={item.productId} 
                    className={`shrink-0 ${index >= 3 ? 'ml-2' : ''}`}
                  >
                    <div className="flex flex-col items-center w-[70px]">
                      <div className="relative w-10 h-10">
                        {product?.image ? (
                          <Image
                            src={product.image}
                            alt={product.name}
                            fill
                            className="object-cover rounded-md border"
                            sizes="40px"
                            onError={(e) => {
                              (e.target as HTMLImageElement).style.display = 'none';
                            }}
                          />
                        ) : (
                          <div className="w-full h-full bg-gray-100 rounded-md border flex items-center justify-center">
                            <span className="text-xs text-gray-400">N/A</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
    
            {uniqueProducts.length > 3 && (
              <>
                <div className="absolute right-0 top-0 bg-gradient-to-l from-white via-white to-transparent w-8 h-full pointer-events-none" />
                <div className="absolute left-0 top-0 bg-gradient-to-r from-white via-white to-transparent w-8 h-full pointer-events-none" />
              </>
            )}
          </div>
        );
      }},
  ];

    return (
      <div className={"max-w-[1150px] m-auto text-xl"}>
          <div className={"mb-4 mt-8"}>
              <Heading title={"Manage Orders"} center/>
          </div>
          <DataGrid                                       
              rows={rows}
              columns={columns}
              getRowId={(row) => row.id}
              initialState={{ pagination: { paginationModel: {page: 0, pageSize: 5 } } }}
              pageSizeOptions={[5, 10, 15]}
              checkboxSelection
              disableRowSelectionOnClick
              sx={{ border: 0 }}
          />
      </div>
  );
}

export default Page;