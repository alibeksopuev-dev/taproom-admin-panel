import styled from 'styled-components'
import { Header, Details } from '@widgets/organizationDetails'

const Root = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`

export const OrganizationDetails = () => {
    return (
        <Root>
            <Header />
            <Details />
        </Root>
    )
}
