import { NavLink, useLocation } from 'react-router-dom'
import styled from 'styled-components'
import { Category, MenuBook } from '@shared/ui/icons'

const NavItem = styled(NavLink) <{ $active?: boolean }>`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
  border-radius: 8px;
  text-decoration: none;
  color: ${({ $active }) => ($active ? '#f1f5f9' : '#9ca3af')};
  background-color: ${({ $active }) => ($active ? 'rgba(119, 76, 255, 0.15)' : 'transparent')};
  transition: all 0.2s ease;

  &:hover {
    background-color: rgba(119, 76, 255, 0.1);
    color: #f1f5f9;
  }

  svg path {
    stroke: ${({ $active }) => ($active ? '#774CFF' : '#9ca3af')};
    transition: stroke 0.2s ease;
  }

  &:hover svg path {
    stroke: #774CFF;
  }
`

const NavLabel = styled.span`
  font-size: 14px;
  font-weight: 500;
`

const NavList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`

const navItems = [
    { path: '/categories', label: 'Categories', icon: Category },
    { path: '/menu-items', label: 'Menu Items', icon: MenuBook },
]

export const Navigation = () => {
    const location = useLocation()

    return (
        <NavList>
            {navItems.map((item) => {
                const isActive = location.pathname.startsWith(item.path)
                const Icon = item.icon

                return (
                    <NavItem key={item.path} to={item.path} $active={isActive}>
                        <Icon width={20} height={20} />
                        <NavLabel>{item.label}</NavLabel>
                    </NavItem>
                )
            })}
        </NavList>
    )
}
