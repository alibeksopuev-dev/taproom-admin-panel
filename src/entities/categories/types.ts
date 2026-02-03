export interface Category {
    id: string
    organization_id: string
    name: string
    slug: string
    icon?: string
    display_order?: number
    created_at: string
    updated_at: string
}

export interface CategoryFilters {
    organization_id?: string
    name?: string
}

export interface Pagination {
    limit: number
    offset: number
    pageIndex: number
}

export interface CategoriesResponse {
    items: Category[]
    count: number
}
