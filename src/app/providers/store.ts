import { configureStore } from '@reduxjs/toolkit'
import { baseApi } from '@shared/api'
import { sessionSlice } from '@entities/session'
import { appSlice } from '@entities/app/model/slice'
import { errorMiddleware } from './errorMiddleware'

export const store = configureStore({
    reducer: {
        [baseApi.reducerPath]: baseApi.reducer,
        session: sessionSlice.reducer,
        app: appSlice.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(baseApi.middleware).concat(errorMiddleware),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
