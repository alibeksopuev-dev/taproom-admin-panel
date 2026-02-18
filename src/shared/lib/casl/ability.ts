import { AbilityBuilder, createMongoAbility, MongoAbility, MongoQuery } from '@casl/ability'
import type { AdminUserRole } from '@entities/adminUsers'

// Subjects (entities) that can be accessed
export type Subjects =
    | 'organizations'
    | 'categories'
    | 'menu_items'
    | 'price_per_size'
    | 'orders'
    | 'admin_users'
    | 'all'

// Actions that can be performed
export type Actions = 'read' | 'create' | 'update' | 'delete' | 'manage'

// Ability type
export type AppAbility = MongoAbility<[Actions, Subjects], MongoQuery>

// Super admin email — hardcoded as an ultimate safety net
const SUPER_ADMIN_EMAIL = 'alibeksopuev@gmail.com'

export function isSuperAdmin(email: string | undefined): boolean {
    return email === SUPER_ADMIN_EMAIL
}

/**
 * Create CASL ability based on user's role from the admin_users table.
 * - `super_admin`: full access to everything
 * - `admin`: can manage menu/categories/orders but NOT organizations or admin_users
 * - `null`: no permissions (blocked)
 */
export function defineAbilityFor(role: AdminUserRole | null): AppAbility {
    const { can, build } = new AbilityBuilder<AppAbility>(createMongoAbility)

    if (!role) {
        return build()
    }

    if (role === 'super_admin') {
        can('manage', 'all')
    } else {
        // Regular admin — can manage menu but not organizations or admin_users
        can('read', 'all')
        can('create', 'categories')
        can('update', 'categories')
        can('create', 'menu_items')
        can('update', 'menu_items')
        can('create', 'price_per_size')
        can('update', 'price_per_size')
        can('read', 'orders')
        can('update', 'orders')
    }

    return build()
}
