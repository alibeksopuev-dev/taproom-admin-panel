import { isRejectedWithValue } from '@reduxjs/toolkit'
import type { Middleware } from '@reduxjs/toolkit'
import { setError } from '@entities/app/model/slice'

export const errorMiddleware: Middleware = (api) => (next) => (action) => {
    if (isRejectedWithValue(action)) {
        const payload = action.payload as { status?: number | string; data?: string }
        // We can extract a meaningful message here
        const errorMessage = typeof payload?.data === 'string'
            ? payload.data
            : 'An unknown error occurred'

        api.dispatch(setError(errorMessage))
    }

    return next(action)
}
