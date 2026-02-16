export interface Order {
    id: string
    organization_id: string
    user_id: string | null
    order_number: string
    status: OrderStatus
    total_amount: number
    currency: string
    notes: string | null
    table_number: string | null
    payment_method: PaymentMethod | null
    payment_status: PaymentStatus
    payment_reference: string | null
    paid_at: string | null
    created_at: string
    updated_at: string
    items?: OrderItem[]
}

export interface OrderItem {
    id: string
    order_id: string
    menu_item_id: string
    item_name: string
    size: string | null
    quantity: number
    unit_price: number
    total_price: number
    created_at: string
}

export interface PaymentTransaction {
    id: string
    order_id: string
    provider: 'vietqr' | 'vnpay'
    transaction_id: string | null
    amount: number
    status: 'pending' | 'success' | 'failed'
    raw_response: Record<string, unknown> | null
    created_at: string
}

export type OrderStatus = 'pending' | 'paid' | 'confirmed' | 'preparing' | 'ready' | 'completed' | 'cancelled'
export type PaymentMethod = 'vietqr' | 'vnpay' | 'cash' | 'whatsapp'
export type PaymentStatus = 'unpaid' | 'processing' | 'paid' | 'refunded'

export interface OrderFilters {
    organization_id?: string
    status?: OrderStatus
    payment_status?: PaymentStatus
    order_number?: string
}

export interface OrdersResponse {
    items: Order[]
    count: number
}
