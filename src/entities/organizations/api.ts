import { baseApi } from '@shared/api'
import { supabase } from '@shared/api/supabase'
import type { Organization, OrganizationsResponse, OrganizationFilters, CreateOrganizationRequest } from './types'

type GetOrganizationsParams = {
    limit: number
    offset: number
    filters?: OrganizationFilters
}

type UpdateOrganizationRequest = {
    id: string
    data: Partial<Omit<Organization, 'id' | 'created_at' | 'updated_at'>>
}

export const organizationsApi = baseApi.injectEndpoints({
    endpoints: (create) => ({
        getOrganizations: create.query<OrganizationsResponse, GetOrganizationsParams>({
            queryFn: async ({ limit, offset, filters }) => {
                let query = supabase
                    .from('organizations')
                    .select('*', { count: 'exact' })
                    .order('name', { ascending: true })
                    .range(offset, offset + limit - 1)

                if (filters?.name) {
                    query = query.ilike('name', `%${filters.name}%`)
                }
                if (filters?.is_disabled !== undefined) {
                    query = query.eq('is_disabled', filters.is_disabled)
                }

                const { data, error, count } = await query

                if (error) {
                    return { error: { status: error.code, data: error.message } }
                }

                return { data: { items: data ?? [], count: count ?? 0 } }
            },
            providesTags: ['Organizations'],
        }),

        getOrganizationById: create.query<Organization, { id: string }>({
            queryFn: async ({ id }) => {
                const { data, error } = await supabase
                    .from('organizations')
                    .select('*')
                    .eq('id', id)
                    .single()

                if (error) {
                    return { error: { status: error.code, data: error.message } }
                }

                return { data }
            },
            providesTags: (_result, _error, { id }) => [{ type: 'Organization', id }],
        }),

        createOrganization: create.mutation<Organization, CreateOrganizationRequest>({
            queryFn: async (orgData) => {
                const { data, error } = await supabase
                    .from('organizations')
                    .insert(orgData)
                    .select()
                    .single()

                if (error) {
                    return { error: { status: error.code, data: error.message } }
                }

                return { data }
            },
            invalidatesTags: ['Organizations'],
        }),

        updateOrganization: create.mutation<Organization, UpdateOrganizationRequest>({
            queryFn: async ({ id, data: updateData }) => {
                const { data, error } = await supabase
                    .from('organizations')
                    .update({ ...updateData, updated_at: new Date().toISOString() })
                    .eq('id', id)
                    .select()
                    .single()

                if (error) {
                    return { error: { status: error.code, data: error.message } }
                }

                return { data }
            },
            invalidatesTags: (_result, _error, { id }) => [
                'Organizations',
                { type: 'Organization', id },
            ],
        }),
    }),
    overrideExisting: true,
})
