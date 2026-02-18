export interface AdminUser {
    id: string
    email: string
    role: 'super_admin' | 'admin'
    display_name: string | null
    created_at: string
}

export type AdminUserRole = AdminUser['role']
