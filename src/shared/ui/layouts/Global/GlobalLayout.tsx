import { useBreakpoint, isMobileBreakpoint } from '@shared/lib'
import { LaptopGlobalLayout } from './Laptop'
import { MobileMGlobalLayout } from './MobileM'

export const GlobalLayout = () => {
    const resolution = useBreakpoint()

    if (isMobileBreakpoint(resolution)) {
        return <MobileMGlobalLayout />
    }

    return <LaptopGlobalLayout />
}
