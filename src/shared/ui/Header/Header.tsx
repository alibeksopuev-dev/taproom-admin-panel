import { ReactNode } from 'react'
import styled from 'styled-components'
import Box from '@mui/material/Box'

const HeaderRoot = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 24px;
  border-bottom: 1px solid #334155;
`

const TitleContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`

interface HeaderProps {
    title: ReactNode
    subtitle?: ReactNode
    action?: ReactNode
}

export const Header = ({ title, subtitle, action }: HeaderProps) => {
    return (
        <HeaderRoot>
            <TitleContainer>
                {typeof title === 'string' ? (
                    <Box component="h1" sx={{ fontSize: 20, fontWeight: 600, color: '#f1f5f9', m: 0 }}>
                        {title}
                    </Box>
                ) : (
                    title
                )}
                {subtitle && (
                    <Box sx={{ fontSize: 14, color: '#9ca3af' }}>{subtitle}</Box>
                )}
            </TitleContainer>
            {action && <Box>{action}</Box>}
        </HeaderRoot>
    )
}
