import { useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
import { ordersApi, Order, OrderStatus, PaymentStatus } from '@entities/orders'
import { Typography, Chip, CircularProgress } from '@mui/material'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import styled from 'styled-components'
import { format } from 'date-fns'

const Root = styled.div`
    display: flex;
    flex-direction: column;
    gap: 8px;
`

const Card = styled.div`
    background-color: #0f172a;
    padding: 16px 24px;
    border-bottom: 1px solid #334155;
`

const CardHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 8px;
`

const CardBody = styled.div`
    display: flex;
    flex-direction: column;
    gap: 8px;
`

const Loading = styled.div`
    display: flex;
    justify-content: center;
    padding: 16px;
`

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
    pending: { status: 'paid', label: '✓ Confirm Payment', bg: '#14532d40', color: '#22c55e' },
    paid: { status: 'preparing', label: '🍳 Start Preparing', bg: '#9a340040', color: '#f97316' },
    preparing: { status: 'ready', label: '📦 Mark Ready', bg: '#1e3a5f40', color: '#3b82f6' },
    ready: { status: 'completed', label: '✔ Complete', bg: '#581c8740', color: '#a855f7' },
}

export const MobileMOrdersTable = () => {
    const [searchParams] = useSearchParams()
    const statusFilter = searchParams.get('status') || ''
    const paymentFilter = searchParams.get('payment_status') || ''

    const [updateStatus] = ordersApi.useUpdateOrderStatusMutation()

    const { data, isLoading } = ordersApi.useGetOrdersQuery({
        limit: 50,
        offset: 0,
        filters: {
            ...(statusFilter ? { status: statusFilter as OrderStatus } : {}),
            ...(paymentFilter ? { payment_status: paymentFilter as PaymentStatus } : {}),
        },
    }, {
        pollingInterval: 15000,
    })

    const orders = useMemo(() => data?.items ?? [], [data?.items])

    const handleStatusChange = async (order: Order, newStatus: OrderStatus) => {
        try {
            await updateStatus({ id: order.id, status: newStatus }).unwrap()
        } catch (error) {
            console.error('Failed to update order status:', error)
        }
    }

    if (isLoading) {
        return (
            <Loading>
                <CircularProgress size={24} />
            </Loading>
        )
    }

    return (
        <Root>
            {orders.length === 0 ? (
                <Box sx={{ p: 4, textAlign: 'center', color: '#9ca3af' }}>
                    <Typography>No orders found</Typography>
                </Box>
            ) : (
                orders.map((order) => {
                    const statusColors = STATUS_COLORS[order.status] ?? { bg: '#33415540', color: '#94a3b8' }
                    const paymentColors = PAYMENT_COLORS[order.payment_status] ?? { bg: '#33415540', color: '#94a3b8' }
                    const next = NEXT_STATUS[order.status]

                    return (
                        <Card key={order.id}>
                            <CardHeader>
                                <Box>
                                    <Typography sx={{ color: '#9ca3af', fontSize: 13 }} mb={0.5}>
                                        {order.order_number}
                                    </Typography>
                                    {order.items && order.items.length > 0 && (
                                        <Box>
                                            {order.items.map((item) => (
                                                <Typography key={item.id} sx={{ fontSize: 13 }}>
                                                    {item.item_name}{item.size ? ` (${item.size})` : ''} × {item.quantity}
                                                </Typography>
                                            ))}
                                        </Box>
                                    )}
                                    <Typography sx={{ color: '#9ca3af', fontSize: 11 }}>
                                        {format(new Date(order.created_at + 'Z'), 'HH:mm')}
                                    </Typography>
                                </Box>
                                <Chip
                                    size="small"
                                    label={order.status}
                                    sx={{ bgcolor: statusColors.bg, color: statusColors.color, fontWeight: 600 }}
                                />
                            </CardHeader>
                            <CardBody>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <Box>
                                        <Typography sx={{ fontWeight: 500, color: '#f1f5f9' }}>
                                            {order.total_amount.toLocaleString('en-US')} VND
                                        </Typography>
                                        {!!order.discount_percent && !!order.discount_amount && order.discount_amount > 0 && (
                                            <Typography sx={{ color: '#22c55e', fontSize: 11 }}>
                                                -{order.discount_amount.toLocaleString('en-US')} VND ({order.discount_percent}%)
                                            </Typography>
                                        )}
                                    </Box>
                                    <Box sx={{ display: 'flex', gap: 0.5 }}>
                                        <Chip
                                            size="small"
                                            label={order.payment_status}
                                            sx={{ bgcolor: paymentColors.bg, color: paymentColors.color, fontWeight: 600, fontSize: 11 }}
                                        />
                                        {/* {order.payment_method && (
                                            <Chip
                                                size="small"
                                                label={order.payment_method}
                                                sx={{ bgcolor: '#1e293b', color: '#94a3b8', fontSize: 11 }}
                                            />
                                        )} */}
                                    </Box>
                                </Box>
                                <Box sx={{ display: 'flex', gap: 1, mt: 0.5 }}>
                                    {next && (
                                        <Button
                                            size="small"
                                            fullWidth
                                            onClick={() => handleStatusChange(order, next.status)}
                                            sx={{
                                                bgcolor: next.bg,
                                                color: next.color,
                                                fontSize: 12,
                                                fontWeight: 600,
                                                textTransform: 'none',
                                                '&:hover': { bgcolor: next.bg, filter: 'brightness(1.3)' },
                                            }}
                                        >
                                            {next.label}
                                        </Button>
                                    )}
                                    {order.status !== 'completed' && order.status !== 'cancelled' && (
                                        <Button
                                            size="small"
                                            onClick={() => handleStatusChange(order, 'cancelled')}
                                            sx={{
                                                bgcolor: '#7f1d1d40',
                                                color: '#ef4444',
                                                fontSize: 12,
                                                fontWeight: 600,
                                                minWidth: 44,
                                                textTransform: 'none',
                                                '&:hover': { bgcolor: '#7f1d1d40', filter: 'brightness(1.3)' },
                                            }}
                                        >
                                            ✕
                                        </Button>
                                    )}
                                </Box>
                            </CardBody>
                        </Card>
                    )
                })
            )}
        </Root>
    )
}