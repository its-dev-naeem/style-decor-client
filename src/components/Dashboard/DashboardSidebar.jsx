import React, { useState, useEffect } from "react";
import { NavLink } from "react-router";
import {
  FaUser,
  FaCalendarAlt,
  FaCreditCard,
  FaSignOutAlt,
  FaUsers,
  FaPaintBrush,
  FaClipboardList,
  FaUserCheck,
  FaChartLine,
  FaChartBar,
  FaProjectDiagram,
  FaClock,
  FaMoneyBill,
  FaBars,
  FaTimes,
  FaHome,
  FaCog,
  FaTachometerAlt,
  FaPlus,
} from "react-icons/fa";
import { FaList } from "react-icons/fa6";

const DashboardSidebar = ({ userRole = "user" }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  // Check if mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth < 768) {
        setIsSidebarOpen(false);
      } else {
        setIsSidebarOpen(true);
      }
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Common links for all roles (always at bottom)
  const commonLinks = [
    {
      id: "logout",
      name: "Logout",
      icon: <FaSignOutAlt />,
      to: "/logout",
      color: "text-red-500",
    },
  ];

  // User specific links
  const userLinks = [
    {
      id: "profile",
      name: "My Profile",
      icon: <FaUser />,
      to: "/dashboard/profile",
    },
    {
      id: "dashboard",
      name: "Dashboard",
      icon: <FaTachometerAlt />,
      to: "/dashboard",
    },
    {
      id: "bookings",
      name: "My Bookings",
      icon: <FaCalendarAlt />,
      to: "/dashboard/bookings",
    },
    {
      id: "payments",
      name: "Payment History",
      icon: <FaCreditCard />,
      to: "/dashboard/payments",
    },
  ];

  // Admin specific links
  const adminLinks = [
    {
      id: "profile",
      name: "My Profile",
      icon: <FaUser />,
      to: "/dashboard/profile",
    },
    {
      id: "dashboard",
      name: "Dashboard",
      icon: <FaTachometerAlt />,
      to: "/dashboard/admin-dashboard",
    },
    {
      id: "decorators",
      name: "Manage Decorators",
      icon: <FaUsers />,
      to: "/dashboard/admin-decorators",
    },
    {
      id: "addServices",
      name: "Add Services",
      icon: <FaPlus />,
      to: "/dashboard/admin-add-Services",
    },
    {
      id: "services",
      name: "Manage Services",
      icon: <FaPaintBrush />,
      to: "/dashboard/admin-services",
    },
    {
      id: "bookings",
      name: "Manage Bookings",
      icon: <FaClipboardList />,
      to: "/dashboard/admin-bookings",
    },
    {
      id: "assign",
      name: "Assign Decorator",
      icon: <FaUserCheck />,
      to: "/dashboard/admin-assign",
    },
    {
      id: "revenue",
      name: "Revenue Monitoring",
      icon: <FaMoneyBill />,
      to: "/dashboard/admin-revenue",
    },
    {
      id: "analytics",
      name: "Analytics Charts",
      icon: <FaChartBar />,
      to: "/dashboard/admin-analytics",
    },
  ];

  // Decorator specific links
  const decoratorLinks = [
    {
      id: "profile",
      name: "My Profile",
      icon: <FaUser />,
      to: "/dashboard/profile",
    },
    {
      id: "dashboard",
      name: "Dashboard",
      icon: <FaTachometerAlt />,
      to: "/dashboard/decorator-dashboard",
    },
    {
      id: "projects",
      name: "My Assigned Projects",
      icon: <FaProjectDiagram />,
      to: "/dashboard/decorator-projects",
    },
    {
      id: "schedule",
      name: "Today's Schedule",
      icon: <FaClock />,
      to: "/dashboard/decorator-schedule",
    },
    {
      id: "status",
      name: "Update Project Status",
      icon: <FaClipboardList />,
      to: "/dashboard/decorator-status",
    },
    {
      id: "earnings",
      name: "Earnings Summary",
      icon: <FaMoneyBill />,
      to: "/dashboard/decorator-earnings",
    },
  ];

  // Get current role links
  const getRoleLinks = () => {
    switch (userRole) {
      case "admin":
        return adminLinks;
      case "decorator":
        return decoratorLinks;
      default:
        return userLinks;
    }
  };

  const currentLinks = getRoleLinks();

  // Sample user data
  const userData = {
    name:
      userRole === "admin"
        ? "Admin User"
        : userRole === "decorator"
        ? "Decorator Pro"
        : "John Client",
    email: `${userRole}@example.com`,
    avatar: `https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face`,
  };

  return (
    <>
      {/* Mobile Toggle Button */}
      <button
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        className="lg:hidden absolute top-19 left-2 z-50"
      >
        {isSidebarOpen ? <FaTimes /> : <FaList />}
      </button>

      {/* Overlay for mobile */}
      {isSidebarOpen && isMobile && (
        <div
          className=" absolute inset-0  bg-opacity-50 z-40 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
        ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }
        absolute lg:static top-17 left-0 h-screen w-64 bg-base-100 shadow-xl z-40
        transition-transform duration-300 ease-in-out
        border-r border-base-300
      `}
      >
        <div className="p-4 h-full flex flex-col">
          {/* User Info */}
          <div className="flex items-center gap-3 p-3 bg-base-200 rounded-lg mb-6">
            <div className="avatar">
              <div className="w-10 h-10 rounded-full ring-2 ring-primary ring-offset-2">
                <img src={userData.avatar} alt={userData.name} />
              </div>
            </div>
            <div className="flex-1 min-w-0">
              <div className="font-bold truncate">{userData.name}</div>
              <div className="text-xs opacity-70 truncate">
                {userData.email}
              </div>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="flex-1 overflow-y-auto">
            <ul className="space-y-1">
              {currentLinks.map((link) => (
                <li key={link.id}>
                  <NavLink
                    to={link.to}
                    end={link.id === "dashboard"}
                    className={({ isActive }) => `
                      flex items-center gap-3 p-3 rounded-lg transition-colors
                      ${
                        isActive
                          ? "bg-primary text-primary-content font-semibold"
                          : "hover:bg-base-200"
                      }
                    `}
                    onClick={() => isMobile && setIsSidebarOpen(false)}
                  >
                    <span className="text-lg">{link.icon}</span>
                    <span>{link.name}</span>
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>

          {/* Common Links (Always at bottom) */}
          <div className="mt-auto pt-4 border-t border-base-300">
            <ul className="space-y-1">
              {commonLinks.map((link) => (
                <li key={link.id}>
                  <NavLink
                    to={link.to}
                    className={({ isActive }) => `
                      flex items-center gap-3 p-3 rounded-lg transition-colors
                      ${link.color}
                      ${isActive ? "bg-base-200" : "hover:bg-base-200"}
                    `}
                    onClick={() => isMobile && setIsSidebarOpen(false)}
                  >
                    <span className="text-lg">{link.icon}</span>
                    <span>{link.name}</span>
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </aside>
    </>
  );
};

export default DashboardSidebar;

// User specific links

// Admin specific links

// Decorator specific links

// Get current role links
// const getRoleLinks = () => {
//   switch (userRole) {
//     case "admin":
//       return adminLinks;
//     case "decorator":
//       return decoratorLinks;
//     default:
//       return userLinks;
//   }
// };
