import axios from "axios";
import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../providers/AuthContext";
import {
  FiDollarSign,
  FiTrendingUp,
  FiPackage,
  FiCheckCircle,
  FiUser,
  FiMail,
  FiCalendar,
  FiMapPin,
} from "react-icons/fi";
import LoadingSpinner from "../Shared/LoadingSpinner";
const API_URL = import.meta.env.VITE_API_URL;

const EarningsSummary = () => {
  const { user } = useContext(AuthContext);
  const [summary, setSummary] = useState({
    total: 0,
    pending: 0,
    completed: 0,
    count: 0,
  });
  const [recentBookings, setRecentBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user?.email) fetchEarnings();
  }, [user?.email]);

  const fetchEarnings = async () => {
    try {
      const response = await axios.get(
        `${API_URL}/payment/decorator/${user.email}`
      );
      const projects = response.data;

      // Calculate earnings summary
      const total = projects.reduce(
        (sum, p) => sum + (parseFloat(p.price) || 0),
        0
      );
      const completed = projects
        .filter((p) => p.workStatus?.toLowerCase() === "completed")
        .reduce((sum, p) => sum + (parseFloat(p.price) || 0), 0);
      const pending = projects
        .filter(
          (p) => !p.workStatus || p.workStatus.toLowerCase() !== "completed"
        )
        .reduce((sum, p) => sum + (parseFloat(p.price) || 0), 0);

      // Get recent bookings (last 5)
      const recent = projects
        .sort(
          (a, b) =>
            new Date(b.deliveryTime || b._id) -
            new Date(a.deliveryTime || a._id)
        )
        .slice(0, 5);

      setSummary({
        total: total.toFixed(2),
        pending: pending.toFixed(2),
        completed: completed.toFixed(2),
        count: projects.length,
      });

      setRecentBookings(recent);
      setLoading(false);
    } catch (error) {
      console.error("Error:", error);
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "Not set";
    return new Date(dateString).toLocaleDateString("en-US", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  if (loading) return <LoadingSpinner></LoadingSpinner>;
  return (
    <div className="min-h-screen bg-base-200 p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Earnings Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="card bg-base-100 shadow">
            <div className="card-body p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-500">Total Earnings</p>
                  <h3 className="text-2xl font-bold">BDT {summary.total}</h3>
                </div>
                <FiDollarSign className="text-3xl text-green-500" />
              </div>
            </div>
          </div>

          <div className="card bg-base-100 shadow">
            <div className="card-body p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-500">Completed</p>
                  <h3 className="text-2xl font-bold">
                    BDT {summary.completed}
                  </h3>
                </div>
                <FiCheckCircle className="text-3xl text-blue-500" />
              </div>
            </div>
          </div>

          <div className="card bg-base-100 shadow">
            <div className="card-body p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-500">Pending</p>
                  <h3 className="text-2xl font-bold">BDT {summary.pending}</h3>
                </div>
                <FiTrendingUp className="text-3xl text-yellow-500" />
              </div>
            </div>
          </div>

          <div className="card bg-base-100 shadow">
            <div className="card-body p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-500">Total Projects</p>
                  <h3 className="text-2xl font-bold">{summary.count}</h3>
                </div>
                <FiPackage className="text-3xl text-purple-500" />
              </div>
            </div>
          </div>
        </div>

        {/* Recent Bookings Table */}
        <div className="card bg-base-100 shadow">
          <div className="card-body">
            <h3 className="card-title flex items-center gap-2">
              <FiCalendar className="text-primary" /> Recent Bookings
            </h3>
            <p className="text-gray-600 mb-4">Your recent service bookings</p>

            <div className="overflow-x-auto">
              <table className="table w-full">
                <thead>
                  <tr className="bg-base-300">
                    <th className="py-3 px-4 text-center">Client</th>
                    <th className="py-3 px-4 text-center">Service</th>
                    <th className="py-3 px-4 text-center">Location</th>
                    <th className="py-3 px-4 text-center">Delivery Date</th>
                    <th className="py-3 px-4 text-center">Price</th>
                    <th className="py-3 px-4 text-center">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {recentBookings.length === 0 ? (
                    <tr>
                      <td colSpan="6" className="text-center py-8">
                        <div className="text-gray-500">No bookings yet</div>
                      </td>
                    </tr>
                  ) : (
                    recentBookings.map((booking) => (
                      <tr key={booking._id} className="hover:bg-base-200">
                        <td className="py-3 px-4">
                          <div className="flex flex-col items-center text-center">
                            <div className="font-semibold">
                              {booking.userName}
                            </div>
                            <div className="text-sm text-gray-500 truncate max-w-[150px]">
                              {booking.userEmail}
                            </div>
                          </div>
                        </td>

                        <td className="py-3 px-4 text-center">
                          <div className="font-medium">
                            {booking.serviceName}
                          </div>
                          <div className="text-sm text-gray-500">
                            {booking.category}
                          </div>
                        </td>

                        <td className="py-3 px-4 text-center">
                          <div className="flex flex-col items-center">
                            <FiMapPin className="text-gray-400 mb-1" />
                            <span>{booking.location}</span>
                          </div>
                        </td>

                        <td className="py-3 px-4 text-center">
                          <div className="flex flex-col items-center">
                            <FiCalendar className="text-gray-400 mb-1" />
                            <span>{formatDate(booking.deliveryTime)}</span>
                          </div>
                        </td>

                        <td className="py-3 px-4 text-center">
                          <div className="font-bold text-lg">
                            BDT {booking.price}
                          </div>
                          <div className="text-sm text-gray-500">
                            {booking.unit}
                          </div>
                        </td>

                        <td className="py-3 px-4 text-center">
                          <span
                            className={`badge ${
                              booking.workStatus?.toLowerCase() === "completed"
                                ? "badge-success"
                                : booking.workStatus?.toLowerCase() ===
                                  "processing"
                                ? "badge-info"
                                : "badge-warning"
                            }`}
                          >
                            {booking.workStatus || "Pending"}
                          </span>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          <div className="card bg-base-100 shadow">
            <div className="card-body">
              <h4 className="font-bold text-lg flex items-center gap-2">
                <FiUser className="text-primary" /> Client Summary
              </h4>
              <div className="mt-4 space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Total Clients</span>
                  <span className="font-bold">
                    {
                      [...new Set(recentBookings.map((b) => b.userEmail))]
                        .length
                    }
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Active Projects</span>
                  <span className="font-bold">
                    {
                      recentBookings.filter(
                        (b) => b.workStatus?.toLowerCase() !== "completed"
                      ).length
                    }
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="card bg-base-100 shadow">
            <div className="card-body">
              <h4 className="font-bold text-lg flex items-center gap-2">
                <FiDollarSign className="text-primary" /> Financial Summary
              </h4>
              <div className="mt-4 space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Avg. Project Value</span>
                  <span className="font-bold">
                    BDT {(summary.total / summary.count || 0).toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Completion Rate</span>
                  <span className="font-bold">
                    {((summary.completed / summary.total) * 100 || 0).toFixed(
                      1
                    )}
                    %
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="card bg-base-100 shadow">
            <div className="card-body">
              <h4 className="font-bold text-lg flex items-center gap-2">
                <FiCalendar className="text-primary" /> Timeline Summary
              </h4>
              <div className="mt-4 space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Upcoming Deliveries</span>
                  <span className="font-bold">
                    {
                      recentBookings.filter(
                        (b) =>
                          b.deliveryTime &&
                          new Date(b.deliveryTime) > new Date()
                      ).length
                    }
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Past Due</span>
                  <span className="font-bold">
                    {
                      recentBookings.filter(
                        (b) =>
                          b.deliveryTime &&
                          new Date(b.deliveryTime) < new Date() &&
                          b.workStatus?.toLowerCase() !== "completed"
                      ).length
                    }
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EarningsSummary;
