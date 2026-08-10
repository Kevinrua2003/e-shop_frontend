'use client'
import Heading from '@/UI/Headings/components/Heading';
import { API_URL } from '@/utils/api';
import NullData from '@/UI/messages/components/NullData';
import { Order, OrderItem, Product } from '@/UI/products/types/types';
import { useParams, useRouter } from 'next/navigation';
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import toast from 'react-hot-toast';
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import ActionButton from '@/UI/products/components/ActionButton';
import { MdAccessTimeFilled, MdDelete, MdDone } from 'react-icons/md';
import { formatPrice } from '@/utils/functions/formatPrice';
import Status from '@/UI/products/components/Status';
import Swal from 'sweetalert2';
import Image from 'next/image';
import { resolveProductImage } from '@/utils/images';
import { OrderItemRow } from '@/app/admin/edit-order/[orderId]/EditOrderPage';

interface OrderRow {
  id: string;
  amount: string;
  paymentStatus: string;
  date: string;
  deliverStatus: string;
}

function Page() {
  const router = useRouter();
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
      fetch(`${API_URL}/order/byUser/${userId}`, { credentials: 'include' }).then(response => response.json()).then(data => {
        setUserOrders(data);
        // Los items vienen incluidos en cada orden (evita /order-item, que es solo admin).
        setOrderItems(data.flatMap((order: Order) => order.orderItems ?? []));
      }).catch(() => {
        toast.error("Error during fetch");
      });
    }, [userId]);

    useEffect(() => {
      fetch(`${API_URL}/product`)
        .then(response => response.json())
        .then(data => setProducts(data))
        .catch(() => toast.error("Error loading order items"));
    }, []);

  // Lookups O(1) para renderizar los items y productos de cada orden.
  const productsById = useMemo(() => new Map(products.map((p) => [p.id, p])), [products]);
  const itemsByOrderId = useMemo(() => {
    const map = new Map<string, OrderItemRow[]>();
    for (const item of orderItems) {
      const list = map.get(item.orderId) ?? [];
      list.push({
        id: item.id,
        orderId: item.orderId,
        productId: item.productId,
        quantity: item.quantity,
        price: item.price,
      });
      map.set(item.orderId, list);
    }
    return map;
  }, [orderItems]);

  const handleDelete = useCallback((id: string) => {
      fetch(`${API_URL}/order/${id}`, { method: 'DELETE', credentials: 'include' })
        .then(() => {
          toast.success("Order deleted successfully");
          router.refresh();
        })
        .catch((err) => {
          toast.error(`Error deleting order: ${err}`);
        });
    }, [router]);

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
      { field: 'products', headerName: "Products overview", width: 500, align: "center", headerAlign: "center" , resizable: false,      renderCell: (params) => {
        // Agrupar productos únicos y sumar cantidades
        const uniqueProducts = (itemsByOrderId.get(params.row.id) ?? [])
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
                const product = productsById.get(item.productId);
                
                return (
                  <div 
                    key={item.productId} 
                    className={`shrink-0 ${index >= 3 ? 'ml-2' : ''}`}
                  >
                    <div className="flex flex-col items-center w-[70px]">
                      <div className="relative w-10 h-10">
                        <Image
                          src={resolveProductImage(product?.image)}
                          alt={product?.name ?? 'product'}
                          fill
                          className="object-cover rounded-md border"
                          sizes="40px"
                          onError={(e) => {
                            (e.target as HTMLImageElement).style.display = 'none';
                          }}
                        />
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