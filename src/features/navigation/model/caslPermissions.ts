import { Subjects, Actions } from '@shared/lib/casl'

export interface RoutePermission {
    action: Actions
    subject: Subjects | Subjects[]
}

export const routeCaslPermissions: Record<string, RoutePermission> = {
    '/organizations': { action: 'manage', subject: 'organizations' },
    '/categories': { action: 'read', subject: 'categories' },
    '/menu-categories': { action: 'read', subject: 'menu_items' },
}
