import styled from 'styled-components'

export const Root = styled.div`
    display: flex;
    flex-direction: column;
    gap: 8px;
`

export const Card = styled.div`
    background-color: #0f172a;
    border-radius: 12px;
    padding: 16px 24px;
    cursor: pointer;
    transition: background-color 0.2s;

    &:hover {
        background-color: rgba(119, 76, 255, 0.04);
    }
`

export const CardHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 8px;
`

export const Loading = styled.div`
    display: flex;
    justify-content: center;
    padding: 16px;
`
