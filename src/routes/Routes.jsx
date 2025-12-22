import { createBrowserRouter } from "react-router";
import RoleRoute from "./RoleRoute";
import PrivateRoute from "./PrivateRoute";

// layouts
import MainLayout from "../layouts/MainLayout";
import DashboardLayout from "../layouts/DashboardLayout";

// pages
import ErrorPage from "../pages/ErrorPage";
import Home from "../pages/Home/Home";
import Services from "../pages/Services/Services";
import About from "../pages/About/About";
import Contact from "../pages/Contact/Contact";
import ServiceDetails from "../components/Home/ServiceDetails";

// authentication
import Signup from "../components/Aurhentication/Signup";
import Login from "../components/Aurhentication/Login";
import Forgot from "../components/Aurhentication/Forgot";

// common
import ProfilePage from "../components/ProfilePage";

// user dashboard

import PaymentSuccess from "../components/User/PaymentSuccess";
import PaymentStatus from "../components/User/PaymentStatus";

// admin dashboard
import AddService from "../components/Admin/AddService";
import ManageDecorators from "../components/Admin/ManageDecorators";
import ManageBookings from "../components/Admin/ManageBookings";
import AssignDecorators from "../components/Admin/AssignDecorators";
import ServiceManagement from "../components/Admin/ServiceManagement";
import RevenueMonitoring from "../components/Admin/RevenueMonitoring";
import AnalyticsCharts from "../components/Admin/AnalyticsCharts";

// decorator dashboard
import MyAssignedProject from "../components/Decorator/MyAssignedProject";
import TodaysSchedule from "../components/Decorator/TodaysSchedule";
import UpdateWorkStatus from "../components/Decorator/UpdateWorkStatus";
import EarningsSummary from "../components/Decorator/EarningsSummary";
import UserBookedData from "../components/User/UserBookedData ";
import Coverage from "../pages/Coverage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Home /> },
      { path: "/services", element: <Services /> },
      {
        path: "/services/:id",
        element: (
          <PrivateRoute>
            <ServiceDetails />
          </PrivateRoute>
        ),
      },
      {
        path: "/payment-success",
        element: (
          <PrivateRoute>
            <PaymentSuccess />
          </PrivateRoute>
        ),
      },
      { path: "/about", element: <About /> },
      { path: "/contact", element: <Contact /> },
      { path: "/coverage", element: <Coverage /> },
      { path: "/login", element: <Login /> },
      { path: "/signup", element: <Signup /> },
      { path: "/forgot-password", element: <Forgot /> },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout />
      </PrivateRoute>
    ),
    children: [
      { path: "/dashboard/profile", element: <ProfilePage /> },

      // user dashboard
      {
        path: "/dashboard/bookings",
        element: (
          <RoleRoute allowedRoles={["user"]}>
            <UserBookedData />
          </RoleRoute>
        ),
      },
      {
        path: "/dashboard/payments",
        element: (
          <RoleRoute allowedRoles={["user"]}>
            <PaymentStatus />
          </RoleRoute>
        ),
      },

      // admin dashboard
      {
        path: "/dashboard/admin-decorators",
        element: (
          <RoleRoute allowedRoles={["admin"]}>
            <ManageDecorators />
          </RoleRoute>
        ),
      },
      {
        path: "/dashboard/admin-add-Services",
        element: (
          <RoleRoute allowedRoles={["admin"]}>
            <AddService />
          </RoleRoute>
        ),
      },
      {
        path: "/dashboard/admin-services",
        element: (
          <RoleRoute allowedRoles={["admin"]}>
            <ServiceManagement />
          </RoleRoute>
        ),
      },
      {
        path: "/dashboard/admin-bookings",
        element: (
          <RoleRoute allowedRoles={["admin"]}>
            <ManageBookings />
          </RoleRoute>
        ),
      },
      {
        path: "/dashboard/admin-assign",
        element: (
          <RoleRoute allowedRoles={["admin"]}>
            <AssignDecorators />
          </RoleRoute>
        ),
      },
      {
        path: "/dashboard/admin-revenue",
        element: (
          <RoleRoute allowedRoles={["admin"]}>
            <RevenueMonitoring />
          </RoleRoute>
        ),
      },
      {
        path: "/dashboard/admin-analytics",
        element: (
          <RoleRoute allowedRoles={["admin"]}>
            <AnalyticsCharts />
          </RoleRoute>
        ),
      },

      // decorator dashboard
      {
        path: "/dashboard/decorator-projects",
        element: (
          <RoleRoute allowedRoles={["decorator"]}>
            <MyAssignedProject />
          </RoleRoute>
        ),
      },
      {
        path: "/dashboard/decorator-schedule",
        element: (
          <RoleRoute allowedRoles={["decorator"]}>
            <TodaysSchedule />
          </RoleRoute>
        ),
      },
      {
        path: "/dashboard/decorator-status",
        element: (
          <RoleRoute allowedRoles={["decorator"]}>
            <UpdateWorkStatus />
          </RoleRoute>
        ),
      },
      {
        path: "/dashboard/decorator-earnings",
        element: (
          <RoleRoute allowedRoles={["decorator"]}>
            <EarningsSummary />
          </RoleRoute>
        ),
      },
    ],
  },
]);
