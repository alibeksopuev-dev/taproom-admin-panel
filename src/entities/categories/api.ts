import { baseApi } from '@shared/api'
import { supabase } from '@shared/api/supabase'
import type { Category, CategoriesResponse, CategoryFilters } from './types'

type GetCategoriesParams = {
    limit: number
    offset: number
    filters?: CategoryFilters
}

type CreateCategoryRequest = {
    name: string
    slug: string
}

type UpdateCategoryRequest = {
    id: string
    data: Partial<Omit<CreateCategoryRequest, 'organization_id'>>
}

export const categoriesApi = baseApi.injectEndpoints({
    endpoints: (create) => ({
        getCategories: create.query<CategoriesResponse, GetCategoriesParams>({
            queryFn: async ({ limit, offset, filters }) => {
                let query = supabase
                    .from('categories')
                    .select('*', { count: 'exact' })
                    .order('name', { ascending: true })
                    .range(offset, offset + limit - 1)

                if (filters?.organization_id) {
                    query = query.eq('organization_id', filters.organization_id)
                }
                if (filters?.name) {
                    query = query.ilike('name', `%${filters.name}%`)
                }

                const { data, error, count } = await query

                if (error) {
                    return { error: { status: error.code, data: error.message } }
                }

                return { data: { items: data ?? [], count: count ?? 0 } }
            },
            providesTags: ['Categories'],
        }),

        getCategoryById: create.query<Category, { id: string }>({
            queryFn: async ({ id }) => {
                const { data, error } = await supabase
                    .from('categories')
                    .select('*')
                    .eq('id', id)
                    .single()

                if (error) {
                    return { error: { status: error.code, data: error.message } }
                }

                return { data }
            },
            providesTags: (_result, _error, { id }) => [{ type: 'Category', id }],
        }),

        createCategory: create.mutation<Category, CreateCategoryRequest>({
            queryFn: async (categoryData) => {
                const { data, error } = await supabase
                    .from('categories')
                    .insert(categoryData)
                    .select()
                    .single()

                if (error) {
                    return { error: { status: error.code, data: error.message } }
                }

                return { data }
            },
            invalidatesTags: ['Categories'],
        }),

        updateCategory: create.mutation<Category, UpdateCategoryRequest>({
            queryFn: async ({ id, data: updateData }) => {
                const { data, error } = await supabase
                    .from('categories')
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
                'Categories',
                { type: 'Category', id },
            ],
        }),

        deleteCategory: create.mutation<{ success: boolean }, { id: string }>({
            queryFn: async ({ id }) => {
                const { error } = await supabase.from('categories').delete().eq('id', id)

                if (error) {
                    return { error: { status: error.code, data: error.message } }
                }

                return { data: { success: true } }
            },
            invalidatesTags: ['Categories'],
        }),
    }),
    overrideExisting: true,
})
