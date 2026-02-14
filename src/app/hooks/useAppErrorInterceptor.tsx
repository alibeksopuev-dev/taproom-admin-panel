import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useSnackbar } from 'notistack'
import { RootState } from '../providers/store'
import { clearError } from '@entities/app/model/slice'
import { Snackbar } from '@shared/ui/Snackbar'
import { SnackVariant } from '@shared/ui/Snackbar'
import { Typography } from '@mui/material'

export const useAppErrorInterceptor = () => {
    const dispatch = useDispatch()
    const { enqueueSnackbar } = useSnackbar()
    const error = useSelector((state: RootState) => state.app.error)

    useEffect(() => {
        if (error) {
            enqueueSnackbar('', {
                variant: 'error',
                autoHideDuration: 3000,
                anchorOrigin: { horizontal: 'center', vertical: 'bottom' },
                content: () => (
                    <Snackbar
                        variant={SnackVariant.ERROR}
                        message={
                            <Typography variant="body2" color="#FFFFFF">
                                {error}
                            </Typography>
                        }
                    />
                ),
            })
            dispatch(clearError())
        }
    }, [error, enqueueSnackbar, dispatch])
}
