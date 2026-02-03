import { supabase } from '@shared/api'
import type { Session } from '@supabase/supabase-js'
import type { SignInCredentials } from './types'

export const authApi = {
    async signIn({ email, password }: SignInCredentials) {
        const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password,
        })
        if (error) throw error
        return data
    },

    async signOut() {
        const { error } = await supabase.auth.signOut()
        if (error) throw error
    },

    async getSession() {
        const { data, error } = await supabase.auth.getSession()
        if (error) throw error
        return data.session
    },

    onAuthStateChange(callback: (session: Session | null) => void) {
        return supabase.auth.onAuthStateChange((_event, session) => {
            callback(session)
        })
    },
}
