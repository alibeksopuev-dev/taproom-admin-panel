import { useSearchParams } from 'react-router-dom'
import styled from 'styled-components'
import { Header, MenuItemsTable } from '@widgets/menuItems'
import { categoriesApi } from '@entities/categories'

const Root = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`

export const MenuItems = () => {
    const [searchParams, setSearchParams] = useSearchParams()
    const searchQuery = searchParams.get('search') || ''
    const categoryId = searchParams.get('category_id')

    const { data: categoryData } = categoriesApi.useGetCategoryByIdQuery(
        { id: categoryId ?? '' },
        { skip: !categoryId }
    )

    const handleSearchChange = (value: string) => {
        const newParams = new URLSearchParams(searchParams)
        if (value) {
            newParams.set('search', value)
        } else {
            newParams.delete('search')
        }
        setSearchParams(newParams)
    }

    return (
        <Root>
            <Header
                searchQuery={searchQuery}
                onSearchChange={handleSearchChange}
                categoryName={categoryData?.name}
            />
            <MenuItemsTable />
        </Root>
    )
}
