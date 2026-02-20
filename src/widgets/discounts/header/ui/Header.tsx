import { Header as UiHeader, Button, Typography } from '@shared/ui'
import { Plus } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

export const Header = () => {
    const navigate = useNavigate()

    return (
        <UiHeader
            title="Discounts"
            action={
                <Button
                    startIcon={<Plus size={16} />}
                    variant="text"
                    sx={{ color: '#94a3b8', textTransform: 'none' }}
                    onClick={() => navigate('/discounts/create')}
                >
                    <Typography sx={{ fontWeight: 600, fontSize: 14 }}>Add Discount</Typography>
                </Button>
            }
        />
    )
}
