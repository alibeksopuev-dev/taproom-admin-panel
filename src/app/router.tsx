import { createBrowserRouter, Navigate } from 'react-router-dom'
import { AuthLayout } from './layouts'
import { AppLoader, AuthorizedLoader, UnAuthorizedLoader } from './loaders'
import { GlobalLayout } from '@shared/ui'
import { Auth } from '@pages/auth'
import { Categories } from '@pages/categories'
import { CategoryDetails } from '@pages/categoryDetails'
import { CategoryCreate } from '@pages/categoryCreate'
import { CategoryEdit } from '@pages/categoryEdit'
import { MenuItems } from '@pages/menuItems'
import { MenuItemDetails } from '@pages/menuItemDetails'
import { MenuItemCreate } from '@pages/menuItemCreate'
import { MenuItemEdit } from '@pages/menuItemEdit'
import { Organizations } from '@pages/organizations'
import { OrganizationDetails } from '@pages/organizationDetails'
import { OrganizationCreate } from '@pages/organizationCreate'
import { OrganizationEdit } from '@pages/organizationEdit'
import { MenuCategories } from '@pages/menuCategories'

export const router = createBrowserRouter([
    {
        element: <AppLoader />,
        children: [
            {
                path: '/',
                element: (
                    <UnAuthorizedLoader>
                        <AuthLayout />
                    </UnAuthorizedLoader>
                ),
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
                element: (
                    <AuthorizedLoader>
                        <GlobalLayout />
                    </AuthorizedLoader>
                ),
                children: [
                    {
                        path: 'menu-categories',
                        element: <MenuCategories />,
                    },
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
                    {
                        path: 'organizations',
                        element: <Organizations />,
                    },
                    {
                        path: 'organizations/create',
                        element: <OrganizationCreate />,
                    },
                    {
                        path: 'organizations/:id',
                        element: <OrganizationDetails />,
                    },
                    {
                        path: 'organizations/:id/edit',
                        element: <OrganizationEdit />,
                    },
                ],
            },
        ],
    },
])
