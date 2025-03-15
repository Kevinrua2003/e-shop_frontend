import React from 'react'
import Container from "@/UI/container/components/Container";
import FormContainer from "@/UI/auth/containers/FormContainer";
import RegisterForm from "@/UI/auth/components/RegisterForm";

const RegisterPage = () => {
    return (
        <Container>
            <FormContainer>
                <RegisterForm/>
            </FormContainer>
        </Container>
    )
}
export default RegisterPage
