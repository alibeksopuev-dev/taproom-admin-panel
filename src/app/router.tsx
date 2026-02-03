import { createBrowserRouter, Navigate } from 'react-router-dom'
import { MainLayout, AuthLayout } from './layouts'
import { Auth } from '@pages/auth'
import { Categories } from '@pages/categories'
import { CategoryDetails } from '@pages/categoryDetails'

export const router = createBrowserRouter([
    {
        path: '/',
        element: <AuthLayout />,
        children: [
            {
                path: 'login',
                element: <Auth />,
            },
            {
                index: true,
                element: <Navigate to="/categories" replace />,
            },
        ],
    },
    {
        path: '/',
        element: <MainLayout />,
        children: [
            {
                path: 'categories',
                element: <Categories />,
            },
            {
                path: 'categories/:id',
                element: <CategoryDetails />,
            },
            {
                path: 'categories/:id/edit',
                element: <div>Edit Category (Coming Soon)</div>,
            },
            {
                path: 'categories/create',
                element: <div>Create Category (Coming Soon)</div>,
            },
            {
                path: 'menu-items',
                element: <div>Menu Items (Coming Soon)</div>,
            },
            {
                path: 'menu-items/:id',
                element: <div>Menu Item Details (Coming Soon)</div>,
            },
            {
                path: 'menu-items/:id/edit',
                element: <div>Edit Menu Item (Coming Soon)</div>,
            },
            {
                path: 'menu-items/create',
                element: <div>Create Menu Item (Coming Soon)</div>,
            },
        ],
    },
])
