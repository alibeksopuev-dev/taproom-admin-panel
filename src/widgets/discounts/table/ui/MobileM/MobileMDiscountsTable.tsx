import { useMemo, useState } from 'react'
import { discountsApi, UserDiscount } from '@entities/discounts'
import { Typography, Chip, CircularProgress, Box, Button } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { format } from 'date-fns'
import { DeleteModal } from '@shared/ui'

const Root = styled.div`
    display: flex;
    flex-direction: column;
    gap: 8px;
`

const Card = styled.div`
    background-color: #0f172a;
    padding: 16px 24px;
    border-bottom: 1px solid #334155;
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
    gap: 8px;
`

const Loading = styled.div`
    display: flex;
    justify-content: center;
    padding: 16px;
`

export const MobileMDiscountsTable = () => {
    const navigate = useNavigate()
    const [deleteTarget, setDeleteTarget] = useState<UserDiscount | null>(null)
    const [updateDiscount] = discountsApi.useUpdateDiscountMutation()
    const [deleteDiscount] = discountsApi.useDeleteDiscountMutation()

    const { data, isLoading } = discountsApi.useGetDiscountsQuery({
        limit: 50,
        offset: 0,
    })

    const discounts = useMemo(() => data?.items ?? [], [data?.items])

    const handleToggleActive = async (discount: UserDiscount) => {
        try {
            await updateDiscount({ id: discount.id, is_active: !discount.is_active }).unwrap()
        } catch (error) {
            console.error('Failed to toggle discount:', error)
        }
    }

    const handleDelete = async () => {
        if (!deleteTarget) return
        try {
            await deleteDiscount({ id: deleteTarget.id }).unwrap()
            setDeleteTarget(null)
        } catch (error) {
            console.error('Failed to delete discount:', error)
        }
    }

    if (isLoading) {
        return (
            <Loading>
                <CircularProgress size={24} />
            </Loading>
        )
    }

    return (
        <Root>
            {discounts.length === 0 ? (
                <Box sx={{ p: 4, textAlign: 'center', color: '#9ca3af' }}>
                    <Typography>No discounts found</Typography>
                </Box>
            ) : (
                discounts.map((discount) => {
                    const active = discount.is_active

                    return (
                        <Card key={discount.id} onClick={() => navigate(`/discounts/${discount.id}`)}>
                            <CardHeader>
                                <Box>
                                    <Typography sx={{ color: '#f1f5f9', fontWeight: 500, fontSize: 14 }} mb={0.5}>
                                        {discount.user_name || discount.user_id.slice(0, 8) + '…'}
                                    </Typography>
                                    <Typography sx={{ color: '#9ca3af', fontSize: 13 }}>
                                        {discount.label || 'No label'}
                                    </Typography>
                                    <Typography sx={{ color: '#6b7280', fontSize: 11, mt: 0.5 }}>
                                        Created {format(new Date(discount.created_at + 'Z'), 'dd MMM yyyy')}
                                    </Typography>
                                </Box>
                                <Chip
                                    size="small"
                                    label={`${discount.discount_percent}%`}
                                    sx={{ bgcolor: '#14532d40', color: '#22c55e', fontWeight: 600, fontSize: 13 }}
                                />
                            </CardHeader>
                            <CardBody>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <Chip
                                        size="small"
                                        label={active ? 'Active' : 'Inactive'}
                                        sx={{
                                            bgcolor: active ? '#14532d40' : '#7f1d1d40',
                                            color: active ? '#22c55e' : '#ef4444',
                                            fontWeight: 600,
                                            fontSize: 11,
                                        }}
                                    />
                                    <Box sx={{ display: 'flex', gap: 1 }}>
                                        <Button
                                            size="small"
                                            onClick={(e) => { e.stopPropagation(); handleToggleActive(discount); }}
                                            sx={{
                                                bgcolor: active ? '#854d0e20' : '#14532d40',
                                                color: active ? '#eab308' : '#22c55e',
                                                fontSize: 12,
                                                fontWeight: 600,
                                                textTransform: 'none',
                                                minWidth: 80,
                                                '&:hover': { filter: 'brightness(1.3)' },
                                            }}
                                        >
                                            {active ? 'Disable' : 'Enable'}
                                        </Button>
                                        <Button
                                            size="small"
                                            onClick={(e) => { e.stopPropagation(); setDeleteTarget(discount); }}
                                            sx={{
                                                bgcolor: '#7f1d1d40',
                                                color: '#ef4444',
                                                fontSize: 12,
                                                fontWeight: 600,
                                                minWidth: 44,
                                                textTransform: 'none',
                                                '&:hover': { filter: 'brightness(1.3)' },
                                            }}
                                        >
                                            ✕
                                        </Button>
                                    </Box>
                                </Box>
                            </CardBody>
                        </Card>
                    )
                })
            )}
            <DeleteModal
                open={!!deleteTarget}
                onClose={() => setDeleteTarget(null)}
                onConfirm={handleDelete}
                entityName="Discount"
            />
        </Root>
    )
}
