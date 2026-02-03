import { useParams } from 'react-router-dom'
import { categoriesApi } from '@entities/categories'
import { dateHelpers } from '@shared/lib'
import {
    Typography,
    CircularProgress,
    DetailRow,
    DetailKey,
    DetailValue,
    Box,
} from '@shared/ui'
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
                        <DetailValue>{category.name}</DetailValue>
                    </DetailRow>
                    <DetailRow>
                        <DetailKey>Slug</DetailKey>
                        <DetailValue>{category.slug}</DetailValue>
                    </DetailRow>
                    <DetailRow>
                        <DetailKey>Created At</DetailKey>
                        <DetailValue>{dateHelpers.formatDate(category.created_at)}</DetailValue>
                    </DetailRow>
                    <DetailRow>
                        <DetailKey>Updated At</DetailKey>
                        <DetailValue>{dateHelpers.formatDate(category.updated_at)}</DetailValue>
                    </DetailRow>
                </DetailsGrid>
            </Section>
        </Root>
    )
}
