import { useBreakpoint, isMobileBreakpoint } from '@shared/lib'
import { LaptopMenuCategoriesTable } from './Laptop'
import { MobileMMenuCategoriesTable } from './MobileM'

export const MenuCategoriesTable = () => {
    const resolution = useBreakpoint()

    if (isMobileBreakpoint(resolution)) {
        return <MobileMMenuCategoriesTable />
    }

    return <LaptopMenuCategoriesTable />
}
