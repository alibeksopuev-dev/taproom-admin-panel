import styled from 'styled-components'

export const Root = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: auto;
  padding: 24px;
`

export const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  flex: 1;
`

export const ButtonContainer = styled.div`
  display: flex;
  gap: 12px;
  padding-top: 24px;
  border-top: 1px solid #334155;
  margin-top: 24px;
`

export const Section = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`

export const PricesContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`

export const PriceRow = styled.div`
  display: flex;
  gap: 12px;
  align-items: center;
`
