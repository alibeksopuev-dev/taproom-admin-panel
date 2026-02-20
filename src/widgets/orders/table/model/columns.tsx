import { Order, OrderStatus } from '@entities/orders'
import { Typography, Chip, Box } from '@shared/ui'
import { createColumnHelper } from '@tanstack/react-table'
import { format } from 'date-fns'
import Button from '@mui/material/Button'

const columnHelper = createColumnHelper<Order>()

const STATUS_COLORS: Record<string, { bg: string; color: string }> = {
    pending: { bg: '#854d0e20', color: '#eab308' },
    paid: { bg: '#14532d40', color: '#22c55e' },
    confirmed: { bg: '#14532d40', color: '#22c55e' },
    preparing: { bg: '#9a340040', color: '#f97316' },
    ready: { bg: '#1e3a5f40', color: '#3b82f6' },
    completed: { bg: '#14532d40', color: '#22c55e' },
    cancelled: { bg: '#7f1d1d40', color: '#ef4444' },
}

const PAYMENT_COLORS: Record<string, { bg: string; color: string }> = {
    unpaid: { bg: '#7f1d1d40', color: '#ef4444' },
    processing: { bg: '#854d0e20', color: '#eab308' },
    paid: { bg: '#14532d40', color: '#22c55e' },
    refunded: { bg: '#581c8740', color: '#a855f7' },
}

const NEXT_STATUS: Partial<Record<OrderStatus, { status: OrderStatus; label: string; bg: string; color: string }>> = {
    pending: { status: 'paid', label: '✓ Confirm', bg: '#14532d40', color: '#22c55e' },
    paid: { status: 'preparing', label: '🍳 Prepare', bg: '#9a340040', color: '#f97316' },
    preparing: { status: 'ready', label: '📦 Ready', bg: '#1e3a5f40', color: '#3b82f6' },
    ready: { status: 'completed', label: '✔ Done', bg: '#581c8740', color: '#a855f7' },
}

export const createColumns = (onStatusChange: (order: Order, status: OrderStatus) => void) => [
    columnHelper.accessor(({ order_number }) => order_number, {
        id: 'order_number',
        header: 'Order ID',
        cell: ({ getValue }) => (
            <Typography variant='body2'>
                {getValue()}
            </Typography>
        ),
        size: 100,
    }),
    columnHelper.accessor(({ items }) => items, {
        id: 'items',
        header: 'Items',
        cell: ({ getValue }) => {
            const items = getValue()
            if (!items || items.length === 0) return <Typography sx={{ color: '#6b7280', fontSize: 12 }}>—</Typography>
            return (
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.25 }}>
                    {items.map((item) => (
                        <Typography key={item.id} sx={{ color: '#e2e8f0', fontSize: 12 }}>
                            {item.item_name}{item.size ? ` (${item.size})` : ''} × {item.quantity}
                        </Typography>
                    ))}
                </Box>
            )
        },
        size: 200,
    }),
    columnHelper.accessor(({ total_amount }) => total_amount, {
        id: 'total_amount',
        header: 'Amount',
        cell: ({ row, getValue }) => {
            const order = row.original
            return (
                <Box>
                    <Typography sx={{ fontWeight: 500, color: '#f1f5f9' }}>
                        {getValue().toLocaleString('en-US')} VND
                    </Typography>
                    {!!order.discount_percent && !!order.discount_amount && order.discount_amount > 0 && (
                        <Typography sx={{ color: '#22c55e', fontSize: 11 }}>
                            -{order.discount_amount.toLocaleString('en-US')} VND ({order.discount_percent}%)
                        </Typography>
                    )}
                </Box>
            )
        },
        size: 130,
    }),
    columnHelper.accessor(({ payment_method }) => payment_method, {
        id: 'payment_method',
        header: 'Method',
        cell: ({ getValue }) => (
            <Typography sx={{ color: '#9ca3af', fontSize: 13 }}>
                {getValue() || '—'}
            </Typography>
        ),
        size: 100,
    }),
    columnHelper.accessor(({ created_at }) => created_at, {
        id: 'created_at',
        header: 'Time',
        cell: ({ getValue }) => (
            <Typography sx={{ color: '#9ca3af', fontSize: 13 }}>
                {format(new Date(getValue() + 'Z'), 'HH:mm')}
            </Typography>
        ),
        size: 120,
    }),
    columnHelper.accessor(({ status }) => status, {
        id: 'status',
        header: 'Status',
        cell: ({ getValue }) => {
            const status = getValue()
            const colors = STATUS_COLORS[status] ?? { bg: '#33415540', color: '#94a3b8' }
            return (
                <Chip
                    label={status}
                    size="small"
                    sx={{ bgcolor: colors.bg, color: colors.color, fontWeight: 600, fontSize: 11 }}
                />
            )
        },
        size: 100,
    }),
    columnHelper.accessor(({ payment_status }) => payment_status, {
        id: 'payment_status',
        header: 'Payment',
        cell: ({ getValue }) => {
            const status = getValue()
            const colors = PAYMENT_COLORS[status] ?? { bg: '#33415540', color: '#94a3b8' }
            return (
                <Chip
                    label={status}
                    size="small"
                    sx={{ bgcolor: colors.bg, color: colors.color, fontWeight: 600, fontSize: 11 }}
                />
            )
        },
        size: 100,
    }),
    columnHelper.display({
        id: 'actions',
        header: 'Actions',
        cell: ({ row }) => {
            const order = row.original
            const next = NEXT_STATUS[order.status]
            const hasActions = next || (order.status !== 'completed' && order.status !== 'cancelled')

            if (!hasActions) {
                return (
                    <Typography sx={{ color: '#6b7280', fontSize: 13, px: 1 }}>
                        N/A
                    </Typography>
                )
            }

            return (
                <Box display="flex" gap={0.5}>
                    {next && (
                        <Button
                            size="medium"
                            onClick={(e) => { e.stopPropagation(); onStatusChange(order, next.status) }}
                            sx={{
                                bgcolor: next.bg,
                                color: next.color,
                                fontSize: 11,
                                fontWeight: 600,
                                minWidth: 0,
                                px: 1,
                                py: 0.25,
                                textTransform: 'none',
                                '&:hover': { bgcolor: next.bg, filter: 'brightness(1.3)' },
                            }}
                        >
                            {next.label}
                        </Button>
                    )}
                    {order.status !== 'completed' && order.status !== 'cancelled' && (
                        <Button
                            size="medium"
                            onClick={(e) => { e.stopPropagation(); onStatusChange(order, 'cancelled') }}
                            sx={{
                                bgcolor: '#7f1d1d40',
                                color: '#ef4444',
                                fontSize: 11,
                                fontWeight: 600,
                                minWidth: 0,
                                px: 1,
                                py: 0.25,
                                textTransform: 'none',
                                '&:hover': { bgcolor: '#7f1d1d40', filter: 'brightness(1.3)' },
                            }}
                        >
                            ✕
                        </Button>
                    )}
                </Box>
            )
        },
        size: 150,
    }),
]
