import { AbilityBuilder, createMongoAbility, MongoAbility, MongoQuery } from '@casl/ability'
import { User } from '@supabase/supabase-js'

// Subjects (entities) that can be accessed
export type Subjects =
    | 'organizations'
    | 'categories'
    | 'menu_items'
    | 'price_per_size'
    | 'orders'
    | 'all'

// Actions that can be performed
export type Actions = 'read' | 'create' | 'update' | 'delete' | 'manage'

// Ability type
export type AppAbility = MongoAbility<[Actions, Subjects], MongoQuery>

// Super admin email
const SUPER_ADMIN_EMAIL = 'alibeksopuev@gmail.com'

// Allowed emails that can access the admin panel
// Add new team members here
const ALLOWED_EMAILS: string[] = [
    SUPER_ADMIN_EMAIL,
    'test-client@example.com'
    // 'teammate@example.com',
]

export function isAllowedUser(email: string | undefined): boolean {
    if (!email) return false
    return ALLOWED_EMAILS.includes(email)
}

export function isSuperAdmin(email: string | undefined): boolean {
    return email === SUPER_ADMIN_EMAIL
}

// Create ability from user
export function defineAbilityFor(user: User | null): AppAbility {
    const { can, build } = new AbilityBuilder<AppAbility>(createMongoAbility)

    if (!user || !isAllowedUser(user.email)) {
        // No permissions for unauthenticated or unauthorized users
        return build()
    }

    if (isSuperAdmin(user.email)) {
        // Super admin gets full access
        can('manage', 'all')
    } else {
        // Regular allowed users — can manage menu but not organizations
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
