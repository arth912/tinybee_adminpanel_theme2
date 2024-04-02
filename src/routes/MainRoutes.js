import { lazy } from 'react';

// project imports
import AuthGuard from 'utils/route-guard/AuthGuard';
import MainLayout from 'layout/MainLayout';
import Loadable from 'ui-component/Loadable';


// sample page routing
const SamplePage = Loadable(lazy(() => import('views/sample-page')));

const DashboardDefault = Loadable(lazy(() => import('views/dashboard/Default')));
const DashboardAnalytics = Loadable(lazy(() => import('views/dashboard/Analytics')));

const UserList = Loadable(lazy(() => import('views/application/users/userList')));
const ProductList = Loadable(lazy(() => import('views/application/products/ProductList')));
const OrderList = Loadable(lazy(() => import('views/application/orders/OrderList')));

const ViewOrderDetails = Loadable(lazy(()=> import('views/application/orders/OrderDetails')));

// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
    path: '/',
    element: (
        <AuthGuard>
            <MainLayout />
        </AuthGuard>
    ),
    children: [
        {
            path: '/',
            element: <SamplePage />
        },
        {
            path: '/sample-page',
            element: <SamplePage />
        },
        {
            path: '/dashboard/default',
            element: <DashboardDefault />
        },
        {
            path: '/dashboard/analytics',
            element: <DashboardAnalytics />
        },
        {
            path: '/user/user-list',
            element: <UserList />
        },
        {
            path: '/product/product-list',
            element: <ProductList />
        },
        {
            path: '/order/order-list',
            element: <OrderList />
        },
        {
            path: '/order/order-details/:id',
            element: <ViewOrderDetails />
        }
    ]
};

export default MainRoutes;
