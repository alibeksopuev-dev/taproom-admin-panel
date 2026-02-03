import styled from 'styled-components'
import { SxProps } from '@mui/material'
import { PropsWithChildren } from 'react'

const StyledDetailRow = styled.div`
  display: flex;
  gap: 16px;
  align-items: flex-start;
`

const StyledDetailKey = styled.div<{ $keyWidth?: string }>`
  min-width: ${({ $keyWidth }) => $keyWidth || '140px'};
  color: #9ca3af;
  font-size: 14px;
`

const StyledDetailValue = styled.div`
  color: #f1f5f9;
  font-size: 14px;
  word-break: break-word;
`

interface DetailKeyProps extends PropsWithChildren {
    keyWidth?: string
    sx?: SxProps
}

interface DetailValueProps extends PropsWithChildren {
    sx?: SxProps
    onClick?: () => void
}

export const DetailRow = ({ children }: PropsWithChildren) => {
    return <StyledDetailRow>{children}</StyledDetailRow>
}

export const DetailKey = ({ children, keyWidth }: DetailKeyProps) => {
    if (!children) return null
    return <StyledDetailKey $keyWidth={keyWidth}>{children}</StyledDetailKey>
}

export const DetailValue = ({ children, onClick }: DetailValueProps) => {
    if (!children) return null
    return (
        <StyledDetailValue
            onClick={onClick}
            style={{ cursor: onClick ? 'pointer' : 'default' }}
        >
            {children}
        </StyledDetailValue>
    )
}
