'use client';

import {ManageProductsClientProps, Product} from "@/UI/products/types/types";
import {DataGrid, GridColDef} from "@mui/x-data-grid"
// import {formatPrice} from "@/utils/functions/formatPrice";
import Heading from "@/UI/Headings/components/Heading";
import { MdCached, MdClose, MdDelete, MdDone, MdRemoveRedEye } from "react-icons/md";
import Status from "@/UI/products/components/Status";
import ActionButton from "@/UI/products/components/ActionButton";
import toast from "react-hot-toast";
import { useCallback } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";



const ManageProductsClient: React.FC<ManageProductsClientProps> = ({products}) => {

    const router = useRouter();
    let rows: Product[] = [];

    if(products){
        rows = products.map(product => {
            return product;
        })
    }

    const handleChangeStock = useCallback((id: string) => {
        axios.get(`${process.env.NEXT_PUBLIC_API_URL}/product/${id}`)
          .then(response => {
            const product = response.data;
            product.inStock = !product.inStock;
            if (product) {
              axios.patch(`${process.env.NEXT_PUBLIC_API_URL}/product/${id}`, product)
                .then(() => {
                  toast.success("Product updated successfully");
                  window.location.reload();
                })
                .catch((err) => {
                  toast.error(`Error updating status: ${err}`);
                });
            }
          })
          .catch((err) => {
            toast.error(`Error fetching product: ${err}`);
          });          
      }, []);

    const handleDelete = useCallback((id: string) => {
        axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/product/${id}`)
          .then(() => {
            toast.success("Product deleted successfully");
            window.location.reload();
          })
          .catch((err) => {
            toast.error(`Error deleting product: ${err}`);
          });
      }, []);
      

    const columns: GridColDef[] = [
        {field: 'id' , headerName: "ID", width: 200, align: "center", headerAlign: "center"},
        {field: 'name', headerName: "Name", width: 200, align: "center", headerAlign: "center"},
        {field: 'price', headerName: "Price(USD)", width: 200, align: "center", headerAlign: "center" ,renderCell: params => {
            return (
                <div className={"font-bold text-slate-800"}>{params.row.price}</div>
            );
            }},
        {field: 'category', headerName: "Category", width: 100, align: "center", headerAlign: "center"},
        {field: 'brand', headerName: "Brand", width: 100, align: "center", headerAlign: "center"},
        {field: 'inStock', headerName: "In Stock", width: 120, align: "center", headerAlign: "center" ,renderCell: params => {
            return (
                <div>
                    {params.row.inStock === true ? 
                    <Status 
                    text="in stock"
                    icon={MdDone}
                    bg="bg-teal-200"
                    color="text-teal-700"    
                    /> : 
                    <Status 
                    text="out of stock"
                    icon={MdClose}
                    bg="bg-rose-200"
                    color="text-rose-700"    
                    />
                    }
                </div>
            );
            }},
        {field: 'actions', headerName: "Actions", width: 180, align: "center", headerAlign: "center" ,renderCell: (params) => {
            return (
                <div className="flex w-full justify-between gap-4">
                    <ActionButton icon={MdCached} onClick={() => {handleChangeStock(params.row.id)}}/>
                    <ActionButton icon={MdDelete} onClick={() => {handleDelete(params.row.id)}}/>
                    <ActionButton icon={MdRemoveRedEye} onClick={() => {router.push(`/product/${params.row.id}`)}}/>
                </div>
            );
            }
        },

    ];

    return (
        <div className={"max-w-[1150px] m-auto text-xl"}>
            <div className={"mb-4 mt-8"}>
                <Heading title={"Manage Products"} center/>
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