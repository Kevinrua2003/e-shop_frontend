import React from 'react'
import Container from "@/UI/container/components/Container";
import FormContainer from "@/UI/auth/containers/FormContainer";
import LoginForm from "@/UI/auth/components/LoginForm";

const LoginPage = () => {
    return (
        <Container>
            <FormContainer>
                <LoginForm/>
            </FormContainer>
        </Container>
    )
}
export default LoginPage
