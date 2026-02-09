import styled from 'styled-components'
import { Box } from '@mui/material'

export const StyledTable = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`

export const StyledTitle = styled.div<{ keysWidth?: string }>`
  font-weight: 600;
  font-size: 16px;
  color: #f1f5f9;
  margin-bottom: 8px;
`

export const StyledDetailRow = styled.div`
  display: flex;
  gap: 16px;
  align-items: flex-start;
  min-height: 24px;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 4px;
  }
`

export const StyledDetailKey = styled.div<{ $keyWidth?: string }>`
  min-width: ${({ $keyWidth }) => $keyWidth || '140px'};
  flex-shrink: 0;
  
  @media (max-width: 768px) {
    min-width: unset;
  }
`

export const StyledDetailValue = styled(Box)`
  flex: 1;
  display: flex;
  align-items: center;
  overflow: hidden;
`
