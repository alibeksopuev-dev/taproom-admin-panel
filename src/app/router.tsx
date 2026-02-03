import { createBrowserRouter, Navigate } from 'react-router-dom'
import { MainLayout, AuthLayout } from './layouts'
import { Auth } from '@pages/auth'
import { Categories } from '@pages/categories'
import { CategoryDetails } from '@pages/categoryDetails'
import { CategoryCreate } from '@pages/categoryCreate'
import { CategoryEdit } from '@pages/categoryEdit'
import { MenuItems } from '@pages/menuItems'
import { MenuItemDetails } from '@pages/menuItemDetails'
import { MenuItemCreate } from '@pages/menuItemCreate'
import { MenuItemEdit } from '@pages/menuItemEdit'

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
                path: 'categories/create',
                element: <CategoryCreate />,
            },
            {
                path: 'categories/:id',
                element: <CategoryDetails />,
            },
            {
                path: 'categories/:id/edit',
                element: <CategoryEdit />,
            },
            {
                path: 'menu-items',
                element: <MenuItems />,
            },
            {
                path: 'menu-items/create',
                element: <MenuItemCreate />,
            },
            {
                path: 'menu-items/:id',
                element: <MenuItemDetails />,
            },
            {
                path: 'menu-items/:id/edit',
                element: <MenuItemEdit />,
            },
        ],
    },
])
