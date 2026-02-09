import { useBreakpoint, isMobileBreakpoint } from '@shared/lib'
import { LaptopCategoriesTable } from './Laptop'
import { MobileMCategoriesTable } from './MobileM'

export const CategoriesTable = () => {
    const resolution = useBreakpoint()

    if (isMobileBreakpoint(resolution)) {
        return <MobileMCategoriesTable />
    }

    return <LaptopCategoriesTable />
}
