import { PropsWithChildren } from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { useAppSelector, useAppDispatch } from '@shared/lib'
import { selectIsAuthenticated, selectUser, signOutThunk } from '@entities/session'
import { useCheckAccessQuery } from '@entities/adminUsers'
import { Box, CircularProgress } from '@shared/ui'

export const AuthorizedLoader = ({ children }: PropsWithChildren) => {
    const isAuth = useAppSelector(selectIsAuthenticated)
    const user = useAppSelector(selectUser)
    const location = useLocation()
    const dispatch = useAppDispatch()

    const { data: adminUser, isLoading } = useCheckAccessQuery(
        { email: user?.email ?? '' },
        { skip: !user?.email }
    )

    if (!isAuth) {
        return <Navigate to="/login" state={{ from: location }} replace />
    }

    // Wait for access check to complete
    if (isLoading) {
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

    // User is authenticated but not in admin_users → sign out and redirect
    if (!adminUser) {
        dispatch(signOutThunk())
        return <Navigate to="/login" replace />
    }

    return children
}
