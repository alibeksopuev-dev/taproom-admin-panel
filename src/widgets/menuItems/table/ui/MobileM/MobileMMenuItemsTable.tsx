import { useMemo } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { menuItemsApi, MenuItem } from '@entities/menuItems'
import { Typography, Chip, Divider, CircularProgress } from '@mui/material'
import Box from '@mui/material/Box'
import styled from 'styled-components'
import { formatPrice } from '@shared/lib'

const Root = styled.div`
    display: flex;
    flex-direction: column;
    gap: 8px;
`

const Card = styled.div`
    background-color: #0f172a;
    border-radius: 12px;
    padding: 16px 24px;
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

const SubcategoryHeader = styled.div`
    margin-top: 16px;
    margin-bottom: 12px;
    padding-left: 24px;
`

export const MobileMMenuItemsTable = () => {
    const navigate = useNavigate()

    // Get category and search from URL
    const [searchParams] = useSearchParams()
    const selectedCategoryId = searchParams.get('category_id')
    const searchQuery = searchParams.get('search') || ''

    // Fetch menu items for selected category
    const {
        data: menuItemsData,
        isLoading: menuItemsLoading,
    } = menuItemsApi.useGetMenuItemsQuery({
        limit: 1000, // Fetch all items for the category
        offset: 0,
        filters: {
            category_id: selectedCategoryId ?? undefined,
            name: searchQuery || undefined,
        },
    })

    const menuItems = useMemo(() => menuItemsData?.items ?? [], [menuItemsData?.items])

    // Group menu items by subcategory
    const groupedItems = useMemo(() => {
        const groups: Record<string, MenuItem[]> = {}
        menuItems.forEach((item) => {
            const key = item.subcategory || 'main'
            if (!groups[key]) {
                groups[key] = []
            }
            groups[key].push(item)
        })
        return groups
    }, [menuItems])

    // Loading state
    if (menuItemsLoading) {
        return (
            <Loading>
                <CircularProgress size={24} />
            </Loading>
        )
    }

    // Menu items view (grouped by subcategory)
    return (
        <Root>
            {
                menuItems.length === 0 ? (
                    <Box sx={{ p: 4, textAlign: 'center', color: '#9ca3af' }}>
                        <Typography>No menu items in this category</Typography>
                    </Box>
                ) : (
                    <>
                        {Object.entries(groupedItems).map(([subcategory, items]) => (
                            <div key={subcategory}>
                                {subcategory !== 'main' && (
                                    <SubcategoryHeader>
                                        <Typography
                                            variant="subtitle1"
                                            sx={{
                                                fontWeight: 600,
                                                color: '#cbd5e1',
                                                textTransform: 'uppercase',
                                                letterSpacing: '0.05em',
                                                fontSize: '0.875rem',
                                            }}
                                        >
                                            {subcategory}
                                        </Typography>
                                    </SubcategoryHeader>
                                )}

                                {items.map((item) => (
                                    <div key={item.id}>
                                        <Card onClick={() => navigate(`/menu-items/${item.id}/edit`)}>
                                            <CardHeader>
                                                <Box>
                                                    <Typography variant="subtitle1" sx={{ fontWeight: 600, color: '#f1f5f9' }}>
                                                        {item.name}
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
                                                    <Typography variant="body2" sx={{ color: '#9ca3af', mb: 1 }} noWrap>
                                                        {item.description}
                                                    </Typography>
                                                )}
                                                {item.prices && item.prices.length > 0 && (
                                                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 1 }}>
                                                        {item.prices.map((priceOption) => (
                                                            <Chip
                                                                key={priceOption.id}
                                                                size="small"
                                                                label={priceOption.size ? `${priceOption.size} - ${formatPrice(priceOption.price)}` : formatPrice(priceOption.price)}
                                                                sx={{
                                                                    backgroundColor: '#1e293b',
                                                                    color: '#774CFF',
                                                                    fontWeight: 600,
                                                                    fontSize: 12,
                                                                }}
                                                            />
                                                        ))}
                                                    </Box>
                                                )}
                                            </CardBody>
                                        </Card>
                                        <Divider sx={{ backgroundColor: '#334155' }} />
                                    </div>
                                ))}
                            </div>
                        ))}
                    </>
                )
            }
        </Root >
    )
}
