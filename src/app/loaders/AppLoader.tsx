import { useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '@shared/lib'
import { checkSessionThunk, selectAuthLoading } from '@entities/session'
import { Box, CircularProgress } from '@shared/ui'

export const AppLoader = () => {
    const dispatch = useAppDispatch()
    const loading = useAppSelector(selectAuthLoading)
    const [isInitialized, setIsInitialized] = useState(false)

    useEffect(() => {
        dispatch(checkSessionThunk())
            .finally(() => setIsInitialized(true))
    }, [dispatch])

    if (loading || !isInitialized) {
        return (
            <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                height="100vh"
                width="100vw"
                bgcolor="#0f172a"
            >
                <CircularProgress />
            </Box>
        )
    }

    return <Outlet />
}
