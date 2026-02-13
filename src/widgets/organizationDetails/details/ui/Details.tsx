import { useParams } from 'react-router-dom'
import { organizationsApi } from '@entities/organizations'
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
    LogoContainer,
    LogoImage,
    LogoPlaceholder,
    ColorPreview,
} from './styled'

export const Details = () => {
    const { id } = useParams<{ id: string }>()

    const { data: organization, isLoading, error } = organizationsApi.useGetOrganizationByIdQuery(
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

    if (error || !organization) {
        return (
            <Root>
                <Typography color="error">Organization not found</Typography>
            </Root>
        )
    }

    return (
        <Root>
            <LogoContainer>
                {organization.logo_url ? (
                    <LogoImage src={organization.logo_url} alt={organization.name} />
                ) : (
                    <LogoPlaceholder>No Logo</LogoPlaceholder>
                )}
                <Section style={{ flex: 1 }}>
                    <SectionTitle>Basic Information</SectionTitle>
                    <DetailsGrid>
                        <DetailRow>
                            <DetailKey>Name</DetailKey>
                            <DetailValue>{organization.name}</DetailValue>
                        </DetailRow>
                        <DetailRow>
                            <DetailKey>Slug</DetailKey>
                            <DetailValue>{organization.slug}</DetailValue>
                        </DetailRow>
                        <DetailRow>
                            <DetailKey>Status</DetailKey>
                            <DetailValue>
                                <Chip
                                    label={organization.is_disabled ? 'Disabled' : 'Active'}
                                    size="small"
                                    sx={{
                                        bgcolor: organization.is_disabled ? '#7f1d1d' : '#14532d',
                                        color: organization.is_disabled ? '#fca5a5' : '#86efac',
                                    }}
                                />
                            </DetailValue>
                        </DetailRow>
                    </DetailsGrid>
                </Section>
            </LogoContainer>

            <Section>
                <SectionTitle>Contact Information</SectionTitle>
                <DetailsGrid>
                    <DetailRow>
                        <DetailKey>Email</DetailKey>
                        <DetailValue>{organization.email ?? '-'}</DetailValue>
                    </DetailRow>
                    <DetailRow>
                        <DetailKey>Phone</DetailKey>
                        <DetailValue>{organization.phone_number ?? '-'}</DetailValue>
                    </DetailRow>
                    <DetailRow>
                        <DetailKey>Address</DetailKey>
                        <DetailValue>{organization.address ?? '-'}</DetailValue>
                    </DetailRow>
                </DetailsGrid>
            </Section>

            <Section>
                <SectionTitle>Logo</SectionTitle>
                <DetailsGrid>
                    <DetailRow>
                        <DetailKey>Logo URL</DetailKey>
                        <DetailValue>{organization.logo_url ?? '-'}</DetailValue>
                    </DetailRow>
                </DetailsGrid>
            </Section>

            <Section>
                <SectionTitle>Metadata</SectionTitle>
                <DetailsGrid>
                    <DetailRow>
                        <DetailKey>Created At</DetailKey>
                        <DetailValue>{dateHelpers.formatDate(organization.created_at)}</DetailValue>
                    </DetailRow>
                    <DetailRow>
                        <DetailKey>Updated At</DetailKey>
                        <DetailValue>{dateHelpers.formatDate(organization.updated_at)}</DetailValue>
                    </DetailRow>
                </DetailsGrid>
            </Section>
        </Root>
    )
}
