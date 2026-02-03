import type { Category } from '@entities/categories'

export interface PricePerSize {
    id: string
    menu_item_id: string
    size: string
    price: number
    created_at: string
}

export interface MenuItem {
    id: string
    organization_id: string
    category_id: string | null
    name: string
    description: string | null
    subcategory: string | null
    image_url: string | null
    metadata: Record<string, unknown>
    is_disabled: boolean
    ibu?: number | null
    abv?: number | null
    wine_region?: string | null
    wine_country?: string | null
    wine_grape_variety?: string | null
    wine_style?: string | null
    display_order?: number
    created_at: string
    updated_at: string
    category?: Category
    prices?: PricePerSize[]
}

export interface MenuItemFilters {
    organization_id?: string
    category_id?: string
    name?: string
    subcategory?: string
    is_disabled?: boolean
}

export interface MenuItemsResponse {
    items: MenuItem[]
    count: number
}
