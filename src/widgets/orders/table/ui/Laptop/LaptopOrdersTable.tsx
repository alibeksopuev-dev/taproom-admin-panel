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
import { getCoreRowModel, getPaginationRowModel, useReactTable } from '@tanstack/react-table'
import { createColumns } from '../../model/columns'
import { StyledBodyRow, StyledFooter, StyledHeaderRow, StyledTableContainer, Loading } from './styled'

const DEFAULT_ROWS_PER_PAGE = 10

export const LaptopOrdersTable = () => {
    const [page, setPage] = useState(1)
    const [rowsPerPage, setRowsPerPage] = useState(DEFAULT_ROWS_PER_PAGE)

    const [searchParams] = useSearchParams()
    const statusFilter = searchParams.get('status') || ''
    const paymentFilter = searchParams.get('payment_status') || ''

    const [updateStatus] = ordersApi.useUpdateOrderStatusMutation()

    const handleStatusChange = async (order: Order, newStatus: OrderStatus) => {
        try {
            await updateStatus({ id: order.id, status: newStatus }).unwrap()
        } catch (error) {
            console.error('Failed to update order status:', error)
        }
    }

    const columns = useMemo(() => createColumns(handleStatusChange), [])

    const { data, isLoading, isFetching } = ordersApi.useGetOrdersQuery({
        limit: rowsPerPage,
        offset: (page - 1) * rowsPerPage,
        filters: {
            ...(statusFilter ? { status: statusFilter as OrderStatus } : {}),
            ...(paymentFilter ? { payment_status: paymentFilter as PaymentStatus } : {}),
        },
    }, {
        pollingInterval: 10000,
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

    if (isLoading || isFetching) {
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
    )
}
