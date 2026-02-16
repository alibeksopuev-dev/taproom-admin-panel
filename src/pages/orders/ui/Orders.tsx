import styled from 'styled-components'
import { Header, OrdersTable } from '@widgets/orders'

const Root = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`

export const Orders = () => {
    return (
        <Root>
            <Header />
            <OrdersTable />
        </Root>
    )
}
