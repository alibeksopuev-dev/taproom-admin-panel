import { useTheme } from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery'

export type Breakpoint = 'mini' | 'mobileS' | 'mobileM' | 'mobileL' | 'tablet' | 'laptop' | 'laptopL' | 'desktop' | 'max' | null

export const useBreakpoint = (): Breakpoint => {
    const theme = useTheme()

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const breakpoints = theme.breakpoints as any

    const mini = useMediaQuery(breakpoints.down('mobileS'))
    const mobileS = useMediaQuery(breakpoints.only('mobileS'))
    const mobileM = useMediaQuery(breakpoints.only('mobileM'))
    const mobileL = useMediaQuery(breakpoints.only('mobileL'))
    const tablet = useMediaQuery(breakpoints.only('tablet'))
    const laptop = useMediaQuery(breakpoints.only('laptop'))
    const laptopL = useMediaQuery(breakpoints.only('laptopL'))
    const desktop = useMediaQuery(breakpoints.only('desktop'))
    const max = useMediaQuery(breakpoints.up('max'))

    if (mini) return 'mini'
    if (mobileS) return 'mobileS'
    if (mobileM) return 'mobileM'
    if (mobileL) return 'mobileL'
    if (tablet) return 'tablet'
    if (laptop) return 'laptop'
    if (laptopL) return 'laptopL'
    if (desktop) return 'desktop'
    if (max) return 'max'
    return null
}

export const isMobileBreakpoint = (breakpoint: Breakpoint): boolean => {
    return ['mini', 'mobileS', 'mobileM', 'mobileL', 'tablet'].includes(breakpoint || '')
}
