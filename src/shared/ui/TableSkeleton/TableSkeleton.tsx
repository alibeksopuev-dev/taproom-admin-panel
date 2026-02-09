import Skeleton from '@mui/material/Skeleton'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'

interface TableSkeletonProps {
    columnsCount?: number
    rowsCount?: number
}

export const TableSkeleton = ({
    columnsCount = 5,
    rowsCount = 10,
}: TableSkeletonProps) => {
    return (
        <TableContainer sx={{ backgroundColor: '#0f172a', borderRadius: '12px 12px 0 0' }}>
            <Table>
                <TableHead>
                    <TableRow>
                        {Array.from({ length: columnsCount }).map((_, i) => (
                            <TableCell key={i} sx={{ backgroundColor: '#1e293b', borderBottom: '1px solid #334155' }}>
                                <Skeleton variant="text" width={80} sx={{ bgcolor: '#334155' }} />
                            </TableCell>
                        ))}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {Array.from({ length: rowsCount }).map((_, rowIndex) => (
                        <TableRow key={rowIndex}>
                            {Array.from({ length: columnsCount }).map((_, colIndex) => (
                                <TableCell key={colIndex} sx={{ borderBottom: '1px solid #334155' }}>
                                    <Skeleton variant="text" width="80%" sx={{ bgcolor: '#334155' }} />
                                </TableCell>
                            ))}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}

