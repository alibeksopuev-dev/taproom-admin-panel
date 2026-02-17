import { PropsWithChildren, useEffect, useRef } from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { useAppSelector, useAppDispatch, isAllowedUser } from '@shared/lib'
import { selectIsAuthenticated, selectUser, signOutThunk } from '@entities/session'

export const AuthorizedLoader = ({ children }: PropsWithChildren) => {
    const isAuth = useAppSelector(selectIsAuthenticated)
    const user = useAppSelector(selectUser)
    const location = useLocation()
    const dispatch = useAppDispatch()
    const hasSignedOut = useRef(false)

    const allowed = isAllowedUser(user?.email ?? undefined)

    useEffect(() => {
        // If authenticated but not in the allowed list, sign them out
        if (isAuth && !allowed && !hasSignedOut.current) {
            hasSignedOut.current = true
            dispatch(signOutThunk())
        }
    }, [isAuth, allowed, dispatch])

    if (!isAuth) {
        return <Navigate to="/login" state={{ from: location }} replace />
    }

    if (!allowed) {
        return <Navigate to="/login" replace />
    }

    return children
}
