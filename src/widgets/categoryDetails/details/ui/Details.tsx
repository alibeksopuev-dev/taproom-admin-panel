import { useParams } from 'react-router-dom'
import { categoriesApi } from '@entities/categories'
import { dateHelpers } from '@shared/lib'
import {
    CircularProgress,
    DetailRow,
    DetailKey,
    DetailValue,
    Box,
    Typography,
} from '@shared/ui'
import { TypographyVariant } from '@shared/ui/AbstractTable/AbstractTable'
import { Root, Section, SectionTitle, DetailsGrid } from './styled'

export const Details = () => {
    const { id } = useParams<{ id: string }>()

    const { data: category, isLoading, error } = categoriesApi.useGetCategoryByIdQuery(
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

    if (error || !category) {
        return (
            <Root>
                <Typography color="error">Category not found</Typography>
            </Root>
        )
    }

    return (
        <Root>
            <Section>
                <SectionTitle>Category Information</SectionTitle>
                <DetailsGrid>
                    <DetailRow>
                        <DetailKey>Name</DetailKey>
                        <DetailValue>
                            <Typography variant={TypographyVariant.BODY_M} sx={{ color: '#f1f5f9' }}>
                                {category.name}
                            </Typography>
                        </DetailValue>
                    </DetailRow>
                    <DetailRow>
                        <DetailKey>Slug</DetailKey>
                        <DetailValue>
                            <Typography variant={TypographyVariant.BODY_M} sx={{ color: '#f1f5f9' }}>
                                {category.slug}
                            </Typography>
                        </DetailValue>
                    </DetailRow>
                    <DetailRow>
                        <DetailKey>Created At</DetailKey>
                        <DetailValue>
                            <Typography variant={TypographyVariant.BODY_M} sx={{ color: '#f1f5f9' }}>
                                {dateHelpers.formatDate(category.created_at)}
                            </Typography>
                        </DetailValue>
                    </DetailRow>
                    <DetailRow>
                        <DetailKey>Updated At</DetailKey>
                        <DetailValue>
                            <Typography variant={TypographyVariant.BODY_M} sx={{ color: '#f1f5f9' }}>
                                {dateHelpers.formatDate(category.updated_at)}
                            </Typography>
                        </DetailValue>
                    </DetailRow>
                </DetailsGrid>
            </Section>
        </Root>
    )
}
