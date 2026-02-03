import { Row, TableOptions, Table, Cell, Header } from '@tanstack/react-table'
import { ComponentType, PropsWithChildren, ReactNode } from 'react'

interface OwnTableOptions<TData> extends TableOptions<TData> {
    loading?: boolean
    loadingComponent?: ReactNode
    onPageChange?: (page: number) => void
    rowsPerPage?: number
    onRowsPerPageChange?: (newRows: number) => void
    rowsPerPageOptions?: number[]
}

export interface ITable<TData, TType> {
    tableOptions: OwnTableOptions<TData>
    component?: TableComponent
    type: TType
}

interface OwnCardTableProps<TData> extends TableOptions<TData> {
    loadMore?: () => void
}

export interface ICardTable<TData, TType> {
    render: (rows: Row<TData>[]) => ReactNode
    tableOptions: Omit<OwnCardTableProps<TData>, 'columns'>
    component?: TableComponent
    type: TType
}

export enum TableType {
    TABLE,
    CARD,
}

export type Original<TData> = {
    'data-original'?: TData
}

export type AbstractTableProps<TData, TType extends TableType> = TType extends TableType.TABLE
    ? ITable<TData, TType>
    : ICardTable<TData, TType>

export type TableComponent = Partial<{
    Root: ComponentType<PropsWithChildren>
    TableContainer: ComponentType<PropsWithChildren>
    Table: ComponentType<PropsWithChildren>

    Header: ComponentType<PropsWithChildren>
    HeaderRow: ComponentType<PropsWithChildren>
    HeaderCell: ComponentType<PropsWithChildren>

    Body: ComponentType<PropsWithChildren>
    BodyRow: ComponentType<PropsWithChildren<object>>
    BodyCell: ComponentType<PropsWithChildren>

    Footer: ComponentType<PropsWithChildren>
    FooterRow: ComponentType<PropsWithChildren>
    FooterCell: ComponentType<PropsWithChildren>
}>

type TableComponents<TData> = Partial<{
    TableContainer: ComponentType<PropsWithChildren>
    Table: ComponentType<PropsWithChildren>

    Header: ComponentType<PropsWithChildren>
    HeaderRow: ComponentType<PropsWithChildren>
    HeaderCell: ComponentType<PropsWithChildren<{ original?: Header<TData, unknown> }>>

    Body: ComponentType<PropsWithChildren>
    BodyRow: ComponentType<PropsWithChildren<{ original?: TData }>>
    BodyCell: ComponentType<PropsWithChildren<{ original?: Cell<TData, unknown> }>>

    FooterContainer: ComponentType<PropsWithChildren>
    Pagination: ComponentType
}>

export type TableProps<TData> = {
    table: Table<TData>
    components?: TableComponents<TData>
    actions?: ReactNode
}
