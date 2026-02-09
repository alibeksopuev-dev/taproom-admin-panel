import { createTheme, ThemeProvider as MuiThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import { ReactNode } from 'react'

// Extend MUI theme to support custom breakpoints
declare module '@mui/material/styles' {
    interface BreakpointOverrides {
        xs: false
        sm: false
        md: false
        lg: false
        xl: false
        mini: true
        mobileS: true
        mobileM: true
        mobileL: true
        tablet: true
        laptop: true
        laptopL: true
        desktop: true
        max: true
    }
}

const theme = createTheme({
    breakpoints: {
        values: {
            mini: 0,
            mobileS: 320,
            mobileM: 375,
            mobileL: 425,
            tablet: 768,
            laptop: 1024,
            laptopL: 1440,
            desktop: 1920,
            max: 2560,
        },
    },
    palette: {
        mode: 'dark',
        primary: {
            main: '#774CFF',
        },
        secondary: {
            main: '#10B981',
        },
        background: {
            default: '#0f172a',
            paper: '#1e293b',
        },
        text: {
            primary: '#f1f5f9',
            secondary: '#9ca3af',
        },
        error: {
            main: '#ef4444',
        },
        success: {
            main: '#10B981',
        },
        warning: {
            main: '#f59e0b',
        },
        divider: '#334155',
    },
    typography: {
        fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    },
    shape: {
        borderRadius: 8,
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    textTransform: 'none',
                    fontWeight: 600,
                },
                contained: {
                    boxShadow: 'none',
                    '&:hover': {
                        boxShadow: 'none',
                    },
                },
                outlined: {
                    borderColor: '#334155',
                    '&:hover': {
                        borderColor: '#774CFF',
                        backgroundColor: 'rgba(119, 76, 255, 0.04)',
                    },
                },
            },
        },
        MuiTableCell: {
            styleOverrides: {
                root: {
                    borderBottom: '1px solid #334155',
                },
                head: {
                    backgroundColor: '#1e293b',
                    color: '#9ca3af',
                    fontWeight: 600,
                },
            },
        },
        MuiTableRow: {
            styleOverrides: {
                root: {
                    '&:hover': {
                        backgroundColor: 'rgba(119, 76, 255, 0.08)',
                    },
                },
            },
        },
        MuiDrawer: {
            styleOverrides: {
                paper: {
                    backgroundColor: '#0f172a',
                    borderRight: '1px solid #334155',
                },
            },
        },
        MuiTextField: {
            styleOverrides: {
                root: {
                    '& .MuiOutlinedInput-root': {
                        '& fieldset': {
                            borderColor: '#334155',
                        },
                        '&:hover fieldset': {
                            borderColor: '#475569',
                        },
                        '&.Mui-focused fieldset': {
                            borderColor: '#774CFF',
                        },
                    },
                },
            },
        },
        MuiChip: {
            styleOverrides: {
                root: {
                    fontWeight: 600,
                },
            },
        },
        MuiPaper: {
            styleOverrides: {
                root: {
                    backgroundImage: 'none',
                },
            },
        },
    },
})

interface ThemeProviderProps {
    children: ReactNode
}

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
    return (
        <MuiThemeProvider theme={theme}>
            <CssBaseline />
            {children}
        </MuiThemeProvider>
    )
}
