import { AbilityBuilder, createMongoAbility, MongoAbility, MongoQuery } from '@casl/ability'
import { User } from '@supabase/supabase-js'

// Define the subjects (entities) that can be accessed
export type Subjects =
    | 'organizations'
    | 'categories'
    | 'menu_items'
    | 'price_per_size'
    | 'all'

// Define the actions that can be performed
export type Actions = 'read' | 'create' | 'update' | 'delete' | 'manage'

// Define the ability type
export type AppAbility = MongoAbility<[Actions, Subjects], MongoQuery>

// Define conditions type for field-level permissions
export type Conditions = MongoQuery

// Create ability from user
export function defineAbilityFor(user: User | null): AppAbility {
    const { can, build } = new AbilityBuilder<AppAbility>(createMongoAbility)

    if (!user) {
        // No permissions if not logged in
        can('read', 'all')
        return build()
    }

    // Super Admin Check
    if (user.email === 'alibeksopuev@gmail.com') {
        can('manage', 'all')
    } else {
        // Regular authenticated user permissions
        can('read', 'all')
        can('create', 'categories')
    }

    return build()
}

// Helper to check if user can perform action on subject
export function canPerformAction(ability: AppAbility, action: Actions, subject: Subjects): boolean {
    return ability.can(action, subject)
}
