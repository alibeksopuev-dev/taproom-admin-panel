import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { categoriesApi } from '@entities/categories'
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
import { columns } from '../../model/columns'
import { StyledBodyRow, StyledFooter, StyledHeaderRow, StyledTableContainer, Loading } from './styled'

const DEFAULT_ROWS_PER_PAGE = 10

export const LaptopCategoriesTable = () => {
    const navigate = useNavigate()
    const [page, setPage] = useState(1)
    const [rowsPerPage, setRowsPerPage] = useState(DEFAULT_ROWS_PER_PAGE)

    const { data, isLoading, isFetching } = categoriesApi.useGetCategoriesQuery({
        limit: rowsPerPage,
        offset: (page - 1) * rowsPerPage,
    })

    const categories = useMemo(() => data?.items ?? [], [data?.items])
    const totalCount = data?.count ?? 0

    const table = useReactTable({
        data: categories,
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

    if (!categories.length) {
        return (
            <Loading>
                <Box sx={{ p: 4, textAlign: 'center', color: '#9ca3af' }}>
                    <Typography>No categories found</Typography>
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
                BodyRow: ({ children, original }) => (
                    <StyledBodyRow onClick={() => navigate(`/categories/${(original as { id: string })?.id}`)}>
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
