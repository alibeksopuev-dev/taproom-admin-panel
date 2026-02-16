import MuiDrawer from '@mui/material/Drawer'
import { ElementType, PropsWithChildren, ReactNode, useState } from 'react'
import styled from 'styled-components'

type DrawerProps = PropsWithChildren<{
    render: ({ onClose }: { onClose: () => void }) => ReactNode
    onClick?: () => void
    open?: boolean
    toggleDrawer?: (value: boolean) => void
    as?: ElementType
}>

const StyledPaper = styled.div`
    width: 400px;
    background-color: #0f172a;
    height: 100%;
    display: flex;
    flex-direction: column;

    @media (max-width: 768px) {
        width: 100%;
    }
`

export const Drawer = ({
    children,
    render,
    onClick,
    open,
    toggleDrawer,
    as: Component = 'div',
}: DrawerProps) => {
    const [internalOpen, setInternalOpen] = useState(false)

    const isControlled = open !== undefined
    const openDrawer = isControlled ? open : internalOpen
    const setOpen = (value: boolean) => (isControlled ? toggleDrawer?.(value) : setInternalOpen(value))

    const handleClick = () => {
        setOpen(true)
        onClick?.()
    }

    return (
        <>
            <Component onClick={handleClick}>{children}</Component>
            <MuiDrawer
                open={openDrawer}
                onClose={() => setOpen(false)}
                anchor="right"
                PaperProps={{ component: StyledPaper }}
            >
                {render({ onClose: () => setOpen(false) })}
            </MuiDrawer>
        </>
    )
}
