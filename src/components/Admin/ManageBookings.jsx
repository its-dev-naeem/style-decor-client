import axios from "axios";
import { useEffect, useState } from "react";
import {
  FaCalendarAlt,
  FaUser,
  FaImage,
  FaTag,
  FaMoneyBill,
  FaInfoCircle,
  FaTrash,
  FaSearch,
} from "react-icons/fa";
import { MdEmail, MdCategory } from "react-icons/md";
import LoadingSpinner from "../Shared/LoadingSpinner";
import toast from "react-hot-toast";
const API_URL = import.meta.env.VITE_API_URL;

const ManageBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  // NEW STATES
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await axios.get(`${API_URL}/booking-data`);
        setBookings(response.data);
      } catch (error) {
        console.error("Error fetching bookings:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case "Paid":
        return "badge-success";
      case "Pending":
        return "badge-warning";
      case "Unpaid":
        return "badge-error";
      default:
        return "badge-neutral";
    }
  };

  // CANCEL BOOKING HANDLER
  const handleCancel = async (id) => {
    const confirmDelete = confirm(
      "Are you sure you want to cancel this booking?"
    );
    if (!confirmDelete) return;

    try {
      await axios.delete(`${API_URL}/booking-data/${id}`);
      setBookings(bookings.filter((b) => b._id !== id));
      toast.success('Booking cancel successfull!')
    } catch (error) {
      toast.error("Error canceling booked");
    }
  };

  // SEARCH + FILTER LOGIC
  const filteredBookings = bookings.filter((booking) => {
    const searchMatch =
      booking.user.name.toLowerCase().includes(search.toLowerCase()) ||
      booking.user.email.toLowerCase().includes(search.toLowerCase());

    const categoryMatch =
      category === "All" || booking.service.caterory === category;

    return searchMatch && categoryMatch;
  });

  // COLLECT UNIQUE CATEGORIES
  const categories = [
    "All",
    ...new Set(bookings.map((b) => b.service.caterory)),
  ];

  if (loading) {
    return <LoadingSpinner></LoadingSpinner>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
            My Booked Services
          </h1>
          <p className="text-gray-600">
            Total {filteredBookings.length} booking
            {filteredBookings.length !== 1 ? "s" : ""} found
          </p>
        </div>

        {/* Search + Filter Row */}
        <div className="flex flex-col md:flex-row items-center gap-4 mb-6">
          {/* Search */}
          <div className="w-full md:w-1/2 relative">
            <FaSearch className="absolute left-3 top-3 text-gray-400" />
            <input
              type="text"
              placeholder="Search by user name or email..."
              className="input input-bordered w-full pl-10"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          {/* Category Filter */}
          <select
            className="select select-bordered w-full md:w-1/4"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            {categories.map((cat, index) => (
              <option key={index}>{cat}</option>
            ))}
          </select>
        </div>

        {/* Table for Desktop */}
        <div className="hidden lg:block">
          <div className="card bg-base-100 shadow-xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="table">
                <thead className="bg-base-200">
                  <tr>
                    <th className="text-lg font-semibold">Service</th>
                    <th className="text-lg font-semibold">User</th>
                    <th className="text-lg font-semibold">Details</th>
                    <th className="text-lg font-semibold">Status</th>
                    <th className="text-lg font-semibold">Action</th>
                  </tr>
                </thead>

                <tbody>
                  {filteredBookings.map((booking) => (
                    <tr key={booking._id}>
                      <td>
                        <div className="flex items-center gap-4">
                          <div className="avatar">
                            <div className="w-16 h-16 rounded-lg">
                              <img src={booking.service.image} />
                            </div>
                          </div>
                          <div>
                            <h3 className="font-bold text-lg">
                              {booking.service.name}
                            </h3>
                            <div className="flex items-center gap-2 text-sm text-gray-500">
                              <MdCategory />
                              {booking.service.caterory}
                            </div>
                            <div className="flex items-center gap-2 text-sm text-gray-500">
                              <FaMoneyBill /> BDT {booking.service.price}
                            </div>
                          </div>
                        </div>
                      </td>

                      <td>
                        <div className="flex items-center gap-3">
                          <div className="avatar">
                            <div className="w-12 h-12 rounded-full">
                              <img src={booking.user.photo} />
                            </div>
                          </div>
                          <div>
                            <h4 className="font-semibold">
                              {booking.user.name}
                            </h4>
                            <div className="flex items-center gap-1 text-sm text-gray-500">
                              <MdEmail />
                              {booking.user.email}
                            </div>
                          </div>
                        </div>
                      </td>

                      <td>
                        <div className="space-y-2 text-sm">
                          <div className="flex items-center gap-2">
                            <FaCalendarAlt />
                            {booking.service.bookTime}
                          </div>
                          <div className="flex items-center gap-2">
                            <FaTag />
                            {booking.service.unit}
                          </div>
                        </div>
                      </td>

                      <td>
                        <div
                          className={`badge badge-lg p-4 font-bold ${getStatusColor(
                            booking.service.status
                          )}`}
                        >
                          {booking.service.status}
                        </div>
                      </td>

                      {/* CANCEL BUTTON */}
                      <td>
                        <button
                          onClick={() => handleCancel(booking._id)}
                          className="btn btn-error btn-sm flex items-center gap-2"
                        >
                          <FaTrash /> Cancel
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Mobile Responsive Cards */}
        <div className="lg:hidden grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          {filteredBookings.map((booking) => (
            <div key={booking._id} className="card bg-base-100 shadow-xl">
              <div className="card-body">
                {/* Top Row (service + status) */}
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="w-16 h-16 rounded-lg">
                        <img src={booking.service.image} />
                      </div>
                    </div>
                    <div>
                      <h2 className="font-bold text-lg">
                        {booking.service.name}
                      </h2>
                      <div className="badge badge-neutral mt-1">
                        {booking.service.caterory}
                      </div>
                    </div>
                  </div>

                  <div
                    className={`badge badge-lg ${getStatusColor(
                      booking.service.status
                    )}`}
                  >
                    {booking.service.status}
                  </div>
                </div>

                {/* Price */}
                <div className="flex items-center gap-2 mt-3 text-lg font-bold">
                  <FaMoneyBill /> BDT {booking.service.price}
                </div>

                <div className="divider"></div>

                {/* Provider */}
                <div className="flex items-center gap-3">
                  <img
                    className="w-12 h-12 rounded-full"
                    src={booking.provider.photo}
                  />
                  <div>
                    <p className="font-semibold">{booking.provider.name}</p>
                    <p className="text-sm text-gray-500">
                      {booking.provider.email}
                    </p>
                  </div>
                </div>

                {/* Booking Details */}
                <div className="mt-4 space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm">Booked By</span>
                    <span className="font-medium">{booking.user.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Time</span>
                    <span>{booking.service.bookTime}</span>
                  </div>
                </div>

                {/* Cancel Button */}
                <button
                  onClick={() => handleCancel(booking._id)}
                  className="btn btn-error mt-4"
                >
                  <FaTrash /> Cancel Booking
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ManageBookings;
