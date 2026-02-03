import { RouterProvider } from 'react-router-dom'
import { router } from './router'
import { StoreProvider, ThemeProvider } from './providers'

export const App = () => {
    return (
        <StoreProvider>
            <ThemeProvider>
                <RouterProvider router={router} />
            </ThemeProvider>
        </StoreProvider>
    )
}
