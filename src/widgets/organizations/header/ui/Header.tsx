import { useNavigate } from 'react-router-dom'
import { Header as UiHeader, Button } from '@shared/ui'
import { Plus } from '@shared/ui/icons'

export const Header = () => {
    const navigate = useNavigate()

    return (
        <UiHeader
            title="Organizations"
            action={
                <Button
                    variant="contained"
                    startIcon={<Plus color="#fff" />}
                    onClick={() => navigate('/organizations/create')}
                >
                    Add Organization
                </Button>
            }
        />
    )
}
