import FormContainer from '@/UI/auth/containers/FormContainer'
import Container from '@/UI/container/components/Container'
import React from 'react'
import EditProductPage from './EditProductPage'

function Page() {
  return (
    <div>
        <Container>
                <FormContainer>
                    <EditProductPage/>
                </FormContainer>
            </Container>
    </div>
  )
}

export default Page;