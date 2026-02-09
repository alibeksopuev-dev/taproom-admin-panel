import styled from 'styled-components'
import { Header, OrganizationsTable } from '@widgets/organizations'

const Root = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`

export const Organizations = () => {
    return (
        <Root>
            <Header />
            <OrganizationsTable />
        </Root>
    )
}
