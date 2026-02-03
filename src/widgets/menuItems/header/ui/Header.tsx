import { useNavigate } from 'react-router-dom'
import { Header as UiHeader, Button } from '@shared/ui'
import { Plus } from '@shared/ui/icons'

export const Header = () => {
    const navigate = useNavigate()

    return (
        <UiHeader
            title="Menu Items"
            action={
                <Button
                    variant="contained"
                    startIcon={<Plus color="#fff" />}
                    onClick={() => navigate('/menu-items/create')}
                >
                    Add Menu Item
                </Button>
            }
        />
    )
}
