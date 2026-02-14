import styled, { css } from 'styled-components'
import { SnackbarProps, SnackVariant } from './types'

const getVariant = (variant: SnackVariant) => {
    switch (variant) {
        case SnackVariant.SUCCESS:
            return successVariant

        case SnackVariant.ERROR:
            return errorVariant
        default:
            null
    }
}

export const StyledSnackbar = styled.div<{ variant: SnackbarProps['variant'] }>`
    display: flex;
    align-items: center;
    border-radius: 18px;
    padding: 12px;
    gap: 12px;
    width: 100%;
    ${({ variant }) => getVariant(variant)}
`

const successVariant = css`
    background-color: #1bba9a;
`

const errorVariant = css`
    background-color: #ff6458;
`
