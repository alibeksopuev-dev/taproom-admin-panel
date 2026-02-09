import { NavLink, useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { Button, Divider, IconButton, Typography } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import LogoutIcon from '@mui/icons-material/Logout'
import BusinessIcon from '@mui/icons-material/Business'
import CategoryIcon from '@mui/icons-material/Category'
import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu'
import { useAppDispatch, useAppSelector } from '@shared/lib'
import { signOutThunk, selectUser } from '@entities/session'

const Root = styled.div`
    display: flex;
    flex-direction: column;
    height: 100%;
    padding: 16px;
`

const Header = styled.header`
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 16px;
`

const Logo = styled.div`
    display: flex;
    align-items: center;
    gap: 8px;
`

const Tabs = styled.nav`
    display: flex;
    flex-direction: column;
    gap: 4px;
    flex: 1;
`

const StyledNavLink = styled(NavLink)`
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 12px 16px;
    text-decoration: none;
    color: #9ca3af;
    border-radius: 8px;
    transition: background-color 0.2s;

    &:hover {
        background-color: rgba(119, 76, 255, 0.1);
        color: #f1f5f9;
    }

    &.active {
        background-color: rgba(119, 76, 255, 0.15);
        color: #774CFF;
    }
`

const UserFooter = styled.footer`
    margin-top: auto;
    padding-top: 16px;
`

const UserInfo = styled.div`
    margin-bottom: 16px;
`

interface NavigationBarProps {
    onClose: () => void
}

const navItems = [
    { path: '/organizations', label: 'Organizations', icon: <BusinessIcon /> },
    { path: '/categories', label: 'Categories', icon: <CategoryIcon /> },
    { path: '/menu-items', label: 'Menu Items', icon: <RestaurantMenuIcon /> },
]

export const NavigationBar = ({ onClose }: NavigationBarProps) => {
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const user = useAppSelector(selectUser)

    const handleLogout = () => {
        dispatch(signOutThunk())
        onClose()
        navigate('/login')
    }

    return (
        <Root>
            <Header>
                <Logo>
                    <Typography variant="h6" sx={{ fontWeight: 700, color: '#f1f5f9' }}>
                        Menu Admin
                    </Typography>
                </Logo>
                <IconButton onClick={onClose} sx={{ color: '#f1f5f9' }}>
                    <CloseIcon />
                </IconButton>
            </Header>

            <Divider sx={{ mb: 2, borderColor: '#334155' }} />

            <Tabs>
                {navItems.map(({ path, label, icon }) => (
                    <StyledNavLink key={path} to={path} onClick={onClose}>
                        {icon}
                        <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                            {label}
                        </Typography>
                    </StyledNavLink>
                ))}
            </Tabs>

            <UserFooter>
                <UserInfo>
                    <Typography variant="subtitle1" sx={{ fontWeight: 600, color: '#f1f5f9' }}>
                        {user?.email ? user.email.split('@')[0] : 'User'}
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#9ca3af' }}>
                        {user?.email || 'user@example.com'}
                    </Typography>
                </UserInfo>

                <Button
                    variant="outlined"
                    fullWidth
                    startIcon={<LogoutIcon />}
                    onClick={handleLogout}
                    sx={{
                        borderColor: '#334155',
                        color: '#774CFF',
                        '&:hover': {
                            borderColor: '#774CFF',
                            backgroundColor: 'rgba(119, 76, 255, 0.08)',
                        },
                    }}
                >
                    Log out
                </Button>
            </UserFooter>
        </Root>
    )
}
