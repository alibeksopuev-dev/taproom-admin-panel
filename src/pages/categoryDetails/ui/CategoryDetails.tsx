import { useNavigate, useParams, Link as RouterLink } from 'react-router-dom'
import styled from 'styled-components'
import {
    Header,
    Button,
    Box,
    Chip,
    Typography,
    Breadcrumbs,
    Link,
    CircularProgress,
    DetailRow,
    DetailKey,
    DetailValue,
} from '@shared/ui'
import { categoriesApi } from '@entities/categories'
import { dateHelpers } from '@shared/lib'

const Root = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`

const Content = styled.div`
  padding: 24px;
  overflow: auto;
`

const Section = styled.div`
  background-color: #1e293b;
  border-radius: 8px;
  padding: 24px;
`

const SectionTitle = styled.h2`
  font-size: 18px;
  font-weight: 600;
  color: #f1f5f9;
  margin: 0 0 24px 0;
`

const DetailsGrid = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`

const LoadingContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 48px;
`

export const CategoryDetails = () => {
    const { id } = useParams<{ id: string }>()
    const navigate = useNavigate()

    const { data: category, isLoading, error } = categoriesApi.useGetCategoryByIdQuery(
        { id: id! },
        { skip: !id }
    )

    if (isLoading) {
        return (
            <Root>
                <LoadingContainer>
                    <CircularProgress />
                </LoadingContainer>
            </Root>
        )
    }

    if (error || !category) {
        return (
            <Root>
                <Content>
                    <Typography color="error">Category not found</Typography>
                </Content>
            </Root>
        )
    }

    return (
        <Root>
            <Header
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
                                <Typography sx={{ color: '#f1f5f9' }}>{category.name}</Typography>
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

            <Content>
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
                            <DetailKey>Icon</DetailKey>
                            <DetailValue>
                                <span style={{ fontSize: 24 }}>{category.icon || '📋'}</span>
                            </DetailValue>
                        </DetailRow>
                        <DetailRow>
                            <DetailKey>Display Order</DetailKey>
                            <DetailValue>
                                <Chip label={category.display_order ?? 0} size="small" sx={{ bgcolor: '#334155' }} />
                            </DetailValue>
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
            </Content>
        </Root>
    )
}
