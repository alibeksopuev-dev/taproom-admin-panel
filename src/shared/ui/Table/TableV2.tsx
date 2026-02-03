import MuiTable from '@mui/material/Table'
import MuiTableBody from '@mui/material/TableBody'
import MuiTableCell from '@mui/material/TableCell'
import MuiTableContainer from '@mui/material/TableContainer'
import MuiTableHead from '@mui/material/TableHead'
import MuiTableRow from '@mui/material/TableRow'

import { flexRender } from '@tanstack/react-table'
import { TableProps } from './types'

export const TableV2 = <TData,>({ table, actions, components }: TableProps<TData>) => {
    const {
        TableContainer = MuiTableContainer,
        Table = MuiTable,
        Header = MuiTableHead,
        HeaderRow = MuiTableRow,
        HeaderCell = MuiTableCell,
        Body = MuiTableBody,
        BodyRow = MuiTableRow,
        BodyCell = MuiTableCell,
        FooterContainer,
        Pagination,
    } = components || {}

    return (
        <>
            <TableContainer>
                {actions && actions}
                <Table>
                    <Header>
                        <HeaderRow>
                            {table.getFlatHeaders().map((header) => (
                                <HeaderCell key={header.id} original={{ ...header }}>
                                    {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                                </HeaderCell>
                            ))}
                        </HeaderRow>
                    </Header>

                    <Body>
                        {table.getRowModel().rows.map((row) => (
                            <BodyRow key={row.id} original={{ ...row.original }}>
                                {row.getVisibleCells().map((cell) => (
                                    <BodyCell original={{ ...cell }} key={cell.id}>
                                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                    </BodyCell>
                                ))}
                            </BodyRow>
                        ))}
                    </Body>
                </Table>
            </TableContainer>
            {FooterContainer && <FooterContainer>{Pagination && <Pagination />}</FooterContainer>}
        </>
    )
}
