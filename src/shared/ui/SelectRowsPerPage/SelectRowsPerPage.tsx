import { Typography, Select, MenuItem } from '@shared/ui'
import { CountWrapper, Root } from './styled'

interface SelectRowsPerPageProps {
    rowsCount: string
    rowsPerPage: number
    onRowsPerPageChange: (row: number) => void
}

export const SelectRowsPerPage = ({
    rowsCount,
    rowsPerPage,
    onRowsPerPageChange,
}: SelectRowsPerPageProps) => {
    return (
        <Root>
            <CountWrapper>
                <Typography
                    sx={{ fontSize: 12, fontWeight: 500, color: '#9ca3af' }}
                >
                    {rowsCount}
                </Typography>
            </CountWrapper>
            <Typography
                sx={{ fontSize: 12, fontWeight: 500, color: '#9ca3af' }}
            >
                Rows per page
            </Typography>
            <Select
                value={rowsPerPage}
                onChange={(e) => onRowsPerPageChange(Number(e.target.value))}
                size="small"
                sx={{
                    height: 32,
                    minWidth: 60,
                    backgroundColor: '#1e293b',
                    color: '#9ca3af',
                    fontSize: 12,
                    '& .MuiOutlinedInput-notchedOutline': {
                        borderColor: '#334155',
                    },
                    '&:hover .MuiOutlinedInput-notchedOutline': {
                        borderColor: '#475569',
                    },
                    '& .MuiSelect-icon': {
                        color: '#9ca3af',
                    },
                }}
            >
                {[5, 10, 25, 50, 75].map((option) => (
                    <MenuItem key={option} value={option}>
                        {option}
                    </MenuItem>
                ))}
            </Select>
        </Root>
    )
}
