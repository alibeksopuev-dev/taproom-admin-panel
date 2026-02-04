import { Organization } from '@entities/organizations'
import { Typography, Chip } from '@shared/ui'
import { createColumnHelper } from '@tanstack/react-table'

const columnHelper = createColumnHelper<Organization>()

export const columns = [
    columnHelper.accessor(({ logo_url }) => logo_url, {
        id: 'logo',
        header: 'Logo',
        cell: ({ getValue }) => (
            getValue() ? (
                <img
                    src={getValue() || ''}
                    alt="Organization Logo"
                    style={{ width: 32, height: 32, borderRadius: 4, objectFit: 'contain' }}
                />
            ) : 'N/A'
        ),
        size: 50,
        enableSorting: false,
    }),
    columnHelper.accessor(({ name }) => name, {
        id: 'name',
        header: 'Name',
        cell: ({ getValue }) => (
            <Typography sx={{ fontWeight: 500, color: '#f1f5f9' }}>
                {getValue()}
            </Typography>
        ),
        size: 200,
    }),
    columnHelper.accessor(({ slug }) => slug, {
        id: 'slug',
        header: 'Slug',
        cell: ({ getValue }) => (
            <Typography sx={{ color: '#9ca3af' }}>
                {getValue()}
            </Typography>
        ),
        size: 150,
    }),
    columnHelper.accessor(({ email }) => email, {
        id: 'email',
        header: 'Email',
        cell: ({ getValue }) => (
            <Typography sx={{ color: '#9ca3af' }}>
                {getValue() ?? '-'}
            </Typography>
        ),
        size: 200,
    }),
    columnHelper.accessor(({ phone_number }) => phone_number, {
        id: 'phone',
        header: 'Phone',
        cell: ({ getValue }) => (
            <Typography sx={{ color: '#9ca3af' }}>
                {getValue() ?? '-'}
            </Typography>
        ),
        size: 150,
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
