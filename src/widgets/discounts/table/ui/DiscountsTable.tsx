import { useBreakpoint, isMobileBreakpoint } from '@shared/lib'
import { LaptopDiscountsTable } from './Laptop'
import { MobileMDiscountsTable } from './MobileM'

export const DiscountsTable = () => {
    const resolution = useBreakpoint()

    if (isMobileBreakpoint(resolution)) {
        return <MobileMDiscountsTable />
    }

    return <LaptopDiscountsTable />
}
