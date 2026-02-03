import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import type { User, Session } from '@supabase/supabase-js'
import { authApi } from './api'
import type { AuthState, SignInCredentials } from './types'

const initialState: AuthState = {
    user: null,
    session: null,
    loading: true,
    error: null,
}

export const signInThunk = createAsyncThunk(
    'session/signIn',
    async (credentials: SignInCredentials, { rejectWithValue }) => {
        try {
            return await authApi.signIn(credentials)
        } catch (error) {
            return rejectWithValue((error as Error).message)
        }
    }
)

export const signOutThunk = createAsyncThunk(
    'session/signOut',
    async (_, { rejectWithValue }) => {
        try {
            await authApi.signOut()
        } catch (error) {
            return rejectWithValue((error as Error).message)
        }
    }
)

export const checkSessionThunk = createAsyncThunk(
    'session/checkSession',
    async (_, { rejectWithValue }) => {
        try {
            return await authApi.getSession()
        } catch (error) {
            return rejectWithValue((error as Error).message)
        }
    }
)

export const sessionSlice = createSlice({
    name: 'session',
    initialState,
    reducers: {
        setSession: (
            state,
            action: PayloadAction<{ user: User | null; session: Session | null }>
        ) => {
            state.user = action.payload.user
            state.session = action.payload.session
            state.loading = false
        },
        clearSession: (state) => {
            state.user = null
            state.session = null
            state.loading = false
            state.error = null
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(signInThunk.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(signInThunk.fulfilled, (state, action) => {
                state.loading = false
                state.user = action.payload.user
                state.session = action.payload.session
            })
            .addCase(signInThunk.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload as string
            })
            .addCase(signOutThunk.fulfilled, (state) => {
                state.user = null
                state.session = null
                state.loading = false
            })
            .addCase(checkSessionThunk.pending, (state) => {
                state.loading = true
            })
            .addCase(checkSessionThunk.fulfilled, (state, action) => {
                state.loading = false
                state.session = action.payload
                state.user = action.payload?.user ?? null
            })
            .addCase(checkSessionThunk.rejected, (state) => {
                state.loading = false
                state.user = null
                state.session = null
            })
    },
})

export const { setSession, clearSession } = sessionSlice.actions

export const selectUser = (state: { session: AuthState }) => state.session.user
export const selectSession = (state: { session: AuthState }) => state.session.session
export const selectIsAuthenticated = (state: { session: AuthState }) =>
    !!state.session.session
export const selectAuthLoading = (state: { session: AuthState }) =>
    state.session.loading
export const selectAuthError = (state: { session: AuthState }) => state.session.error
