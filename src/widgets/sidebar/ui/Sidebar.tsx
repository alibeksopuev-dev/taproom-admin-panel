import { Sidebar as SidebarUI } from '@shared/ui'
import { Navigation } from '@features/navigation'
import { LogoutButton } from '@features/auth'

export const Sidebar = () => {
    return (
        <SidebarUI
            navigation={<Navigation />}
            footer={<LogoutButton />}
        />
    )
}
