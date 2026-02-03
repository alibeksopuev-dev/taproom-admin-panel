import { Outlet } from 'react-router-dom'
import styled from 'styled-components'
import { Sidebar } from '@widgets/sidebar'

const Root = styled.div`
  display: flex;
  min-height: 100vh;
  background-color: #0f172a;
`

const Content = styled.main`
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`

export const MainLayout = () => {
    return (
        <Root>
            <Sidebar />
            <Content>
                <Outlet />
            </Content>
        </Root>
    )
}
