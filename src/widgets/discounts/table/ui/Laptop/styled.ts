import { MuiTableRow, MuiTableContainer, TableContainerProps } from '@shared/ui'
import styled from 'styled-components'

export const StyledTableContainer = styled(MuiTableContainer) <TableContainerProps>`
  background-color: #0f172a;
  border-radius: 12px 12px 0 0;
  padding: 0;
  height: 100%;
  flex: 1;
  overflow: auto;
`

export const StyledHeaderRow = styled(MuiTableRow)`
  &:last-child td,
  &:last-child th {
    border: 0;
  }
`

export const StyledBodyRow = styled(MuiTableRow)`
  cursor: pointer;
  &:hover {
    background-color: rgba(119, 76, 255, 0.08);
  }
  &:last-child td,
  &:last-child th {
    border: 0;
  }
`

export const StyledFooter = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  background-color: #0f172a;
  padding: 12px 24px;
  border-radius: 0 0 12px 12px;
  align-items: center;
  border-top: 1px solid #334155;
`

export const Loading = styled.div`
  flex-grow: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  background-color: #0f172a;
  border-radius: 12px;
`
