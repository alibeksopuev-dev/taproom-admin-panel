import { ReactNode, useState } from 'react'
import styled from 'styled-components'
import MuiDrawer from '@mui/material/Drawer'
import { Menu } from '../icons'

const DRAWER_WIDTH = 240
const DRAWER_WIDTH_COLLAPSED = 72

const StyledDrawer = styled(MuiDrawer) <{ $open: boolean }>`
  width: ${({ $open }) => ($open ? DRAWER_WIDTH : DRAWER_WIDTH_COLLAPSED)}px;
  flex-shrink: 0;
  white-space: nowrap;
  transition: width 0.2s ease-in-out;

  & .MuiDrawer-paper {
    width: ${({ $open }) => ($open ? DRAWER_WIDTH : DRAWER_WIDTH_COLLAPSED)}px;
    background-color: #0f172a;
    border-right: 1px solid #334155;
    transition: width 0.2s ease-in-out;
    overflow-x: hidden;
  }
`

const SidebarHeader = styled.div<{ $open: boolean }>`
  display: flex;
  align-items: center;
  justify-content: ${({ $open }) => ($open ? 'space-between' : 'center')};
  padding: 16px;
  min-height: 64px;
`

const Logo = styled.div<{ $open: boolean }>`
  display: flex;
  align-items: center;
  gap: 8px;
  color: #f1f5f9;
  font-weight: 700;
  font-size: 18px;
  overflow: hidden;
  white-space: nowrap;
`

const Navigation = styled.nav`
  flex: 1;
  overflow-y: auto;
  padding: 16px 8px;
`

const Footer = styled.div`
  padding: 16px;
  border-top: 1px solid #334155;
`

interface SidebarProps {
  header?: ReactNode
  navigation?: ReactNode
  footer?: ReactNode
  logo?: string
  logoShort?: string
}

export const Sidebar = ({
  navigation,
  footer,
  logo = 'Menu Admin',
  logoShort = 'Menu',
}: SidebarProps) => {
  const [open] = useState(true)

  return (
    <StyledDrawer variant="permanent" $open={open}>
      <SidebarHeader $open={open}>
        <Logo $open={open}>{open ? logo : logoShort}</Logo>
      </SidebarHeader>
      <Navigation>{navigation}</Navigation>
      {footer && <Footer>{footer}</Footer>}
    </StyledDrawer>
  )
}

// Sidebar context for child components
export const useSidebarOpen = () => {
  // In a real implementation, this would use context
  return true
}
