import { UserDiscount } from '@entities/discounts'
import { Typography, Chip, Box } from '@shared/ui'
import { createColumnHelper } from '@tanstack/react-table'
import { format } from 'date-fns'
import Button from '@mui/material/Button'

const columnHelper = createColumnHelper<UserDiscount>()

export const createColumns = (
    onToggleActive: (discount: UserDiscount) => void,
    onDelete: (discount: UserDiscount) => void,
) => [
        columnHelper.accessor(({ user_id }) => user_id, {
            id: 'user',
            header: 'User',
            cell: ({ row }) => {
                const discount = row.original
                return (
                    <Box>
                        <Typography variant='body2' sx={{ color: '#e2e8f0' }}>
                            {discount.user_name || 'Unknown'}
                        </Typography>
                        <Typography sx={{ color: '#6b7280', fontSize: 11 }}>
                            {discount.user_email || discount.user_id.slice(0, 8) + '…'}
                        </Typography>
                    </Box>
                )
            },
            size: 200,
        }),
        columnHelper.accessor(({ discount_percent }) => discount_percent, {
            id: 'discount_percent',
            header: 'Discount',
            cell: ({ getValue }) => (
                <Chip
                    label={`${getValue()}%`}
                    size="small"
                    sx={{ bgcolor: '#14532d40', color: '#22c55e', fontWeight: 600, fontSize: 13 }}
                />
            ),
            size: 100,
        }),
        columnHelper.accessor(({ label }) => label, {
            id: 'label',
            header: 'Label',
            cell: ({ getValue }) => (
                <Typography sx={{ color: '#9ca3af', fontSize: 13 }}>
                    {getValue() || '—'}
                </Typography>
            ),
            size: 150,
        }),
        columnHelper.accessor(({ is_active }) => is_active, {
            id: 'is_active',
            header: 'Status',
            cell: ({ getValue }) => {
                const active = getValue()
                return (
                    <Chip
                        label={active ? 'Active' : 'Inactive'}
                        size="small"
                        sx={{
                            bgcolor: active ? '#14532d40' : '#7f1d1d40',
                            color: active ? '#22c55e' : '#ef4444',
                            fontWeight: 600,
                            fontSize: 11,
                        }}
                    />
                )
            },
            size: 100,
        }),
        columnHelper.accessor(({ created_at }) => created_at, {
            id: 'created_at',
            header: 'Created',
            cell: ({ getValue }) => (
                <Typography sx={{ color: '#9ca3af', fontSize: 13 }}>
                    {format(new Date(getValue() + 'Z'), 'dd MMM yyyy')}
                </Typography>
            ),
            size: 120,
        }),
        columnHelper.display({
            id: 'actions',
            header: 'Actions',
            cell: ({ row }) => {
                const discount = row.original
                return (
                    <Box display="flex" gap={0.5}>
                        <Button
                            size="medium"
                            onClick={(e) => { e.stopPropagation(); onToggleActive(discount) }}
                            sx={{
                                bgcolor: discount.is_active ? '#854d0e20' : '#14532d40',
                                color: discount.is_active ? '#eab308' : '#22c55e',
                                fontSize: 11,
                                fontWeight: 600,
                                minWidth: 0,
                                px: 1,
                                py: 0.25,
                                textTransform: 'none',
                                '&:hover': { filter: 'brightness(1.3)' },
                            }}
                        >
                            {discount.is_active ? 'Disable' : 'Enable'}
                        </Button>
                        <Button
                            size="medium"
                            onClick={(e) => { e.stopPropagation(); onDelete(discount) }}
                            sx={{
                                bgcolor: '#7f1d1d40',
                                color: '#ef4444',
                                fontSize: 11,
                                fontWeight: 600,
                                minWidth: 0,
                                px: 1,
                                py: 0.25,
                                textTransform: 'none',
                                '&:hover': { filter: 'brightness(1.3)' },
                            }}
                        >
                            ✕
                        </Button>
                    </Box>
                )
            },
            size: 150,
        }),
    ]
