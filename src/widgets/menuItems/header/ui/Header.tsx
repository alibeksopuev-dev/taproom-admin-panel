import { useNavigate } from 'react-router-dom'
import { Button, SearchInput } from '@shared/ui'
import { Plus } from '@shared/ui/icons'
import { Box } from '@mui/material'
import styled from 'styled-components'

interface HeaderProps {
    searchQuery?: string
    onSearchChange?: (value: string) => void
}

const HeaderRoot = styled.div`
    display: flex;
    flex-direction: column;
    gap: 16px;
    padding: 24px;
    border-bottom: 1px solid #334155;
`

const TitleRow = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`

const Title = styled.h1`
    font-size: 20px;
    font-weight: 600;
    color: #f1f5f9;
    margin: 0;
`

export const Header = ({ searchQuery = '', onSearchChange, categoryName }: HeaderProps & { categoryName?: string }) => {
    const navigate = useNavigate()

    return (
        <HeaderRoot>
            <TitleRow>
                <Title>{categoryName}</Title>
                <Button
                    variant="contained"
                    startIcon={<Plus color="#fff" />}
                    onClick={() => navigate('/menu-items/create')}
                    sx={{ whiteSpace: 'nowrap' }}
                >
                    Create
                </Button>
            </TitleRow>
            {onSearchChange && (
                <Box sx={{ maxWidth: { xs: '100%', md: 500 } }}>
                    <SearchInput
                        value={searchQuery}
                        onChange={onSearchChange}
                        placeholder="Search menu items..."
                    />
                </Box>
            )}
        </HeaderRoot>
    )
}
