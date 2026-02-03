import { Header, Table } from '@tanstack/react-table'
import { Root } from './styled'

export const TableResizer = <TData,>({ header, table }: { header: Header<TData, unknown>; table: Table<TData> }) => {
    return (
        <Root
            {...{
                onDoubleClick: () => header.column.resetSize(),
                onMouseDown: header.getResizeHandler(),
                onTouchStart: header.getResizeHandler(),
                className: `resizer ${table.options.columnResizeDirection} ${header.column.getIsResizing() ? 'isResizing' : ''
                    }`,
                style: {
                    transform:
                        table.options.columnResizeMode === 'onEnd' && header.column.getIsResizing()
                            ? `translateX(${(table.options.columnResizeDirection === 'rtl' ? -1 : 1) *
                            (table.getState().columnSizingInfo.deltaOffset ?? 0)
                            }px)`
                            : '',
                },
            }}
        />
    )
}
