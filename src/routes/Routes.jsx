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
import ManageDecorators from "../components/Admin/ManageDecorators";
import ManageBookings from "../components/Admin/ManageBookings";
import AssignDecorators from "../components/Admin/AssignDecorators";
import ServiceDetails from "../components/Home/ServiceDetails";
import UserBookedData from "../components/User/UserBookedData ";
import PaymentSuccess from "../components/User/PaymentSuccess";
import PaymentStatus from "../components/User/PaymentStatus";
import ServiceManagement from "../components/Admin/ServiceManagement";
import RevenueMonitoring from "../components/Admin/RevenueMonitoring";
import AnalyticsCharts from "../components/Admin/AnalyticsCharts";
import MyAssignedProject from "../components/Decorator/MyAssignedProject";
import TodaysSchedule from "../components/Decorator/TodaysSchedule";
import UpdateWorkStatus from "../components/Decorator/UpdateWorkStatus";
import EarningsSummary from "../components/Decorator/EarningsSummary";

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
        path: "/services/:id",
        element: <ServiceDetails />,
      },
      {
        path: "/payment-success",
        element: <PaymentSuccess />,
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
        path: "/dashboard/profile",
        element: <ProfilePage />,
      },
      {
        path: "/dashboard/bookings",
        element: <UserBookedData />,
      },
      {
        path: "/dashboard/payments",
        element: <PaymentStatus />,
      },
      // admin dashboard links
      {
        path: "/dashboard/profile",
        element: <ProfilePage />,
      },
      {
        path: "/dashboard/admin-decorators",
        element: <ManageDecorators />,
      },
      {
        path: "/dashboard/admin-add-Services",
        element: <AddService />,
      },
      {
        path: "/dashboard/admin-services",
        element: <ServiceManagement />,
      },
      {
        path: "/dashboard/admin-bookings",
        element: <ManageBookings />,
      },
      {
        path: "/dashboard/admin-assign",
        element: <AssignDecorators />,
      },
      {
        path: "/dashboard/admin-revenue",
        element: <RevenueMonitoring />,
      },
      {
        path: "/dashboard/admin-analytics",
        element: <AnalyticsCharts />,
      },
      // decorator dashboard links
      {
        path: "/dashboard/profile",
        element: <ProfilePage />,
      },
      {
        path: "/dashboard/decorator-projects",
        element: <MyAssignedProject />,
      },
      {
        path: "/dashboard/decorator-schedule",
        element: <TodaysSchedule />,
      },
      {
        path: "/dashboard/decorator-status",
        element: <UpdateWorkStatus />,
      },
      {
        path: "/dashboard/decorator-earnings",
        element: <EarningsSummary />,
      },
    ],
  },
]);
