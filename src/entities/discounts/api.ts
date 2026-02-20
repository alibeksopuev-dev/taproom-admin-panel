import { baseApi } from '@shared/api'
import { supabase } from '@shared/api/supabase'
import type {
    UserDiscount,
    DiscountsResponse,
    CreateDiscountRequest,
    UpdateDiscountRequest,
} from './types'

type GetDiscountsParams = {
    limit: number
    offset: number
    organization_id?: string
}

export const discountsApi = baseApi.injectEndpoints({
    endpoints: (create) => ({
        getDiscounts: create.query<DiscountsResponse, GetDiscountsParams>({
            queryFn: async ({ limit, offset, organization_id }) => {
                let query = supabase
                    .from('user_discounts')
                    .select('*', { count: 'exact' })
                    .order('created_at', { ascending: false })
                    .range(offset, offset + limit - 1)

                if (organization_id) {
                    query = query.eq('organization_id', organization_id)
                }

                const { data, error, count } = await query

                if (error) {
                    return { error: { status: error.code, data: error.message } }
                }

                // Fetch user emails for display
                const userIds = (data ?? []).map((d: UserDiscount) => d.user_id)
                let enrichedData = data ?? []

                if (userIds.length > 0) {
                    const { data: profiles } = await supabase
                        .from('profiles')
                        .select('id, display_name')
                        .in('id', userIds)

                    if (profiles) {
                        const profileMap = new Map(profiles.map((p: { id: string; display_name: string | null }) => [p.id, p.display_name]))
                        enrichedData = (data ?? []).map((d: UserDiscount) => ({
                            ...d,
                            user_name: profileMap.get(d.user_id) || null,
                        }))
                    }
                }

                return { data: { items: enrichedData, count: count ?? 0 } }
            },
            providesTags: ['Discounts'],
        }),

        getDiscountById: create.query<UserDiscount, { id: string }>({
            queryFn: async ({ id }) => {
                const { data, error } = await supabase
                    .from('user_discounts')
                    .select('*')
                    .eq('id', id)
                    .single()

                if (error) {
                    return { error: { status: error.code, data: error.message } }
                }

                return { data }
            },
            providesTags: (_result, _error, { id }) => [{ type: 'Discount', id }],
        }),

        createDiscount: create.mutation<UserDiscount, CreateDiscountRequest>({
            queryFn: async (discountData) => {
                const { data, error } = await supabase
                    .from('user_discounts')
                    .insert(discountData)
                    .select()
                    .single()

                if (error) {
                    return { error: { status: error.code, data: error.message } }
                }

                return { data }
            },
            invalidatesTags: ['Discounts'],
        }),

        updateDiscount: create.mutation<UserDiscount, UpdateDiscountRequest>({
            queryFn: async ({ id, ...updateData }) => {
                const { data, error } = await supabase
                    .from('user_discounts')
                    .update({
                        ...updateData,
                        updated_at: new Date().toISOString(),
                    })
                    .eq('id', id)
                    .select()
                    .single()

                if (error) {
                    return { error: { status: error.code, data: error.message } }
                }

                return { data }
            },
            invalidatesTags: (_result, _error, { id }) => [
                'Discounts',
                { type: 'Discount', id },
            ],
        }),

        deleteDiscount: create.mutation<{ success: boolean }, { id: string }>({
            queryFn: async ({ id }) => {
                const { error } = await supabase
                    .from('user_discounts')
                    .delete()
                    .eq('id', id)

                if (error) {
                    return { error: { status: error.code, data: error.message } }
                }

                return { data: { success: true } }
            },
            invalidatesTags: ['Discounts'],
        }),
    }),
    overrideExisting: true,
})
