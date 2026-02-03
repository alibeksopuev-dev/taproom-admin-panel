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
`

export const ButtonContainer = styled.div`
  display: flex;
  gap: 16px;
  padding: 24px;
  border-top: 1px solid #334155;
  background-color: #0f172a;
`
