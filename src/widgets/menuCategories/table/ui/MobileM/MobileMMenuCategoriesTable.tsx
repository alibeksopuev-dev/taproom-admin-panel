import { useMemo, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useInView } from 'react-intersection-observer'
import { categoriesApi, Category } from '@entities/categories'
import { Typography, Chip, Divider, CircularProgress } from '@mui/material'
import Box from '@mui/material/Box'
import { Root, Card, CardHeader, Loading } from './styled'

const LIMIT = 10

export const MobileMMenuCategoriesTable = () => {
    const navigate = useNavigate()
    const { ref, inView } = useInView({
        threshold: 0.1,
    })

    const [categoryOffset, setCategoryOffset] = useState(0)
    const [allCategories, setAllCategories] = useState<Category[]>([])
    const [hasMoreCategories, setHasMoreCategories] = useState(true)

    const {
        data: categoriesData,
        isLoading: categoriesLoading,
        isFetching: categoriesFetching,
    } = categoriesApi.useGetCategoriesQuery({
        limit: LIMIT,
        offset: categoryOffset,
    })

    const categories = useMemo(() => categoriesData?.items ?? [], [categoriesData?.items])
    const categoriesCount = categoriesData?.count ?? 0

    // Handle categories infinite scroll
    useEffect(() => {
        if (categories.length > 0) {
            setAllCategories((prev) => {
                const existingIds = new Set(prev.map((c) => c.id))
                const newCategories = categories.filter((c) => !existingIds.has(c.id))
                return [...prev, ...newCategories]
            })
            setHasMoreCategories(allCategories.length + categories.length < categoriesCount)
        }
    }, [categories, categoriesCount, allCategories.length])

    useEffect(() => {
        if (inView && hasMoreCategories && !categoriesFetching) {
            setCategoryOffset((prev) => prev + LIMIT)
        }
    }, [inView, hasMoreCategories, categoriesFetching])

    // Loading state
    if (categoriesLoading && allCategories.length === 0) {
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
            {/* All Items Card */}
            <div>
                <Card onClick={() => navigate('/menu-items')}>
                    <CardHeader>
                        <Typography variant="subtitle1" sx={{ fontWeight: 600, color: '#f1f5f9' }}>
                            all items
                        </Typography>
                        <Chip
                            size="small"
                            label="all"
                            sx={{
                                backgroundColor: 'rgba(119, 76, 255, 0.12)',
                                color: '#774CFF',
                                fontWeight: 600,
                            }}
                        />
                    </CardHeader>
                </Card>
                <Divider sx={{ backgroundColor: '#334155' }} />
            </div>

            {allCategories.map((category) => (
                <div key={category.id}>
                    <Card onClick={() => navigate(`/menu-items?category_id=${category.id}`)}>
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
                    </Card>
                    <Divider sx={{ backgroundColor: '#334155' }} />
                </div>
            ))}

            {hasMoreCategories && (
                <div ref={ref} style={{ height: 1 }}>
                    {categoriesFetching && (
                        <Loading>
                            <CircularProgress size={20} />
                        </Loading>
                    )}
                </div>
            )}
        </Root>
    )
}
