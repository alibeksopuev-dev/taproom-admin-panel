import { MenuItem } from '@entities/menuItems'
import { Typography, Chip, Box } from '@shared/ui'
import { createColumnHelper } from '@tanstack/react-table'

const columnHelper = createColumnHelper<MenuItem>()

export const columns = [
    columnHelper.accessor(({ name }) => name, {
        id: 'name',
        header: 'Name',
        cell: ({ row, getValue }) => (
            <Box display="flex" alignItems="center" gap={1}>
                {row.original.image_url && (
                    <img
                        src={row.original.image_url}
                        alt={getValue()}
                        style={{ width: 32, height: 32, borderRadius: 4, objectFit: 'cover' }}
                    />
                )}
                <Typography sx={{ fontWeight: 500, color: '#f1f5f9' }}>
                    {getValue()}
                </Typography>
            </Box>
        ),
        size: 250,
    }),
    columnHelper.accessor(({ category }) => category?.name, {
        id: 'category',
        header: 'Category',
        cell: ({ getValue }) => (
            <Typography sx={{ color: '#9ca3af' }}>
                {getValue() ?? '-'}
            </Typography>
        ),
        size: 150,
    }),
    columnHelper.accessor(({ subcategory }) => subcategory, {
        id: 'subcategory',
        header: 'Subcategory',
        cell: ({ getValue }) => (
            <Typography sx={{ color: '#9ca3af' }}>
                {getValue() ?? '-'}
            </Typography>
        ),
        size: 150,
    }),
    columnHelper.accessor(({ prices }) => prices, {
        id: 'prices',
        header: 'Prices',
        cell: ({ getValue }) => {
            const prices = getValue()
            if (!prices || prices.length === 0) return '-'
            return (
                <Box display="flex" gap={0.5} flexWrap="wrap">
                    {prices.slice(0, 2).map((p) => (
                        <Chip
                            key={p.id}
                            label={`${p.size}: ${p.price} VND`}
                            size="small"
                            sx={{ bgcolor: '#334155', color: '#f1f5f9', fontSize: 11 }}
                        />
                    ))}
                    {prices.length > 2 && (
                        <Chip
                            label={`+${prices.length - 2}`}
                            size="small"
                            sx={{ bgcolor: '#1e293b', color: '#9ca3af', fontSize: 11 }}
                        />
                    )}
                </Box>
            )
        },
        size: 200,
    }),
    columnHelper.accessor(({ is_disabled }) => is_disabled, {
        id: 'status',
        header: 'Status',
        cell: ({ getValue }) => (
            <Chip
                label={getValue() ? 'Disabled' : 'Active'}
                size="small"
                sx={{
                    bgcolor: getValue() ? '#7f1d1d' : '#14532d',
                    color: getValue() ? '#fca5a5' : '#86efac',
                }}
            />
        ),
        size: 100,
    }),
]
