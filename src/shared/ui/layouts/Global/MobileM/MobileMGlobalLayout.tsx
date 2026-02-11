import { useState } from 'react'
import { Outlet, Link } from 'react-router-dom'
import styled from 'styled-components'
import { IconButton, Box, Typography, Drawer } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import { NavigationBar } from './NavigationBar'

const Root = styled.div`
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    background-color: #0f172a;
`

const TopBar = styled.header`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 16px;
    background-color: #1e293b;
    border-bottom: 1px solid #334155;
`

const Logo = styled.div`
    display: flex;
    align-items: center;
    gap: 8px;
    padding-left: 10px;
`

const Content = styled.main`
    flex: 1;
    display: flex;
    flex-direction: column;
    overflow: hidden;
`

export const MobileMGlobalLayout = () => {
    const [drawerOpen, setDrawerOpen] = useState(false)

    const handleDrawerOpen = () => setDrawerOpen(true)
    const handleDrawerClose = () => setDrawerOpen(false)

    return (
        <Root>
            <TopBar>
                <Logo>
                    <Link to="/menu-categories" style={{ textDecoration: 'none' }}>
                        <Typography variant="h6" sx={{ fontWeight: 700, color: '#f1f5f9' }}>
                            Menu Admin
                        </Typography>
                    </Link>
                </Logo>
                <Box display="flex" alignItems="center" gap={1}>
                    <IconButton onClick={handleDrawerOpen} sx={{ color: '#f1f5f9' }}>
                        <MenuIcon />
                    </IconButton>
                </Box>
            </TopBar>

            <Drawer
                anchor="right"
                open={drawerOpen}
                onClose={handleDrawerClose}
                PaperProps={{
                    sx: {
                        width: '100%',
                        maxWidth: 400,
                        backgroundColor: '#0f172a',
                    },
                }}
            >
                <NavigationBar onClose={handleDrawerClose} />
            </Drawer>

            <Content>
                <Outlet />
            </Content>
        </Root>
    )
}
