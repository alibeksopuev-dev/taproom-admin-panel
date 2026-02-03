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
        <TableContainer>
            <Table>
                <TableHead>
                    <TableRow>
                        {Array.from({ length: columnsCount }).map((_, i) => (
                            <TableCell key={i}>
                                <Skeleton variant="text" width={80} />
                            </TableCell>
                        ))}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {Array.from({ length: rowsCount }).map((_, rowIndex) => (
                        <TableRow key={rowIndex}>
                            {Array.from({ length: columnsCount }).map((_, colIndex) => (
                                <TableCell key={colIndex}>
                                    <Skeleton variant="text" width="80%" />
                                </TableCell>
                            ))}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}
