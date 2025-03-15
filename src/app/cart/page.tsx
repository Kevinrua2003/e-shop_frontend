import React from 'react'
import Container from "@/UI/container/components/Container";
import CartClient from "@/UI/cart/componenets/CartClient"

const CartPage = () => {
    return (
        <div className = { "pt-8" }>
            <Container>
                <CartClient/>
            </Container>
        </div>

    )
}
export default CartPage
