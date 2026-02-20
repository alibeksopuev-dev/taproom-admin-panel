import styled from 'styled-components'
import { Header, DiscountsTable } from '@widgets/discounts'

const Root = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`

export const Discounts = () => {
    return (
        <Root>
            <Header />
            <DiscountsTable />
        </Root>
    )
}
