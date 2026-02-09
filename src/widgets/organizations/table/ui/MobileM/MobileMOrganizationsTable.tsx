import { useMemo, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useInView } from 'react-intersection-observer'
import { organizationsApi, Organization } from '@entities/organizations'
import { Typography, Chip, Divider, CircularProgress } from '@mui/material'
import Box from '@mui/material/Box'
import styled from 'styled-components'
import dayjs from 'dayjs'

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
    align-items: center;
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

export const MobileMOrganizationsTable = () => {
    const navigate = useNavigate()
    const { ref, inView } = useInView({
        threshold: 0.1,
    })

    const [offset, setOffset] = useState(0)
    const [allOrganizations, setAllOrganizations] = useState<Organization[]>([])
    const [hasMore, setHasMore] = useState(true)

    const { data, isLoading, isFetching } = organizationsApi.useGetOrganizationsQuery({
        limit: LIMIT,
        offset,
    })

    const organizations = useMemo(() => data?.items ?? [], [data?.items])
    const totalCount = data?.count ?? 0

    useEffect(() => {
        if (organizations.length > 0) {
            setAllOrganizations(prev => {
                const existingIds = new Set(prev.map(o => o.id))
                const newItems = organizations.filter(o => !existingIds.has(o.id))
                return [...prev, ...newItems]
            })
            setHasMore(allOrganizations.length + organizations.length < totalCount)
        }
    }, [organizations, totalCount, allOrganizations.length])

    useEffect(() => {
        if (inView && hasMore && !isFetching) {
            setOffset(prev => prev + LIMIT)
        }
    }, [inView, hasMore, isFetching])

    if (isLoading && allOrganizations.length === 0) {
        return (
            <Loading>
                <CircularProgress size={24} />
            </Loading>
        )
    }

    if (allOrganizations.length === 0) {
        return (
            <Box sx={{ p: 4, textAlign: 'center', color: '#9ca3af' }}>
                <Typography>No organizations found</Typography>
            </Box>
        )
    }

    return (
        <Root>
            {allOrganizations.map((org) => (
                <div key={org.id}>
                    <Card onClick={() => navigate(`/organizations/${org.id}`)}>
                        <CardHeader>
                            <Typography variant="subtitle1" sx={{ fontWeight: 600, color: '#f1f5f9' }}>
                                {org.name}
                            </Typography>
                            <Chip
                                size="small"
                                label={org.slug}
                                sx={{
                                    backgroundColor: 'rgba(119, 76, 255, 0.12)',
                                    color: '#774CFF',
                                    fontWeight: 600,
                                }}
                            />
                        </CardHeader>
                        <CardBody>
                            <Typography variant="body2" sx={{ color: '#9ca3af' }}>
                                {dayjs(org.created_at).format('D MMM, YYYY h:mm A')}
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
