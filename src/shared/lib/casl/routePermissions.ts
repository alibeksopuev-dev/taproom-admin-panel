import type { Actions, Subjects } from './ability'

export interface RoutePermission {
    action: Actions
    subject: Subjects | Subjects[]
}

export const routeCaslPermissions: Record<string, RoutePermission> = {
    '/organizations': { action: 'manage', subject: 'organizations' },
    '/categories': { action: 'read', subject: 'categories' },
    '/menu-categories': { action: 'read', subject: 'menu_items' },
    '/orders': { action: 'read', subject: 'orders' },
    '/discounts': { action: 'read', subject: 'discounts' },
}
