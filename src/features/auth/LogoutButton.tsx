import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { useAppDispatch } from '@shared/lib'
import { signOutThunk } from '@entities/session'
import { LogOut } from '@shared/ui/icons'

const LogoutContainer = styled.button`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
  border: none;
  border-radius: 8px;
  background: transparent;
  color: #774CFF;
  cursor: pointer;
  width: 100%;
  transition: all 0.2s ease;

  &:hover {
    background-color: rgba(119, 76, 255, 0.1);
  }
`

const LogoutLabel = styled.span`
  font-size: 14px;
  font-weight: 500;
`

export const LogoutButton = () => {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    const handleLogout = async () => {
        await dispatch(signOutThunk())
        navigate('/login')
    }

    return (
        <LogoutContainer onClick={handleLogout}>
            <LogOut width={18} height={18} />
            <LogoutLabel>Log out</LogoutLabel>
        </LogoutContainer>
    )
}
