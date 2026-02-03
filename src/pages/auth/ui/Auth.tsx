import styled from 'styled-components'
import { LoginForm } from '@features/auth'

const Root = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
`

export const Auth = () => {
    return (
        <Root>
            <LoginForm />
        </Root>
    )
}
