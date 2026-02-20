import styled from 'styled-components'
import { Box } from '@shared/ui'

export const Root = styled(Box)`
  flex: 1;
  overflow: auto;
  background-color: #0f172a;
  border-radius: 12px;
`

export const FormContainer = styled.div`
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 24px;
  padding-bottom: calc(80px + env(safe-area-inset-bottom));
`

export const ButtonContainer = styled.div`
  display: flex;
  gap: 16px;
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
