import { useBreakpoint, isMobileBreakpoint } from '@shared/lib'
import { LaptopMenuItemsTable } from './Laptop'
import { MobileMMenuItemsTable } from './MobileM'

export const MenuItemsTable = () => {
    const resolution = useBreakpoint()

    if (isMobileBreakpoint(resolution)) {
        return <MobileMMenuItemsTable />
    }

    return <LaptopMenuItemsTable />
}
