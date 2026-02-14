import { forwardRef } from 'react'
import { SnackbarContent } from 'notistack'
import { AlertCircle, Check } from 'lucide-react'
import { StyledSnackbar } from './styled'
import { SnackbarProps, SnackVariant } from './types'

export const Snackbar = forwardRef<HTMLDivElement, SnackbarProps>((props, ref) => {
    const { message, onClose, ...other } = props
    const snackVariant = (props: SnackbarProps) => {
        switch (props.variant) {
            case SnackVariant.SUCCESS:
                return (
                    <StyledSnackbar variant={props.variant}>
                        <Check color="white" />
                        {message}
                    </StyledSnackbar>
                )

            case SnackVariant.ERROR:
                return (
                    <StyledSnackbar variant={props.variant}>
                        <AlertCircle color="white" />
                        {message}
                    </StyledSnackbar>
                )

            default:
                return null
        }
    }
    return (
        <SnackbarContent ref={ref} role="alert" onClick={onClose} {...other}>
            {snackVariant(props)}
        </SnackbarContent>
    )
})
