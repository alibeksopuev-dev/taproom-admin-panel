import { useMemo, useState } from 'react'
import { discountsApi, UserDiscount } from '@entities/discounts'
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
    DeleteModal,
} from '@shared/ui'
import { useNavigate } from 'react-router-dom'
import { getCoreRowModel, getPaginationRowModel, useReactTable } from '@tanstack/react-table'
import { createColumns } from '../../model/columns'
import { StyledBodyRow, StyledFooter, StyledHeaderRow, StyledTableContainer, Loading } from './styled'

const DEFAULT_ROWS_PER_PAGE = 10

export const LaptopDiscountsTable = () => {
    const navigate = useNavigate()
    const [page, setPage] = useState(1)
    const [rowsPerPage, setRowsPerPage] = useState(DEFAULT_ROWS_PER_PAGE)
    const [deleteTarget, setDeleteTarget] = useState<UserDiscount | null>(null)

    const [updateDiscount] = discountsApi.useUpdateDiscountMutation()
    const [deleteDiscount] = discountsApi.useDeleteDiscountMutation()

    const handleToggleActive = async (discount: UserDiscount) => {
        try {
            await updateDiscount({ id: discount.id, is_active: !discount.is_active }).unwrap()
        } catch (error) {
            console.error('Failed to toggle discount:', error)
        }
    }

    const handleDelete = async () => {
        if (!deleteTarget) return
        try {
            await deleteDiscount({ id: deleteTarget.id }).unwrap()
            setDeleteTarget(null)
        } catch (error) {
            console.error('Failed to delete discount:', error)
        }
    }

    const columns = useMemo(() => createColumns(handleToggleActive, (d) => setDeleteTarget(d)), [])

    const { data, isLoading } = discountsApi.useGetDiscountsQuery({
        limit: rowsPerPage,
        offset: (page - 1) * rowsPerPage,
    })

    const discounts = useMemo(() => data?.items ?? [], [data?.items])
    const totalCount = data?.count ?? 0

    const table = useReactTable({
        data: discounts,
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

    if (!discounts.length) {
        return (
            <Loading>
                <Box sx={{ p: 4, textAlign: 'center', color: '#9ca3af' }}>
                    <Typography>No discounts found</Typography>
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
                    BodyRow: ({ children, original }: any) => (
                        <StyledBodyRow onClick={() => navigate(`/discounts/${original?.id}`)}>
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
            <DeleteModal
                open={!!deleteTarget}
                onClose={() => setDeleteTarget(null)}
                onConfirm={handleDelete}
                entityName="Discount"
            />
        </>
    )
}
