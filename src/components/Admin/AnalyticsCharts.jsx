import React, { useState, useEffect } from "react";
import axios from "axios";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { FiBarChart2, FiPieChart, FiDollarSign, FiShoppingBag, FiTrendingUp, FiCalendar } from "react-icons/fi";

const AnalyticsCharts = () => {
  const [bookings, setBookings] = useState([]);
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");
  const [stats, setStats] = useState({ total: 0, revenue: 0, paid: 0, unpaid: 0 });

  useEffect(() => { fetchData(); }, []);
  useEffect(() => { if (bookings.length) calculateStats(); }, [bookings, filter]);

  const fetchData = async () => {
    try {
      const [bookingsRes, servicesRes] = await Promise.all([
        axios.get("http://localhost:3000/booking-data"),
        axios.get("http://localhost:3000/services")
      ]);
      setBookings(bookingsRes.data);
      setServices(servicesRes.data);
      setLoading(false);
    } catch (error) {
      console.error("Error:", error);
      setLoading(false);
    }
  };

  const filterBookings = () => {
    if (filter === "today") {
      const today = new Date().toDateString();
      return bookings.filter(b => new Date(b.service.bookTime).toDateString() === today);
    }
    if (filter === "month") {
      const now = new Date();
      return bookings.filter(b => new Date(b.service.bookTime).getMonth() === now.getMonth());
    }
    return bookings;
  };

  const calculateStats = () => {
    const filtered = filterBookings();
    const total = filtered.length;
    const revenue = filtered.reduce((sum, b) => b.service.status === "Paid" ? sum + b.service.price : sum, 0);
    const paid = filtered.filter(b => b.service.status === "Paid").length;
    const unpaid = filtered.filter(b => b.service.status === "Unpaid").length;
    setStats({ total, revenue, paid, unpaid });
  };

  const prepareData = () => {
    const serviceCounts = {};
    const categoryCounts = {};
    const statusCounts = { Paid: 0, Unpaid: 0 };

    filterBookings().forEach(b => {
      const name = b.service.name;
      serviceCounts[name] = (serviceCounts[name] || 0) + 1;
      
      const category = b.service.caterory || "Other";
      categoryCounts[category] = (categoryCounts[category] || 0) + 1;
      
      statusCounts[b.service.status] = (statusCounts[b.service.status] || 0) + 1;
    });

    return {
      services: Object.entries(serviceCounts).map(([name, count]) => ({ name, count })),
      categories: Object.entries(categoryCounts).map(([name, value]) => ({ name, value })),
      status: Object.entries(statusCounts).map(([name, value]) => ({ name, value }))
    };
  };

  if (loading) return (
    <div className="min-h-screen bg-base-200 p-6 flex justify-center items-center">
      <div className="loading loading-spinner loading-lg"></div>
    </div>
  );

  const data = prepareData();
  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8"];

  return (
    <div className="min-h-screen bg-base-200 p-4">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Service Analytics</h1>
          <p className="text-gray-600">Booking and revenue insights</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="card bg-base-100 shadow">
            <div className="card-body p-4">
              <div className="flex items-center justify-between">
                <div><p className="text-gray-500">Total Bookings</p><h3 className="text-2xl font-bold">{stats.total}</h3></div>
                <FiShoppingBag className="text-3xl text-blue-500" />
              </div>
            </div>
          </div>
          <div className="card bg-base-100 shadow">
            <div className="card-body p-4">
              <div className="flex items-center justify-between">
                <div><p className="text-gray-500">Revenue</p><h3 className="text-2xl font-bold">${stats.revenue}</h3></div>
                <FiDollarSign className="text-3xl text-green-500" />
              </div>
            </div>
          </div>
          <div className="card bg-base-100 shadow">
            <div className="card-body p-4">
              <div className="flex items-center justify-between">
                <div><p className="text-gray-500">Paid</p><h3 className="text-2xl font-bold">{stats.paid}</h3></div>
                <FiTrendingUp className="text-3xl text-purple-500" />
              </div>
            </div>
          </div>
          <div className="card bg-base-100 shadow">
            <div className="card-body p-4">
              <div className="flex items-center justify-between">
                <div><p className="text-gray-500">Unpaid</p><h3 className="text-2xl font-bold">{stats.unpaid}</h3></div>
                <FiCalendar className="text-3xl text-yellow-500" />
              </div>
            </div>
          </div>
        </div>

        <div className="flex gap-2 mb-8">
          {["all", "today", "month"].map(time => (
            <button key={time} onClick={() => setFilter(time)} className={`btn btn-sm ${filter === time ? "btn-primary" : "btn-outline"}`}>
              {time === "all" ? "All Time" : time === "today" ? "Today" : "This Month"}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <div className="card bg-base-100 shadow">
            <div className="card-body">
              <h3 className="card-title">Bookings by Service</h3>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={data.services.slice(0, 6)}>
                    <XAxis dataKey="name" angle={-45} textAnchor="end" height={60} />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="count" fill="#8884d8" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          <div className="card bg-base-100 shadow">
            <div className="card-body">
              <h3 className="card-title">Bookings by Category</h3>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={data.categories} cx="50%" cy="50%" outerRadius={80} label dataKey="value">
                      {data.categories.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <div className="card bg-base-100 shadow">
            <div className="card-body">
              <h3 className="card-title">Payment Status</h3>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={data.status} cx="50%" cy="50%" outerRadius={80} label dataKey="value">
                      <Cell fill="#00C49F" />
                      <Cell fill="#FF8042" />
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          <div className="card bg-base-100 shadow">
            <div className="card-body">
              <h3 className="card-title">Top Services</h3>
              <div className="overflow-x-auto">
                <table className="table w-full">
                  <thead><tr><th>Service</th><th>Category</th><th>Bookings</th><th>Revenue</th></tr></thead>
                  <tbody>
                    {data.services.slice(0, 5).map((srv, i) => {
                      const service = services.find(s => s.serviceName === srv.name);
                      return (
                        <tr key={i}>
                          <td><div className="flex items-center gap-3"><img src={service?.ServicImage} alt="" className="w-10 h-10 rounded" /><span>{srv.name}</span></div></td>
                          <td>{service?.serviceCategory || "-"}</td>
                          <td>{srv.count}</td>
                          <td>${(srv.count * (parseInt(service?.price) || 0)).toFixed(2)}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        <div className="card bg-base-100 shadow">
          <div className="card-body">
            <h3 className="card-title">Recent Bookings</h3>
            <div className="overflow-x-auto">
              <table className="table w-full">
                <thead><tr><th>Service</th><th>Customer</th><th>Date</th><th>Status</th><th>Amount</th></tr></thead>
                <tbody>
                  {filterBookings().slice(0, 5).map(b => (
                    <tr key={b._id}>
                      <td><div className="flex items-center gap-3"><img src={b.service.image} alt="" className="w-10 h-10 rounded" /><span>{b.service.name}</span></div></td>
                      <td><div><div className="font-semibold">{b.user.name}</div><div className="text-sm">{b.user.email}</div></div></td>
                      <td>{b.service.bookTime.split(",")[0]}</td>
                      <td><span className={`badge ${b.service.status === "Paid" ? "badge-success" : "badge-warning"}`}>{b.service.status}</span></td>
                      <td className="font-bold">${b.service.price}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsCharts;