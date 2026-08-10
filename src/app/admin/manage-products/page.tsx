'use client'
import Container from "@/UI/container/components/Container";
import { API_URL } from "@/utils/api";
import ManageProductsClient from "@/app/admin/manage-products/ManageProductsClient";
import { useEffect, useState } from "react";
import { Product } from "@/UI/products/types/types";

const ManageProducts = () => {

    const [prods, setProds] = useState<Product[]>([]);

    useEffect(() => {
        fetch(`${API_URL}/product`)
            .then(response => response.json())
            .then(data => setProds(data))
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