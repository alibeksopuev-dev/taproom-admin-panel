import { Category } from '@entities/categories'
import { Typography } from '@shared/ui'
import { createColumnHelper } from '@tanstack/react-table'
import { dateHelpers } from '@shared/lib'

const columnHelper = createColumnHelper<Category>()

export const columns = [
    columnHelper.accessor(({ name }) => name, {
        id: 'name',
        header: 'Name',
        cell: ({ getValue }) => (
            <Typography sx={{ fontWeight: 500, color: '#f1f5f9' }}>
                {getValue()}
            </Typography>
        ),
        size: 250,
    }),
    columnHelper.accessor(({ slug }) => slug, {
        id: 'slug',
        header: 'Slug',
        cell: ({ getValue }) => (
            <Typography sx={{ color: '#9ca3af' }}>
                {getValue()}
            </Typography>
        ),
        size: 200,
    }),
    columnHelper.accessor(({ created_at }) => created_at, {
        id: 'created_at',
        header: 'Created',
        cell: ({ getValue }) => (
            <Typography sx={{ color: '#9ca3af', fontSize: 13 }}>
                {dateHelpers.formatDate(getValue())}
            </Typography>
        ),
        size: 150,
    }),
]
