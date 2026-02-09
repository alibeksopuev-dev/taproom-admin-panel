import { SxProps } from '@mui/material'
import { Typography } from '@mui/material'
import { PropsWithChildren } from 'react'
import { StyledDetailKey, StyledDetailRow, StyledDetailValue, StyledTable, StyledTitle } from './styled'

export enum TypographyVariant {
    BODY_M = 'body2',
    BODY_L = 'body1',
    CAPTION = 'caption',
    H6 = 'h6',
}

interface ColumnProps extends PropsWithChildren {
    keysWidth?: string
}

interface ValueKeyProps extends PropsWithChildren {
    sx?: SxProps
    onClick?: () => void
}

interface DetailKeyProps extends ValueKeyProps {
    keyWidth?: string
}

export const Key = ({ children, sx }: ValueKeyProps) => {
    if (!children) return null
    return (
        <Typography
            color='#9CA3AF'
            variant={TypographyVariant.BODY_M}
            sx={{ whiteSpace: 'nowrap', ...sx }}
        >
            {children}
        </Typography>
    )
}

export const Value = ({ children, sx, onClick }: ValueKeyProps) => {
    if (!children) return null
    return (
        <Typography
            variant={TypographyVariant.BODY_M}
            sx={{ whiteSpace: 'nowrap', ...sx, cursor: onClick ? 'pointer' : 'default', color: '#f1f5f9' }}
            onClick={onClick}
        >
            {children}
        </Typography>
    )
}

export const Column = ({ children, keysWidth }: ColumnProps) => {
    return <StyledTitle keysWidth={keysWidth}>{children}</StyledTitle>
}

export const AbstractTable = ({ children }: PropsWithChildren) => {
    return <StyledTable>{children}</StyledTable>
}

export const DetailRow = ({ children }: PropsWithChildren) => {
    return <StyledDetailRow>{children}</StyledDetailRow>
}

export const DetailKey = ({ children, sx, keyWidth }: DetailKeyProps) => {
    if (!children) return null
    return (
        <StyledDetailKey $keyWidth={keyWidth}>
            <Typography
                color='#9CA3AF'
                variant={TypographyVariant.BODY_M}
                sx={{ whiteSpace: 'nowrap', ...sx }}
            >
                {children}
            </Typography>
        </StyledDetailKey>
    )
}

export const DetailValue = ({ children, sx, onClick }: ValueKeyProps) => {
    if (!children) return null
    return (
        <StyledDetailValue sx={sx} onClick={onClick}>
            {children}
        </StyledDetailValue>
    )
}
