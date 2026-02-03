import { baseApi } from '@shared/api'
import { supabase } from '@shared/api/supabase'
import type { MenuItem, MenuItemsResponse, MenuItemFilters, PricePerSize } from './types'

type GetMenuItemsParams = {
    limit: number
    offset: number
    filters?: MenuItemFilters
}

type CreateMenuItemRequest = {
    organization_id: string
    category_id?: string | null
    name: string
    description?: string | null
    subcategory?: string | null
    image_url?: string | null
    metadata?: Record<string, unknown>
    is_disabled?: boolean
    ibu?: number | null
    abv?: number | null
    wine_region?: string | null
    wine_country?: string | null
    wine_grape_variety?: string | null
    wine_style?: string | null
    display_order?: number
    prices?: { size: string; price: number }[]
}

type UpdateMenuItemRequest = {
    id: string
    data: Partial<CreateMenuItemRequest>
}

export const menuItemsApi = baseApi.injectEndpoints({
    endpoints: (create) => ({
        getMenuItems: create.query<MenuItemsResponse, GetMenuItemsParams>({
            queryFn: async ({ limit, offset, filters }) => {
                let query = supabase
                    .from('menu_items')
                    .select('*, category:categories(*), prices:price_per_size(*)', { count: 'exact' })
                    .order('display_order', { ascending: true })
                    .range(offset, offset + limit - 1)

                if (filters?.organization_id) {
                    query = query.eq('organization_id', filters.organization_id)
                }
                if (filters?.category_id) {
                    query = query.eq('category_id', filters.category_id)
                }
                if (filters?.name) {
                    query = query.ilike('name', `%${filters.name}%`)
                }
                if (filters?.subcategory) {
                    query = query.eq('subcategory', filters.subcategory)
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
            providesTags: ['MenuItems'],
        }),

        getMenuItemById: create.query<MenuItem, { id: string }>({
            queryFn: async ({ id }) => {
                const { data, error } = await supabase
                    .from('menu_items')
                    .select('*, category:categories(*), prices:price_per_size(*)')
                    .eq('id', id)
                    .single()

                if (error) {
                    return { error: { status: error.code, data: error.message } }
                }

                return { data }
            },
            providesTags: (_result, _error, { id }) => [{ type: 'MenuItem', id }],
        }),

        createMenuItem: create.mutation<MenuItem, CreateMenuItemRequest>({
            queryFn: async (menuItemData) => {
                const { prices, ...itemData } = menuItemData

                // Insert menu item
                const { data: menuItem, error: itemError } = await supabase
                    .from('menu_items')
                    .insert(itemData)
                    .select()
                    .single()

                if (itemError) {
                    return { error: { status: itemError.code, data: itemError.message } }
                }

                // Insert prices if provided
                if (prices && prices.length > 0) {
                    const priceRecords = prices.map((p) => ({
                        menu_item_id: menuItem.id,
                        size: p.size,
                        price: p.price,
                    }))

                    const { error: priceError } = await supabase
                        .from('price_per_size')
                        .insert(priceRecords)

                    if (priceError) {
                        console.error('Error inserting prices:', priceError)
                    }
                }

                return { data: menuItem }
            },
            invalidatesTags: ['MenuItems'],
        }),

        updateMenuItem: create.mutation<MenuItem, UpdateMenuItemRequest>({
            queryFn: async ({ id, data: updateData }) => {
                const { prices, ...itemData } = updateData

                // Update menu item
                const { data: menuItem, error: itemError } = await supabase
                    .from('menu_items')
                    .update({ ...itemData, updated_at: new Date().toISOString() })
                    .eq('id', id)
                    .select()
                    .single()

                if (itemError) {
                    return { error: { status: itemError.code, data: itemError.message } }
                }

                // Update prices if provided
                if (prices) {
                    // Delete existing prices
                    await supabase.from('price_per_size').delete().eq('menu_item_id', id)

                    // Insert new prices
                    if (prices.length > 0) {
                        const priceRecords = prices.map((p) => ({
                            menu_item_id: id,
                            size: p.size,
                            price: p.price,
                        }))

                        await supabase.from('price_per_size').insert(priceRecords)
                    }
                }

                return { data: menuItem }
            },
            invalidatesTags: (_result, _error, { id }) => [
                'MenuItems',
                { type: 'MenuItem', id },
            ],
        }),

        deleteMenuItem: create.mutation<{ success: boolean }, { id: string }>({
            queryFn: async ({ id }) => {
                // Prices are deleted via CASCADE
                const { error } = await supabase.from('menu_items').delete().eq('id', id)

                if (error) {
                    return { error: { status: error.code, data: error.message } }
                }

                return { data: { success: true } }
            },
            invalidatesTags: ['MenuItems'],
        }),

        getPricesByMenuItemId: create.query<PricePerSize[], { menuItemId: string }>({
            queryFn: async ({ menuItemId }) => {
                const { data, error } = await supabase
                    .from('price_per_size')
                    .select('*')
                    .eq('menu_item_id', menuItemId)

                if (error) {
                    return { error: { status: error.code, data: error.message } }
                }

                return { data: data ?? [] }
            },
            providesTags: ['PricePerSize'],
        }),
    }),
    overrideExisting: true,
})
