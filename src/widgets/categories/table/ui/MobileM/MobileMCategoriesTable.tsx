import { useMemo, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useInView } from 'react-intersection-observer'
import { categoriesApi, Category } from '@entities/categories'
import { Box, Typography, Chip, Divider, CircularProgress } from '@mui/material'
import styled from 'styled-components'
import dayjs from 'dayjs'

const Root = styled.div`
    display: flex;
    flex-direction: column;
    gap: 8px;
`

const Card = styled.div`
    background-color: #0f172a;
    border-radius: 12px;
    padding: 16px;
    cursor: pointer;
    transition: background-color 0.2s;

    &:hover {
        background-color: rgba(119, 76, 255, 0.04);
    }
`

const CardHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 8px;
`

const CardBody = styled.div`
    display: flex;
    flex-direction: column;
    gap: 4px;
`

const Loading = styled.div`
    display: flex;
    justify-content: center;
    padding: 16px;
`

const LIMIT = 10

export const MobileMCategoriesTable = () => {
    const navigate = useNavigate()
    const { ref, inView } = useInView({
        threshold: 0.1,
    })

    const [offset, setOffset] = useState(0)
    const [allCategories, setAllCategories] = useState<Category[]>([])
    const [hasMore, setHasMore] = useState(true)

    const { data, isLoading, isFetching } = categoriesApi.useGetCategoriesQuery({
        limit: LIMIT,
        offset,
    })

    const categories = useMemo(() => data?.items ?? [], [data?.items])
    const totalCount = data?.count ?? 0

    useEffect(() => {
        if (categories.length > 0) {
            setAllCategories(prev => {
                const existingIds = new Set(prev.map(c => c.id))
                const newCategories = categories.filter(c => !existingIds.has(c.id))
                return [...prev, ...newCategories]
            })
            setHasMore(allCategories.length + categories.length < totalCount)
        }
    }, [categories, totalCount, allCategories.length])

    useEffect(() => {
        if (inView && hasMore && !isFetching) {
            setOffset(prev => prev + LIMIT)
        }
    }, [inView, hasMore, isFetching])

    if (isLoading && allCategories.length === 0) {
        return (
            <Loading>
                <CircularProgress size={24} />
            </Loading>
        )
    }

    if (allCategories.length === 0) {
        return (
            <Box sx={{ p: 4, textAlign: 'center', color: '#9ca3af' }}>
                <Typography>No categories found</Typography>
            </Box>
        )
    }

    return (
        <Root>
            {allCategories.map((category) => (
                <div key={category.id}>
                    <Card onClick={() => navigate(`/categories/${category.id}`)}>
                        <CardHeader>
                            <Typography variant="subtitle1" sx={{ fontWeight: 600, color: '#f1f5f9' }}>
                                {category.name}
                            </Typography>
                            <Chip
                                size="small"
                                label={category.slug}
                                sx={{
                                    backgroundColor: 'rgba(119, 76, 255, 0.12)',
                                    color: '#774CFF',
                                    fontWeight: 600,
                                }}
                            />
                        </CardHeader>
                        <CardBody>
                            <Typography variant="body2" sx={{ color: '#9ca3af' }}>
                                {dayjs(category.created_at).format('D MMM, YYYY h:mm A')}
                            </Typography>
                        </CardBody>
                    </Card>
                    <Divider sx={{ backgroundColor: '#334155' }} />
                </div>
            ))}

            {hasMore && (
                <div ref={ref} style={{ height: 1 }}>
                    {isFetching && (
                        <Loading>
                            <CircularProgress size={20} />
                        </Loading>
                    )}
                </div>
            )}
        </Root>
    )
}
