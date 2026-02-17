import { RouterProvider } from 'react-router-dom'
import { router } from './router'
import { StoreProvider, ThemeProvider } from './providers'
import { AbilityProvider } from '@shared/lib'
import { SnackbarProvider } from 'notistack'
import { useAppErrorInterceptor } from './hooks/useAppErrorInterceptor'

// Component to handle global error listening inside providers
const ErrorListener = () => {
    useAppErrorInterceptor()
    return null
}

export const App = () => {
    return (
        <StoreProvider>
            <AbilityProvider>
                <ThemeProvider>
                    <SnackbarProvider maxSnack={3} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}>
                        <ErrorListener />
                        <RouterProvider router={router} />
                    </SnackbarProvider>
                </ThemeProvider>
            </AbilityProvider>
        </StoreProvider>
    )
}

