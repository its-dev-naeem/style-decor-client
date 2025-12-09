import { createBrowserRouter } from "react-router";
import ErrorPage from "../pages/ErrorPage";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home/Home";
import Services from "../pages/Services/Services";
import About from "../pages/About/About";
import Contact from "../pages/Contact/Contact";
import DashboardLayout from "../layouts/DashboardLayout";
import Dashboard from "../pages/Dashboard/Dashbord";
import Signup from "../components/Aurhentication/Signup";
import Login from "../components/Aurhentication/Login";
import Forgot from "../components/Aurhentication/Forgot";
import ProfilePage from "../components/ProfilePage";
import AddService from "../components/Admin/AddService";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/services",
        element: <Services />,
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/contact",
        element: <Contact />,
      },
      {
        path: "/coverage",
        element: <Contact />,
      },
      { path: "/login", 
        element: <Login /> 
      },
      { path: "/signup", 
        element: <Signup /> 
      },
      { path: "/forgot-password", 
        element: <Forgot /> 
      },
    ],
  },
  {
    path: "/dashboard",
    element: <DashboardLayout />,
    children: [
      // user dashboard links
      {
        index: true,
        element: <Dashboard />,
      },
      {
        path: "/dashboard/profile",
        element: <ProfilePage />,
      },
      {
        path: "/dashboard/bookings",
        element: <Dashboard />,
      },
      {
        path: "/dashboard/payments",
        element: <Dashboard />,
      },
      // admin dashboard links
      {
        path: "/dashboard/admin-dashboard",
        element: <Dashboard />,
      },
      {
        path: "/dashboard/profile",
        element: <ProfilePage />,
      },
      {
        path: "/dashboard/admin-decorators",
        element: <Dashboard />,
      },
      {
        path: "/dashboard/admin-add-Services",
        element: <AddService />,
      },
      {
        path: "/dashboard/admin-services",
        element: <Dashboard />,
      },
      {
        path: "/dashboard/admin-bookings",
        element: <Dashboard />,
      },
      {
        path: "/dashboard/admin-assign",
        element: <Dashboard />,
      },
      {
        path: "/dashboard/admin-revenue",
        element: <Dashboard />,
      },
      {
        path: "/dashboard/admin-analytics",
        element: <Dashboard />,
      },
      // decorator dashboard links
      {
        path: "/dashboard/profile",
        element: <ProfilePage />,
      },
      {
        path: "/dashboard/decorator-dashboard",
        element: <About />,
      },
      {
        path: "/dashboard/decorator-projects",
        element: <Dashboard />,
      },
      {
        path: "/dashboard/decorator-schedule",
        element: <Dashboard />,
      },
      {
        path: "/dashboard/decorator-status",
        element: <Dashboard />,
      },
      {
        path: "/dashboard/decorator-earnings",
        element: <Dashboard />,
      },
    ],
  },
]);
