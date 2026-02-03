import { Outlet } from 'react-router-dom'
import styled from 'styled-components'

const Root = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
`

export const AuthLayout = () => {
    return (
        <Root>
            <Outlet />
        </Root>
    )
}
