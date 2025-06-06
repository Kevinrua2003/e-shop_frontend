'use client';

import React, { useCallback, useEffect, useState } from "react";
import { ManageOrdersClientProps, User } from "@/UI/products/types/types";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { formatPrice } from "@/utils/functions/formatPrice";
import Heading from "@/UI/Headings/components/Heading";
import { MdAccessTimeFilled, MdCached, MdDelete, MdDone, MdRemoveRedEye } from "react-icons/md";
import ActionButton from "@/UI/products/components/ActionButton";
import Status from "@/UI/products/components/Status";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";

interface OrderRow {
    id: string;
    customer: string;
    amount: string;
    paymentStatus: string;
    date: string;
    deliverStatus: string;
}

const ManageProductsClient: React.FC<ManageOrdersClientProps> = ({ orders }) => {

    const router = useRouter();
    const [users, setUsers] = useState<User[]>([]);
    let rows: OrderRow[] = [];

    useEffect(() => {
        axios.get(`${process.env.NEXT_PUBLIC_API_URL}/user`)
            .then(response => setUsers(response.data))
            .catch(err => console.log(err))
    }, []);

    if (orders) {
        rows = orders.map(order => {
            return {
                id: order.id,
                customer: users.find(x => x.id === order.userId)?.name || "?",
                amount: formatPrice(order.amount),
                paymentStatus: order.status,
                date: order.createDate.toString(),
                deliverStatus: order.deliverStatus,
            };
        });
    }

    const handleChangeStatus = useCallback((id: string) => {
        axios.get(`${process.env.NEXT_PUBLIC_API_URL}/order/${id}`)
          .then(response => {
            const order = {
                userId: response.data.userId,
                amount: response.data.amount,
                status: response.data.status,
                deliverStatus: response.data.deliverStatus === 'pending' ? 'delivered' : 'pending',
            };

            if (order) {
              axios.patch(`${process.env.NEXT_PUBLIC_API_URL}/order/${id}`, order)
                .then(() => {
                  toast.success("Order deliver status updated successfully");
                  window.location.reload();
                })
                .catch((err) => {
                  toast.error(`Error updating deliver status: ${err}`);
                });
            }
          })
          .catch((err) => {
            toast.error(`Error fetching order: ${err}`);
          });          
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

    const columns: GridColDef[] = [
        { field: "id", headerName: "ID", width: 200, align: "center", headerAlign: "center" },
        { field: "customer", headerName: "Customer", width: 200, align: "center", headerAlign: "center" },
        { field: "amount", headerName: "Amount(USD)", width: 200, align: "center", headerAlign: "center", renderCell: params => (
            <div className="font-bold text-slate-800">{params.row.amount}</div>
        )},
        { field: "paymentStatus", headerName: "Payment Status", width: 100, align: "center", headerAlign: "center", renderCell: params => {
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
        { field: 'deliveryStatus', headerName: "Delivery Status", width: 120, align: "center", headerAlign: "center" ,renderCell: params => {
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
        { field: 'actions', headerName: "Actions", width: 180, align: "center", headerAlign: "center" ,renderCell: (params) => {
            return (
                <div className="flex w-full justify-center items-center text-center gap-1 m-2">
                    <ActionButton icon={MdCached} onClick={() => {handleChangeStatus(params.row.id)}}/>
                    <ActionButton icon={MdDelete} onClick={() => {
                        Swal.fire({
                                title: "Do you want to delete this order?",
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
                    <ActionButton icon={MdRemoveRedEye} onClick={() => {router.push(`/admin/edit-order/${params.row.id}`)}}/>
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
};

export default ManageProductsClient;