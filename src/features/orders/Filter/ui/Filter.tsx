import { OrderStatus, PaymentStatus } from '@entities/orders'
import { useSearchParams } from 'react-router-dom'
import { Autocomplete, FilterDrawer, DrawerContent, IconButton, Box, Button } from '@shared/ui'
import MenuItem from '@mui/material/MenuItem'
import Typography from '@mui/material/Typography'
import { Filter as FilterIcon, X } from 'lucide-react'

type FilterOption<T extends string> = {
    value: T | ''
    label: string
}

const ORDER_STATUSES: FilterOption<OrderStatus>[] = [
    { value: '', label: 'All statuses' },
    { value: 'pending', label: 'Pending' },
    { value: 'paid', label: 'Paid' },
    { value: 'preparing', label: 'Preparing' },
    { value: 'ready', label: 'Ready' },
    { value: 'completed', label: 'Completed' },
    { value: 'cancelled', label: 'Cancelled' },
]

const PAYMENT_STATUSES: FilterOption<PaymentStatus>[] = [
    { value: '', label: 'All payments' },
    { value: 'unpaid', label: 'Unpaid' },
    { value: 'processing', label: 'Processing' },
    { value: 'paid', label: 'Paid' },
    { value: 'refunded', label: 'Refunded' },
]

export const Filter = () => {
    const [searchParams, setSearchParams] = useSearchParams()
    const statusFilter = searchParams.get('status') || ''
    const paymentFilter = searchParams.get('payment_status') || ''

    const handleApply = (status: string, payment: string) => {
        const newParams = new URLSearchParams(searchParams)
        if (status) {
            newParams.set('status', status)
        } else {
            newParams.delete('status')
        }
        if (payment) {
            newParams.set('payment_status', payment)
        } else {
            newParams.delete('payment_status')
        }
        setSearchParams(newParams)
    }

    return (
        <FilterDrawer
            render={({ onClose }) => {
                let localStatus = statusFilter
                let localPayment = paymentFilter

                return (
                    <DrawerContent
                        header={{
                            title: 'Filters',
                            action: (
                                <IconButton onClick={onClose} size="large">
                                    <X size={14} color="#9CA3AF" />
                                </IconButton>
                            ),
                        }}
                        content={
                            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                                <Box>
                                    <Autocomplete
                                        options={ORDER_STATUSES}
                                        value={ORDER_STATUSES.find(o => o.value === statusFilter) || ORDER_STATUSES[0]}
                                        onChange={(_, newValue) => {
                                            localStatus = newValue?.value || ''
                                        }}
                                        getOptionLabel={(option) => option.label}
                                        label="Order Status"
                                        isOptionEqualToValue={(option, value) => option.value === value.value}
                                        renderOption={(props, option) => (
                                            <MenuItem {...props} key={option.value}>
                                                {option.label}
                                            </MenuItem>
                                        )}
                                    />
                                </Box>
                                <Box>
                                    <Autocomplete
                                        options={PAYMENT_STATUSES}
                                        value={PAYMENT_STATUSES.find(o => o.value === paymentFilter) || PAYMENT_STATUSES[0]}
                                        onChange={(_, newValue) => {
                                            localPayment = newValue?.value || ''
                                        }}
                                        getOptionLabel={(option) => option.label}
                                        label="Payment Status"
                                        isOptionEqualToValue={(option, value) => option.value === value.value}
                                        renderOption={(props, option) => (
                                            <MenuItem {...props} key={option.value}>
                                                {option.label}
                                            </MenuItem>
                                        )}
                                    />
                                </Box>
                            </Box>
                        }
                        action={
                            <Button
                                fullWidth
                                variant="contained"
                                onClick={() => {
                                    handleApply(localStatus, localPayment)
                                    onClose()
                                }}
                                sx={{
                                    height: '48px',
                                    bgcolor: '#774CFF',
                                    '&:hover': { bgcolor: '#6a3de8' },
                                }}
                            >
                                <Typography>Apply</Typography>
                            </Button>
                        }
                    />
                )
            }}
        >
            <Button
                startIcon={<FilterIcon size={16} />}
                variant="text"
                sx={{ color: '#94a3b8', textTransform: 'none' }}
            >
                <Typography sx={{ fontWeight: 600, fontSize: 14 }}>Filters</Typography>
            </Button>
        </FilterDrawer>
    )
}
