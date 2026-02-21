import { useMemo, useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { ordersApi, Order, OrderStatus, PaymentStatus } from '@entities/orders'
import {
    MuiTable,
    MuiTableCell,
    MuiTableHead,
    Pagination,
    SelectRowsPerPage,
    TableV2,
    TableSkeleton,
    Box,
    Typography,
} from '@shared/ui'
import { Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material'
import Button from '@mui/material/Button'
import { getCoreRowModel, getPaginationRowModel, useReactTable } from '@tanstack/react-table'
import { createColumns } from '../../model/columns'
import { StyledBodyRow, StyledFooter, StyledHeaderRow, StyledTableContainer, Loading } from './styled'

const DEFAULT_ROWS_PER_PAGE = 10
const DISCOUNT_PRESETS = [5, 10, 15, 20]

export const LaptopOrdersTable = () => {
    const [page, setPage] = useState(1)
    const [rowsPerPage, setRowsPerPage] = useState(DEFAULT_ROWS_PER_PAGE)

    const [searchParams] = useSearchParams()
    const statusFilter = searchParams.get('status') || ''
    const paymentFilter = searchParams.get('payment_status') || ''

    const [updateStatus] = ordersApi.useUpdateOrderStatusMutation()
    const [applyDiscount, { isLoading: isApplyingDiscount }] = ordersApi.useApplyOrderDiscountMutation()

    const [discountTarget, setDiscountTarget] = useState<Order | null>(null)

    const handleStatusChange = async (order: Order, newStatus: OrderStatus) => {
        try {
            await updateStatus({ id: order.id, status: newStatus }).unwrap()
        } catch (error) {
            console.error('Failed to update order status:', error)
        }
    }

    const handleApplyDiscount = async (percent: number) => {
        if (!discountTarget) return
        try {
            await applyDiscount({
                id: discountTarget.id,
                discount_percent: percent,
                total_amount: discountTarget.total_amount,
            }).unwrap()
            setDiscountTarget(null)
        } catch (error) {
            console.error('Failed to apply discount:', error)
        }
    }

    const columns = useMemo(() => createColumns(
        handleStatusChange,
        (order) => setDiscountTarget(order),
    ), [])

    const { data, isLoading } = ordersApi.useGetOrdersQuery({
        limit: rowsPerPage,
        offset: (page - 1) * rowsPerPage,
        filters: {
            ...(statusFilter ? { status: statusFilter as OrderStatus } : {}),
            ...(paymentFilter ? { payment_status: paymentFilter as PaymentStatus } : {}),
        },
    }, {
        pollingInterval: 15000,
    })

    useEffect(() => {
        setPage(1)
    }, [statusFilter, paymentFilter])

    const orders = useMemo(() => data?.items ?? [], [data?.items])
    const totalCount = data?.count ?? 0

    const table = useReactTable({
        data: orders,
        columns,
        rowCount: totalCount,
        manualPagination: true,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        state: {
            pagination: {
                pageIndex: page - 1,
                pageSize: rowsPerPage,
            },
        },
    })

    const rowsCount = `${Math.min((page - 1) * rowsPerPage + 1, totalCount)}-${Math.min(page * rowsPerPage, totalCount)} of ${totalCount}`

    if (isLoading) {
        return <TableSkeleton columnsCount={columns.length} />
    }

    if (!orders.length) {
        return (
            <Loading>
                <Box sx={{ p: 4, textAlign: 'center', color: '#9ca3af' }}>
                    <Typography>No orders found</Typography>
                </Box>
            </Loading>
        )
    }

    return (
        <>
            <TableV2
                table={table}
                components={{
                    TableContainer: StyledTableContainer,
                    Table: ({ children }) => <MuiTable stickyHeader>{children}</MuiTable>,
                    Header: MuiTableHead,
                    HeaderRow: StyledHeaderRow,
                    HeaderCell: ({ children, original }) => (
                        <MuiTableCell
                            sx={{
                                color: '#9ca3af',
                                backgroundColor: '#1e293b',
                                borderBottom: '1px solid #334155',
                                width: original?.getSize(),
                                position: 'relative',
                            }}
                        >
                            {children}
                        </MuiTableCell>
                    ),
                    BodyRow: ({ children }) => (
                        <StyledBodyRow>
                            {children}
                        </StyledBodyRow>
                    ),
                    BodyCell: ({ children, original }) => (
                        <MuiTableCell
                            sx={{
                                borderBottom: '1px solid #334155',
                                width: original?.column.getSize(),
                            }}
                        >
                            {children}
                        </MuiTableCell>
                    ),
                    FooterContainer: StyledFooter,
                    Pagination: () => (
                        <>
                            <SelectRowsPerPage
                                rowsCount={rowsCount}
                                rowsPerPage={rowsPerPage}
                                onRowsPerPageChange={(newRowsPerPage) => {
                                    setRowsPerPage(newRowsPerPage)
                                    setPage(1)
                                }}
                            />
                            <Pagination
                                count={table.getPageCount() || 0}
                                page={page}
                                onChange={(_, newPage) => setPage(newPage)}
                            />
                        </>
                    ),
                }}
            />

            {/* Discount Dialog */}
            <Dialog
                open={!!discountTarget}
                onClose={() => setDiscountTarget(null)}
                PaperProps={{
                    sx: {
                        bgcolor: '#1e293b',
                        color: '#f1f5f9',
                        borderRadius: 3,
                        minWidth: 300,
                    },
                }}
            >
                <DialogTitle sx={{ pb: 1 }}>
                    Apply Discount
                    {discountTarget && (
                        <Typography sx={{ color: '#9ca3af', fontSize: 13 }}>
                            {discountTarget.order_number} · {discountTarget.total_amount.toLocaleString('en-US')} VND
                        </Typography>
                    )}
                </DialogTitle>
                <DialogContent>
                    <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', pt: 1 }}>
                        {DISCOUNT_PRESETS.map((percent) => (
                            <Button
                                key={percent}
                                variant="outlined"
                                disabled={isApplyingDiscount}
                                onClick={() => handleApplyDiscount(percent)}
                                sx={{
                                    flex: 1,
                                    minWidth: 60,
                                    color: '#22c55e',
                                    borderColor: '#22c55e40',
                                    fontWeight: 600,
                                    '&:hover': { borderColor: '#22c55e', bgcolor: '#14532d40' },
                                }}
                            >
                                {percent}%
                            </Button>
                        ))}
                    </Box>
                </DialogContent>
                <DialogActions sx={{ px: 3, pb: 2 }}>
                    <Button
                        onClick={() => setDiscountTarget(null)}
                        sx={{ color: '#9ca3af', textTransform: 'none' }}
                    >
                        Cancel
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    )
}
