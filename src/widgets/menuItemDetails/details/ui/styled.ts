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

export const ImageContainer = styled.div`
  display: flex;
  gap: 24px;
`

export const ItemImage = styled.img`
  width: 200px;
  height: 200px;
  object-fit: cover;
  border-radius: 8px;
  background-color: #334155;
`

export const PricesTable = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: 12px;
`

export const PriceCard = styled.div`
  background-color: #334155;
  border-radius: 8px;
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 4px;
`
