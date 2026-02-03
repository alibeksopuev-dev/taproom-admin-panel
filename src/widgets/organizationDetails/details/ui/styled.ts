import styled from 'styled-components'

export const Root = styled.div`
  padding: 24px;
  overflow: auto;
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 24px;
`

export const Section = styled.div`
  background-color: #1e293b;
  border-radius: 8px;
  padding: 24px;
`

export const SectionTitle = styled.h2`
  font-size: 18px;
  font-weight: 600;
  color: #f1f5f9;
  margin: 0 0 24px 0;
`

export const DetailsGrid = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`

export const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 24px;
`

export const LogoImage = styled.img`
  width: 100px;
  height: 100px;
  object-fit: cover;
  border-radius: 8px;
  background-color: #334155;
`

export const LogoPlaceholder = styled.div`
  width: 100px;
  height: 100px;
  border-radius: 8px;
  background-color: #334155;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #9ca3af;
  font-size: 14px;
`

export const ColorPreview = styled.div<{ color: string }>`
  width: 32px;
  height: 32px;
  border-radius: 6px;
  background-color: ${props => props.color};
  border: 2px solid #334155;
`
