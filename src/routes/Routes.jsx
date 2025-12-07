
import { createBrowserRouter } from 'react-router'
import ErrorPage from '../pages/ErrorPage'
import MainLayout from '../layouts/MainLayout'
import Home from '../pages/Home/Home'
import Services from '../pages/Services/Services'
import About from '../pages/About/About'
import Contact from '../pages/Contact/Contact'
import DashboardLayout from '../layouts/DashboardLayout'
import Dashboard from '../pages/Dashboard/Dashbord'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: '/services',
        element: <Services/>
      },
      {
        path: '/about',
        element: <About/>
      },
      {
        path: '/contact',
        element: <Contact/>
      },
      {
        path: '/coverage',
        element: <Contact/>
      },
    ],
  },
  { path: '/login', element: <Home /> },
  { path: '/signup', element: <Home /> },
  {
    path: '/dashboard',
    element: (
        <DashboardLayout />
    ),
    children: [
      {
        index: true,
        element: <Dashboard/>
      },

    ],
  },
])