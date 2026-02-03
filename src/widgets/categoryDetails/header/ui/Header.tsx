import { useNavigate, useParams, Link as RouterLink } from 'react-router-dom'
import { categoriesApi } from '@entities/categories'
import {
    Header as UiHeader,
    Button,
    Box,
    Typography,
    Breadcrumbs,
    Link,
} from '@shared/ui'

export const Header = () => {
    const { id } = useParams<{ id: string }>()
    const navigate = useNavigate()

    const { data: category } = categoriesApi.useGetCategoryByIdQuery(
        { id: id! },
        { skip: !id }
    )

    return (
        <UiHeader
            title={
                <Box display="flex" alignItems="center" gap={2}>
                    <Breadcrumbs sx={{ color: '#9ca3af' }}>
                        <Link
                            component={RouterLink}
                            to="/categories"
                            sx={{ color: '#9ca3af', textDecoration: 'none', '&:hover': { color: '#774CFF' } }}
                        >
                            Categories
                        </Link>
                        <Box display="flex" alignItems="center" gap={1}>
                            <Typography sx={{ color: '#f1f5f9' }}>{category?.name ?? 'Loading...'}</Typography>
                        </Box>
                    </Breadcrumbs>
                </Box>
            }
            action={
                <Button
                    variant="contained"
                    onClick={() => navigate(`/categories/${id}/edit`)}
                >
                    Edit Category
                </Button>
            }
        />
    )
}
