export interface UserDiscount {
    id: string
    user_id: string
    organization_id: string
    discount_percent: number
    label: string | null
    is_active: boolean
    created_by: string | null
    created_at: string
    updated_at: string
    // Joined fields
    user_email?: string
    user_name?: string
}

export interface DiscountsResponse {
    items: UserDiscount[]
    count: number
}

export interface CreateDiscountRequest {
    user_id: string
    organization_id: string
    discount_percent: number
    label?: string
    is_active?: boolean
}

export interface UpdateDiscountRequest {
    id: string
    discount_percent?: number
    label?: string
    is_active?: boolean
}
