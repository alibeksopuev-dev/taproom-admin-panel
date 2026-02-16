import { Header as UiHeader } from '@shared/ui'
import { Filter } from '@features/orders/Filter'

export const Header = () => {
    return (
        <UiHeader
            title="Orders"
            action={<Filter />}
        />
    )
}
