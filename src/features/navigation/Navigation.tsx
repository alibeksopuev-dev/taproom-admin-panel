import { NavLink, useLocation } from 'react-router-dom'
import styled from 'styled-components'
import BusinessIcon from '@mui/icons-material/Business'
import CategoryIcon from '@mui/icons-material/Category'
import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu'
import { useAbility } from '@shared/lib/casl'
import { routeCaslPermissions } from './model/caslPermissions'

const NavItem = styled(NavLink) <{ $active?: boolean }>`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
  border-radius: 8px;
  text-decoration: none;
  color: ${({ $active }) => ($active ? '#774CFF' : '#9ca3af')};
  background-color: ${({ $active }) => ($active ? 'rgba(119, 76, 255, 0.15)' : 'transparent')};
  transition: all 0.2s ease;

  &:hover {
    background-color: rgba(119, 76, 255, 0.1);
    color: #f1f5f9;
  }

  &.active {
    color: #774CFF;
  }

  svg {
    // MUI icons inherit color, so we can control color via 'color' property on NavItem or specifically here
    color: ${({ $active }) => ($active ? '#774CFF' : '#9ca3af')};
    transition: color 0.2s ease;
  }

  &:hover svg {
    color: #774CFF;
  }
`

const NavLabel = styled.span`
  font-size: 14px;
  font-weight: 500;
  color: #f1f5f9;
`

const NavList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`

const navItems = [
  { path: '/organizations', label: 'Organizations', icon: BusinessIcon },
  { path: '/categories', label: 'Categories', icon: CategoryIcon },
  { path: '/menu-categories', label: 'Menu Items', icon: RestaurantMenuIcon },
]

export const Navigation = () => {
  const location = useLocation()
  const ability = useAbility()

  const filterLinksByPermissions = (path: string) => {
    const permission = routeCaslPermissions[path]
    if (!permission) return true

    const subjects = Array.isArray(permission.subject)
      ? permission.subject
      : [permission.subject]

    return subjects.some((subject) => ability.can(permission.action, subject))
  }

  const visibleNavItems = navItems.filter((item) => filterLinksByPermissions(item.path))

  return (
    <NavList>
      {visibleNavItems.map((item) => {
        const isActive = location.pathname.startsWith(item.path)
        const Icon = item.icon

        return (
          <NavItem key={item.path} to={item.path} $active={isActive}>
            <Icon />
            <NavLabel>{item.label}</NavLabel>
          </NavItem>
        )
      })}
    </NavList>
  )
}
