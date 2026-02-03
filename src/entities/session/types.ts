import type { User, Session } from '@supabase/supabase-js'

export interface AuthState {
    user: User | null
    session: Session | null
    loading: boolean
    error: string | null
}

export interface SignInCredentials {
    email: string
    password: string
}
