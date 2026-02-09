import { useBreakpoint, isMobileBreakpoint } from '@shared/lib'
import { LaptopOrganizationsTable } from './Laptop'
import { MobileMOrganizationsTable } from './MobileM'

export const OrganizationsTable = () => {
    const resolution = useBreakpoint()

    if (isMobileBreakpoint(resolution)) {
        return <MobileMOrganizationsTable />
    }

    return <LaptopOrganizationsTable />
}
