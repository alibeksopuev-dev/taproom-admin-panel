import { useParams } from 'react-router-dom'
import { menuItemsApi } from '@entities/menuItems'
import { dateHelpers } from '@shared/lib'
import {
    Typography,
    CircularProgress,
    DetailRow,
    DetailKey,
    DetailValue,
    Box,
    Chip,
} from '@shared/ui'
import {
    Root,
    Section,
    SectionTitle,
    DetailsGrid,
    ImageContainer,
    ItemImage,
    PricesTable,
    PriceCard,
} from './styled'

export const Details = () => {
    const { id } = useParams<{ id: string }>()

    const { data: menuItem, isLoading, error } = menuItemsApi.useGetMenuItemByIdQuery(
        { id: id! },
        { skip: !id }
    )

    if (isLoading) {
        return (
            <Root>
                <Box display="flex" justifyContent="center" alignItems="center" height="100%">
                    <CircularProgress />
                </Box>
            </Root>
        )
    }

    if (error || !menuItem) {
        return (
            <Root>
                <Typography color="error">Menu item not found</Typography>
            </Root>
        )
    }

    return (
        <Root>
            <ImageContainer>
                {menuItem.image_url && (
                    <ItemImage src={menuItem.image_url} alt={menuItem.name} />
                )}
                <Section style={{ flex: 1 }}>
                    <SectionTitle>Basic Information</SectionTitle>
                    <DetailsGrid>
                        <DetailRow>
                            <DetailKey>Name</DetailKey>
                            <DetailValue>{menuItem.name}</DetailValue>
                        </DetailRow>
                        <DetailRow>
                            <DetailKey>Description</DetailKey>
                            <DetailValue>{menuItem.description ?? '-'}</DetailValue>
                        </DetailRow>
                        <DetailRow>
                            <DetailKey>Category</DetailKey>
                            <DetailValue>{menuItem.category?.name ?? '-'}</DetailValue>
                        </DetailRow>
                        <DetailRow>
                            <DetailKey>Subcategory</DetailKey>
                            <DetailValue>{menuItem.subcategory ?? '-'}</DetailValue>
                        </DetailRow>
                        <DetailRow>
                            <DetailKey>Status</DetailKey>
                            <DetailValue>
                                <Chip
                                    label={menuItem.is_disabled ? 'Disabled' : 'Active'}
                                    size="small"
                                    sx={{
                                        bgcolor: menuItem.is_disabled ? '#7f1d1d' : '#14532d',
                                        color: menuItem.is_disabled ? '#fca5a5' : '#86efac',
                                    }}
                                />
                            </DetailValue>
                        </DetailRow>
                    </DetailsGrid>
                </Section>
            </ImageContainer>

            <Section>
                <SectionTitle>Prices</SectionTitle>
                {menuItem.prices && menuItem.prices.length > 0 ? (
                    <PricesTable>
                        {menuItem.prices.map((price) => (
                            <PriceCard key={price.id}>
                                <Typography sx={{ color: '#9ca3af', fontSize: 13 }}>
                                    {price.size}
                                </Typography>
                                <Typography sx={{ color: '#f1f5f9', fontSize: 18, fontWeight: 600 }}>
                                    {price.price.toLocaleString()}₸
                                </Typography>
                            </PriceCard>
                        ))}
                    </PricesTable>
                ) : (
                    <Typography sx={{ color: '#9ca3af' }}>No prices set</Typography>
                )}
            </Section>

            <Section>
                <SectionTitle>Metadata</SectionTitle>
                <DetailsGrid>
                    <DetailRow>
                        <DetailKey>Created At</DetailKey>
                        <DetailValue>{dateHelpers.formatDate(menuItem.created_at)}</DetailValue>
                    </DetailRow>
                    <DetailRow>
                        <DetailKey>Updated At</DetailKey>
                        <DetailValue>{dateHelpers.formatDate(menuItem.updated_at)}</DetailValue>
                    </DetailRow>
                </DetailsGrid>
            </Section>
        </Root>
    )
}
