import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Header,
    Button,
    Pagination,
    Box,
    Chip,
    Typography,
    TableSkeleton,
} from '@shared/ui'
import { Plus } from '@shared/ui/icons'
import { categoriesApi } from '@entities/categories'
import { dateHelpers } from '@shared/lib'

const Root = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`

const TableWrapper = styled.div`
  flex: 1;
  overflow: auto;
`

const StyledTableRow = styled(TableRow)`
  cursor: pointer;
  &:hover {
    background-color: rgba(119, 76, 255, 0.08);
  }
`

const Footer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 24px;
  border-top: 1px solid #334155;
`

const ROWS_PER_PAGE = 10

export const Categories = () => {
    const navigate = useNavigate()
    const [page, setPage] = useState(1)

    const { data, isLoading, isFetching } = categoriesApi.useGetCategoriesQuery({
        limit: ROWS_PER_PAGE,
        offset: (page - 1) * ROWS_PER_PAGE,
    })

    const categories = data?.items ?? []
    const totalCount = data?.count ?? 0
    const pageCount = Math.ceil(totalCount / ROWS_PER_PAGE)

    const handleRowClick = (id: string) => {
        navigate(`/categories/${id}`)
    }

    return (
        <Root>
            <Header
                title="Categories"
                action={
                    <Button
                        variant="contained"
                        startIcon={<Plus color="#fff" />}
                        onClick={() => navigate('/categories/create')}
                    >
                        Add Category
                    </Button>
                }
            />

            <TableWrapper>
                {isLoading || isFetching ? (
                    <TableSkeleton columnsCount={5} />
                ) : categories.length === 0 ? (
                    <Box sx={{ p: 4, textAlign: 'center', color: '#9ca3af' }}>
                        <Typography>No categories found</Typography>
                    </Box>
                ) : (
                    <TableContainer>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Name</TableCell>
                                    <TableCell>Slug</TableCell>
                                    <TableCell>Icon</TableCell>
                                    <TableCell>Order</TableCell>
                                    <TableCell>Created</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {categories.map((category) => (
                                    <StyledTableRow
                                        key={category.id}
                                        onClick={() => handleRowClick(category.id)}
                                    >
                                        <TableCell>
                                            <Typography sx={{ fontWeight: 500, color: '#f1f5f9' }}>
                                                {category.name}
                                            </Typography>
                                        </TableCell>
                                        <TableCell>
                                            <Typography sx={{ color: '#9ca3af' }}>
                                                {category.slug}
                                            </Typography>
                                        </TableCell>
                                        <TableCell>
                                            <span style={{ fontSize: 20 }}>{category.icon || '📋'}</span>
                                        </TableCell>
                                        <TableCell>
                                            <Chip
                                                label={category.display_order ?? 0}
                                                size="small"
                                                sx={{ bgcolor: '#334155' }}
                                            />
                                        </TableCell>
                                        <TableCell>
                                            <Typography sx={{ color: '#9ca3af', fontSize: 13 }}>
                                                {dateHelpers.formatDate(category.created_at)}
                                            </Typography>
                                        </TableCell>
                                    </StyledTableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                )}
            </TableWrapper>

            <Footer>
                <Typography sx={{ color: '#9ca3af', fontSize: 14 }}>
                    {totalCount} {totalCount === 1 ? 'category' : 'categories'}
                </Typography>
                {pageCount > 1 && (
                    <Pagination
                        count={pageCount}
                        page={page}
                        onChange={(_, newPage) => setPage(newPage)}
                    />
                )}
            </Footer>
        </Root>
    )
}
