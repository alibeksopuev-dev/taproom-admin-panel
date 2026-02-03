import styled from 'styled-components'
import { Header, MenuItemsTable } from '@widgets/menuItems'

const Root = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  gap: 16px;
`

export const MenuItems = () => {
    return (
        <Root>
            <Header />
            <MenuItemsTable />
        </Root>
    )
}
