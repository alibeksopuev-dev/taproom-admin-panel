import { baseApi } from '@shared/api'
import { supabase } from '@shared/api/supabase'
import type { AdminUser, AdminUserRole } from './types'

type AddAdminUserRequest = {
    email: string
    role: AdminUserRole
    display_name?: string
}

export const adminUsersApi = baseApi.injectEndpoints({
    endpoints: (create) => ({
        getAdminUsers: create.query<AdminUser[], void>({
            queryFn: async () => {
                const { data, error } = await supabase
                    .from('admin_users')
                    .select('*')
                    .order('created_at', { ascending: true })

                if (error) {
                    return { error: { status: error.code, data: error.message } }
                }

                return { data: data ?? [] }
            },
            providesTags: ['AdminUsers'],
        }),

        checkAccess: create.query<AdminUser | null, { email: string }>({
            queryFn: async ({ email }) => {
                const { data, error } = await supabase
                    .from('admin_users')
                    .select('*')
                    .eq('email', email)
                    .maybeSingle()

                if (error) {
                    return { error: { status: error.code, data: error.message } }
                }

                return { data: data ?? null }
            },
        }),

        addAdminUser: create.mutation<AdminUser, AddAdminUserRequest>({
            queryFn: async (params) => {
                const { data, error } = await supabase
                    .from('admin_users')
                    .insert(params)
                    .select()
                    .single()

                if (error) {
                    return { error: { status: error.code, data: error.message } }
                }

                return { data }
            },
            invalidatesTags: ['AdminUsers'],
        }),

        removeAdminUser: create.mutation<void, { id: string }>({
            queryFn: async ({ id }) => {
                const { error } = await supabase
                    .from('admin_users')
                    .delete()
                    .eq('id', id)

                if (error) {
                    return { error: { status: error.code, data: error.message } }
                }

                return { data: undefined }
            },
            invalidatesTags: ['AdminUsers'],
        }),
    }),
    overrideExisting: true,
})

export const {
    useGetAdminUsersQuery,
    useCheckAccessQuery,
    useAddAdminUserMutation,
    useRemoveAdminUserMutation,
} = adminUsersApi
