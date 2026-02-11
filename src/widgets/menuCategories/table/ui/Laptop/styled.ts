import styled from 'styled-components'

export const StyledTableContainer = styled.div`
    flex: 1;
    overflow: auto;
    background-color: #0f172a;
`

export const StyledHeaderRow = styled.tr``

export const StyledBodyRow = styled.tr`
    cursor: pointer;
    transition: background-color 0.2s;

    &:hover {
        background-color: rgba(119, 76, 255, 0.04);
    }
`

export const StyledFooter = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 16px 24px;
    border-top: 1px solid #334155;
`

export const Loading = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex: 1;
    padding: 32px;
`
