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
  padding-bottom: calc(80px + env(safe-area-inset-bottom));
`

export const ButtonContainer = styled.div`
  display: flex;
  gap: 12px;
  position: fixed;
  bottom: 0;
  left: 0;
  
  @media (min-width: 900px) {
    left: 236px;
  }
  right: 0;
  padding: 16px;
  background-color: #1e293b;
  border-top: 1px solid #334155;
  box-shadow: 0 -2px 10px rgba(0,0,0,0.1);
  z-index: 1000;
  padding-bottom: calc(env(safe-area-inset-bottom) + 16px);
  
  & > button {
    flex: 1;
  }
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
