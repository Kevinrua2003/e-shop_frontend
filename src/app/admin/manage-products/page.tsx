'use client'
import Container from "@/UI/container/components/Container";
import ManageProductsClient from "@/app/admin/manage-products/ManageProductsClient";
import { useEffect, useState } from "react";
import { Product } from "@/UI/products/types/types";
import axios from "axios";

const ManageProducts = () => {

    const [prods, setProds] = useState<Product[]>([]);

    useEffect(() => {
        axios.get(`${process.env.NEXT_PUBLIC_API_URL}/product`)
            .then(response => setProds(response.data))
            .catch(err => console.log(err))
    }, []);

    return (
        <div className={"pt-8"}>
            <Container>
                <ManageProductsClient products={prods}/>
            </Container>
        </div>
    );
};

export default ManageProducts;