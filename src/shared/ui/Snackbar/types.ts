import { SnackbarMessage } from 'notistack'

export enum SnackVariant {
    SUCCESS,
    ERROR,
}

export type SnackbarProps = {
    message: SnackbarMessage
    variant: SnackVariant
    onClose?: () => void
}
