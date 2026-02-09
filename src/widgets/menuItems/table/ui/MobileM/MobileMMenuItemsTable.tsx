import { useMemo, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useInView } from 'react-intersection-observer'
import { menuItemsApi, MenuItem } from '@entities/menuItems'
import { Typography, Chip, Divider, CircularProgress } from '@mui/material'
import Box from '@mui/material/Box'
import styled from 'styled-components'
import dayjs from 'dayjs'
import { formatPrice } from '@shared/lib'

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
    align-items: flex-start;
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

export const MobileMMenuItemsTable = () => {
    const navigate = useNavigate()
    const { ref, inView } = useInView({
        threshold: 0.1,
    })

    const [offset, setOffset] = useState(0)
    const [allMenuItems, setAllMenuItems] = useState<MenuItem[]>([])
    const [hasMore, setHasMore] = useState(true)

    const { data, isLoading, isFetching } = menuItemsApi.useGetMenuItemsQuery({
        limit: LIMIT,
        offset,
    })

    const menuItems = useMemo(() => data?.items ?? [], [data?.items])
    const totalCount = data?.count ?? 0

    useEffect(() => {
        if (menuItems.length > 0) {
            setAllMenuItems(prev => {
                const existingIds = new Set(prev.map(m => m.id))
                const newItems = menuItems.filter(m => !existingIds.has(m.id))
                return [...prev, ...newItems]
            })
            setHasMore(allMenuItems.length + menuItems.length < totalCount)
        }
    }, [menuItems, totalCount, allMenuItems.length])

    useEffect(() => {
        if (inView && hasMore && !isFetching) {
            setOffset(prev => prev + LIMIT)
        }
    }, [inView, hasMore, isFetching])

    if (isLoading && allMenuItems.length === 0) {
        return (
            <Loading>
                <CircularProgress size={24} />
            </Loading>
        )
    }

    if (allMenuItems.length === 0) {
        return (
            <Box sx={{ p: 4, textAlign: 'center', color: '#9ca3af' }}>
                <Typography>No menu items found</Typography>
            </Box>
        )
    }

    const getPrice = (item: MenuItem) => {
        const prices = item.prices || []
        if (prices.length === 0) return '-'
        const firstPrice = prices[0]
        return formatPrice(firstPrice.price)
    }

    return (
        <Root>
            {allMenuItems.map((item) => (
                <div key={item.id}>
                    <Card onClick={() => navigate(`/menu-items/${item.id}`)}>
                        <CardHeader>
                            <Box>
                                <Typography variant="subtitle1" sx={{ fontWeight: 600, color: '#f1f5f9' }}>
                                    {item.name}
                                </Typography>
                                <Typography variant="body2" sx={{ color: '#774CFF', fontWeight: 600 }}>
                                    {getPrice(item)}
                                </Typography>
                            </Box>
                            <Chip
                                size="small"
                                label={!item.is_disabled ? 'Available' : 'Unavailable'}
                                sx={{
                                    backgroundColor: !item.is_disabled ? '#14532d' : '#7f1d1d',
                                    color: !item.is_disabled ? '#86efac' : '#fca5a5',
                                    fontWeight: 600,
                                }}
                            />
                        </CardHeader>
                        <CardBody>
                            {item.description && (
                                <Typography variant="body2" sx={{ color: '#9ca3af', mb: 0.5 }} noWrap>
                                    {item.description}
                                </Typography>
                            )}
                            <Typography variant="body2" sx={{ color: '#9CA3AF' }}>
                                {dayjs(item.created_at).format('D MMM, YYYY h:mm A')}
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
