import { baseApi } from '@shared/api'
import { supabase } from '@shared/api/supabase'
import type { Order, OrdersResponse, OrderFilters, OrderStatus } from './types'

type GetOrdersParams = {
    limit: number
    offset: number
    filters?: OrderFilters
}

type UpdateOrderStatusRequest = {
    id: string
    status: OrderStatus
}

type ApplyOrderDiscountRequest = {
    id: string
    discount_percent: number
    total_amount: number
}

export const ordersApi = baseApi.injectEndpoints({
    endpoints: (create) => ({
        getOrders: create.query<OrdersResponse, GetOrdersParams>({
            queryFn: async ({ limit, offset, filters }) => {
                let query = supabase
                    .from('orders')
                    .select('*, items:order_items(*)', { count: 'exact' })
                    .order('created_at', { ascending: false })
                    .range(offset, offset + limit - 1)

                if (filters?.organization_id) {
                    query = query.eq('organization_id', filters.organization_id)
                }
                if (filters?.status) {
                    query = query.eq('status', filters.status)
                }
                if (filters?.payment_status) {
                    query = query.eq('payment_status', filters.payment_status)
                }
                if (filters?.order_number) {
                    query = query.ilike('order_number', `%${filters.order_number}%`)
                }

                const { data, error, count } = await query

                if (error) {
                    return { error: { status: error.code, data: error.message } }
                }

                return { data: { items: data ?? [], count: count ?? 0 } }
            },
            providesTags: ['Orders'],
        }),

        getOrderById: create.query<Order, { id: string }>({
            queryFn: async ({ id }) => {
                const { data, error } = await supabase
                    .from('orders')
                    .select('*, items:order_items(*)')
                    .eq('id', id)
                    .single()

                if (error) {
                    return { error: { status: error.code, data: error.message } }
                }

                return { data }
            },
            providesTags: (_result, _error, { id }) => [{ type: 'Order', id }],
        }),

        updateOrderStatus: create.mutation<Order, UpdateOrderStatusRequest>({
            queryFn: async ({ id, status }) => {
                const updateData: Record<string, unknown> = {
                    status,
                    updated_at: new Date().toISOString(),
                }

                // Auto-set payment_status to 'paid' when order status moves to 'paid'
                if (status === 'paid') {
                    updateData.payment_status = 'paid'
                    updateData.paid_at = new Date().toISOString()
                }

                const { data, error } = await supabase
                    .from('orders')
                    .update(updateData)
                    .eq('id', id)
                    .select('*, items:order_items(*)')
                    .single()

                if (error) {
                    return { error: { status: error.code, data: error.message } }
                }

                return { data }
            },
            invalidatesTags: (_result, _error, { id }) => [
                'Orders',
                { type: 'Order', id },
            ],
        }),

        applyOrderDiscount: create.mutation<Order, ApplyOrderDiscountRequest>({
            queryFn: async ({ id, discount_percent, total_amount }) => {
                const discount_amount = Math.round(total_amount * discount_percent / (100 + discount_percent))

                const { data, error } = await supabase
                    .from('orders')
                    .update({
                        discount_percent,
                        discount_amount,
                        total_amount: total_amount - discount_amount,
                        updated_at: new Date().toISOString(),
                    })
                    .eq('id', id)
                    .select('*, items:order_items(*)')
                    .single()

                if (error) {
                    return { error: { status: error.code, data: error.message } }
                }

                return { data }
            },
            invalidatesTags: (_result, _error, { id }) => [
                'Orders',
                { type: 'Order', id },
            ],
        }),
    }),
    overrideExisting: true,
})
