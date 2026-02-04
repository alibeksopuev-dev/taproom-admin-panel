import { PropsWithChildren } from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { useAppSelector } from '@shared/lib'
import { selectIsAuthenticated } from '@entities/session'

export const AuthorizedLoader = ({ children }: PropsWithChildren) => {
    const isAuth = useAppSelector(selectIsAuthenticated)
    const location = useLocation()

    if (!isAuth) {
        return <Navigate to="/login" state={{ from: location }} replace />
    }

    return children
}
