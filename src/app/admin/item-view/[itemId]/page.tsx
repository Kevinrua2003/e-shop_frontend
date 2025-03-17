import Container from '@/UI/container/components/Container'
import React from 'react'
import ItemViewPage from './ItemViewPage'

function Page() {
  return (
    <div className = "p-8">
        <Container>
            <ItemViewPage/>
        </Container>
    </div>
  )
}

export default Page