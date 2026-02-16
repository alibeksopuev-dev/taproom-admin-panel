import { useBreakpoint, isMobileBreakpoint } from '@shared/lib'
import { LaptopOrdersTable } from './Laptop'
import { MobileMOrdersTable } from './MobileM'

export const OrdersTable = () => {
    const resolution = useBreakpoint()

    if (isMobileBreakpoint(resolution)) {
        return <MobileMOrdersTable />
    }

    return <LaptopOrdersTable />
}
