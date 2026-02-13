import { PropsWithChildren } from 'react'
import { Navigate } from 'react-router-dom'
import { useAppSelector } from '@shared/lib'
import { selectIsAuthenticated } from '@entities/session'

export const UnAuthorizedLoader = ({ children }: PropsWithChildren) => {
    const isAuth = useAppSelector(selectIsAuthenticated)

    if (isAuth) {
        return <Navigate to="/menu-categories" replace />
    }

    return children
}
