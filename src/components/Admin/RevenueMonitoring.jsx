import React, { useState, useEffect, useContext } from "react";
import axios from "axios";

import {
  FiDollarSign,
  FiTrendingUp,
  FiPackage,
  FiCalendar,
  FiFilter,
} from "react-icons/fi";
import { AuthContext } from "../../providers/AuthContext";
import { Link } from "react-router";

const RevenueMonitoring = () => {
  const { user } = useContext(AuthContext);
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({ total: 0, completed: 0, pending: 0 });
  const [timeFilter, setTimeFilter] = useState("all");

  useEffect(() => {
    fetchOrders();
  }, []);

  useEffect(() => {
    if (orders.length > 0) {
      filterOrders();
      calculateStats();
    }
  }, [orders, timeFilter]);

  const fetchOrders = async () => {
    try {
      const response = await axios.get("http://localhost:3000/payments");
      const userOrders = response.data;
      setOrders(userOrders);
      setFilteredOrders(userOrders);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching orders:", error);
      setLoading(false);
    }
  };

  const filterOrders = () => {
    let filtered = orders;
    if (timeFilter === "today") {
      const today = new Date().toDateString();
      filtered = filtered.filter(
        (order) => new Date(order._id).toDateString() === today
      );
    } else if (timeFilter === "month") {
      const now = new Date();
      filtered = filtered.filter(
        (order) => new Date(order._id).getMonth() === now.getMonth()
      );
    }
    setFilteredOrders(filtered);
  };

  const calculateStats = () => {
    const total = orders.reduce((sum, order) => sum + order.price, 0);
    const completed = orders.filter((order) => order.status === "paid").length;
    const pending = orders.filter((order) => order.status === "pending").length;
    setStats({ total, completed, pending });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-base-200 p-6 flex justify-center items-center">
        <div className="loading loading-spinner loading-lg"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-base-200 p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Revenue Monitoring</h1>
          <p className="text-gray-600">Track your earnings and orders</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="card bg-base-100 shadow">
            <div className="card-body">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-500">Total Revenue</p>
                  <h3 className="text-2xl font-bold">BDT{stats.total}</h3>
                </div>
                <FiDollarSign className="text-3xl text-green-500" />
              </div>
            </div>
          </div>

          <div className="card bg-base-100 shadow">
            <div className="card-body">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-500">Completed Orders</p>
                  <h3 className="text-2xl font-bold">{stats.completed}</h3>
                </div>
                <FiTrendingUp className="text-3xl text-blue-500" />
              </div>
            </div>
          </div>

          <div className="card bg-base-100 shadow">
            <div className="card-body">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-500">Active Orders</p>
                  <h3 className="text-2xl font-bold">
                    {filteredOrders.length}
                  </h3>
                </div>
                <FiPackage className="text-3xl text-yellow-500" />
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="flex items-center gap-2">
            <FiFilter />
            <span className="font-semibold">Filter by:</span>
          </div>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setTimeFilter("all")}
              className={`btn btn-sm ${
                timeFilter === "all" ? "btn-primary" : "btn-outline"
              }`}
            >
              All Time
            </button>
            <button
              onClick={() => setTimeFilter("today")}
              className={`btn btn-sm ${
                timeFilter === "today" ? "btn-primary" : "btn-outline"
              }`}
            >
              Today
            </button>
            <button
              onClick={() => setTimeFilter("month")}
              className={`btn btn-sm ${
                timeFilter === "month" ? "btn-primary" : "btn-outline"
              }`}
            >
              This Month
            </button>
          </div>
        </div>

        {/* Orders Table */}
        <div className="card bg-base-100 shadow">
          <div className="card-body p-0">
            <div className="overflow-x-auto">
              <table className="table w-full">
                <thead>
                  <tr>
                    <th>Service</th>
                    <th>Customer</th>
                    <th>Date</th>
                    <th>Status</th>
                    <th>Amount</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredOrders.length === 0 ? (
                    <tr>
                      <td colSpan="6" className="text-center py-8">
                        No orders found
                      </td>
                    </tr>
                  ) : (
                    filteredOrders.map((order) => (
                      <tr key={order._id}>
                        <td>
                          <div className="flex items-center gap-3">
                            <div className="avatar">
                              <div className="w-12 h-12 rounded">
                                <img
                                  src={order.image}
                                  alt={order.serviceName}
                                />
                              </div>
                            </div>
                            <div>
                              <div className="font-bold">
                                {order.serviceName}
                              </div>
                              <div className="text-sm opacity-50">
                                {order.category}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td>
                          <div>
                            <div className="font-semibold">
                              {order.customer}
                            </div>
                            <div className="text-sm">{order.userEmail}</div>
                          </div>
                        </td>
                        <td>N/A</td>
                        <td>
                          <span
                            className={`badge ${
                              order.status === "paid"
                                ? "badge-success"
                                : "badge-warning"
                            }`}
                          >
                            {order.status}
                          </span>
                        </td>
                        <td className="font-bold">BDT{order.price}</td>
                        <td>
                          <Link to='/dashboard/admin-assign' className="btn btn-sm btn-outline">
                            View Details
                          </Link>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Summary */}
        <div className="mt-8 card bg-base-100 shadow">
          <div className="card-body">
            <h3 className="card-title">Order Summary</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold mb-2">By Category</h4>
                <div className="space-y-2">
                  {Array.from(new Set(orders.map((o) => o.category))).map(
                    (cat) => {
                      const catOrders = orders.filter(
                        (o) => o.category === cat
                      );
                      const total = catOrders.reduce(
                        (sum, o) => sum + o.price,
                        0
                      );
                      return (
                        <div key={cat} className="flex justify-between">
                          <span>{cat}</span>
                          <span className="font-semibold">BDT{total}</span>
                        </div>
                      );
                    }
                  )}
                </div>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Recent Activity</h4>
                <div className="space-y-3">
                  {orders.slice(0, 3).map((order) => (
                    <div
                      key={order._id}
                      className="flex justify-between items-center"
                    >
                      <div>
                        <p className="font-medium">{order.serviceName}</p>
                        <p className="text-sm text-gray-500">
                          {order.customer}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold">BDT{order.price}</p>
                        <p className="text-sm">{order.status}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RevenueMonitoring;
