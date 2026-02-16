import { ReactNode } from 'react'
import styled from 'styled-components'
import Typography from '@mui/material/Typography'

const Root = styled.div`
    display: flex;
    flex-direction: column;
    height: 100%;
`

const Header = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 24px;
    border-bottom: 1px solid #334155;
`

const Content = styled.div`
    flex: 1;
    overflow-y: auto;
    padding: 24px;
`

const Action = styled.div`
    padding: 24px;
    border-top: 1px solid #334155;
`

interface DrawerContentProps {
    header?: {
        title?: ReactNode | string
        action?: ReactNode
    }
    content?: ReactNode
    action?: ReactNode
}

export const DrawerContent = ({ header, content, action }: DrawerContentProps) => {
    return (
        <Root>
            {header && (
                <Header>
                    {typeof header.title === 'string' ? (
                        <Typography sx={{ fontSize: 18, fontWeight: 600, color: '#f1f5f9' }}>
                            {header.title}
                        </Typography>
                    ) : (
                        header.title
                    )}
                    {header.action}
                </Header>
            )}
            <Content>{content}</Content>
            {action && <Action>{action}</Action>}
        </Root>
    )
}
