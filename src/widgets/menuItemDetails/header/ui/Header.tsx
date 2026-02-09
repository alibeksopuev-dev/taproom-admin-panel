import { useNavigate, useParams, Link as RouterLink } from 'react-router-dom'
import { menuItemsApi } from '@entities/menuItems'
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

    const { data: menuItem } = menuItemsApi.useGetMenuItemByIdQuery(
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
                            to="/menu-items"
                            sx={{ color: '#9ca3af', textDecoration: 'none', '&:hover': { color: '#774CFF' } }}
                        >
                            Menu Items
                        </Link>
                        <Box display="flex" alignItems="center" gap={1}>
                            <Typography sx={{ color: '#f1f5f9' }}>{menuItem?.name ?? 'Loading...'}</Typography>
                        </Box>
                    </Breadcrumbs>
                </Box>
            }
            action={
                <Button
                    variant="contained"
                    onClick={() => navigate(`/menu-items/${id}/edit`)}
                >
                    Edit
                </Button>
            }
        />
    )
}
