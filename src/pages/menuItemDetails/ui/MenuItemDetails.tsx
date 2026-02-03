import styled from 'styled-components'
import { Header, Details } from '@widgets/menuItemDetails'

const Root = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`

export const MenuItemDetails = () => {
    return (
        <Root>
            <Header />
            <Details />
        </Root>
    )
}
