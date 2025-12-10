import axios from "axios";
import { useContext, useEffect, useState } from "react";

import {
  FaCalendarAlt,
  FaUser,
  FaMoneyBill,
  FaCreditCard,
  FaTimes,
} from "react-icons/fa";
import { MdEmail, MdCategory } from "react-icons/md";
import { AuthContext } from "../../providers/AuthContext";

const UserBookedData = () => {
  const { user } = useContext(AuthContext);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showPayModal, setShowPayModal] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);
console.log(user);
  const uid = user?.uid;
    console.log(uid);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/booking-data/${uid}`
        );
        setBookings(response.data);
      } catch (error) {
        console.error("Error fetching bookings:", error);
      } finally {
        setLoading(false);
      }
    };

    if (uid) {
      fetchBookings();
    }
  }, [uid]);

  const handlePay = (booking) => {
    setSelectedBooking(booking);
    setShowPayModal(true);
  };

  const handleCancel = async (bookingId) => {
    if (window.confirm("Are you sure you want to cancel this booking?")) {
      try {
        // await axios.delete(`http://localhost:3000/booking-data/${bookingId}`);
        // fetchBookings(); // Refresh data
      } catch (error) {
        console.error("Error canceling booking:", error);
      }
    }
  };

  const handlePaymentSubmit = async () => {
    if (!selectedBooking) return;

    try {
      await axios.patch(
        // `http://localhost:3000/booking-data/${selectedBooking._id}`,
        {
          status: "Paid",
        }
      );
      setShowPayModal(false);
      //   fetchBookings(); // Refresh data
    } catch (error) {
      console.error("Payment error:", error);
    }
  };

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

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 p-4 md:p-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">My Bookings</h1>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="card bg-white shadow rounded-lg p-6">
                <div className="space-y-4">
                  <div className="h-6 bg-gray-200 rounded w-3/4 animate-pulse"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2 animate-pulse"></div>
                  <div className="h-4 bg-gray-200 rounded w-2/3 animate-pulse"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800">My Bookings</h1>
          <p className="text-gray-600 mt-2">
            Total {bookings.length} booking{bookings.length !== 1 ? "s" : ""}
          </p>
        </div>

        {/* Desktop Table */}
        <div className="hidden lg:block">
          <div className="bg-white shadow-lg rounded-xl overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-100">
                <tr>
                  <th className="p-4 text-left font-semibold">Service</th>
                  <th className="p-4 text-left font-semibold">Provider</th>
                  <th className="p-4 text-left font-semibold">
                    Booking Details
                  </th>
                  <th className="p-4 text-left font-semibold">Status</th>
                  <th className="p-4 text-left font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {bookings.map((booking) => (
                  <tr key={booking._id} className="border-t hover:bg-gray-50">
                    <td className="p-4">
                      <div className="flex items-center gap-4">
                        <img
                          src={booking.service.image}
                          alt={booking.service.name}
                          className="w-16 h-16 object-cover rounded-lg"
                        />
                        <div>
                          <h3 className="font-bold">{booking.service.name}</h3>
                          <div className="flex items-center gap-2 text-sm text-gray-500 mt-1">
                            <MdCategory />
                            {booking.service.caterory}
                          </div>
                          <div className="flex items-center gap-2 text-sm text-gray-500 mt-1">
                            <FaMoneyBill />${booking.service.price}
                          </div>
                        </div>
                      </div>
                    </td>

                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={booking.provider.photo}
                          alt={booking.provider.name}
                          className="w-12 h-12 rounded-full object-cover"
                        />
                        <div>
                          <h4 className="font-semibold">
                            {booking.provider.name}
                          </h4>
                          <div className="text-sm text-gray-500">
                            {booking.provider.email}
                          </div>
                        </div>
                      </div>
                    </td>

                    <td className="p-4">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <FaCalendarAlt className="text-gray-400" />
                          <span className="text-sm">
                            {booking.service.bookTime}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <FaUser className="text-gray-400" />
                          <span className="text-sm">You</span>
                        </div>
                      </div>
                    </td>

                    <td className="p-4">
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
                          booking.service.status
                        )}`}
                      >
                        {booking.service.status}
                      </span>
                    </td>

                    <td className="p-4">
                      <div className="flex gap-2">
                        {booking.service.status === "Unpaid" && (
                          <button
                            onClick={() => handlePay(booking)}
                            className="btn btn-sm btn-primary flex items-center gap-2"
                          >
                            <FaCreditCard /> Pay
                          </button>
                        )}
                        <button
                          onClick={() => handleCancel(booking._id)}
                          className="btn btn-sm btn-outline btn-error flex items-center gap-2"
                        >
                          <FaTimes /> Cancel
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Mobile Cards */}
        <div className="lg:hidden">
          <div className="grid grid-cols-1 gap-6">
            {bookings.map((booking) => (
              <div
                key={booking._id}
                className="bg-white shadow-lg rounded-xl p-6"
              >
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center gap-4">
                    <img
                      src={booking.service.image}
                      alt={booking.service.name}
                      className="w-20 h-20 object-cover rounded-lg"
                    />
                    <div>
                      <h3 className="font-bold text-lg">
                        {booking.service.name}
                      </h3>
                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        <MdCategory /> {booking.service.caterory}
                      </div>
                    </div>
                  </div>
                  <span
                    className={`px-3 py-1 rounded-full text-sm ${getStatusColor(
                      booking.service.status
                    )}`}
                  >
                    {booking.service.status}
                  </span>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <FaMoneyBill className="text-gray-400" />
                      <span>Price:</span>
                    </div>
                    <span className="font-bold text-lg">
                      ${booking.service.price}
                    </span>
                  </div>

                  <div className="flex items-center gap-3 bg-gray-50 p-3 rounded-lg">
                    <img
                      src={booking.provider.photo}
                      alt={booking.provider.name}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <div>
                      <h4 className="font-semibold">{booking.provider.name}</h4>
                      <div className="text-sm text-gray-500">
                        {booking.provider.email}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-gray-600">
                    <FaCalendarAlt />
                    <span className="text-sm">{booking.service.bookTime}</span>
                  </div>

                  <div className="flex gap-3 mt-4">
                    {booking.service.status === "Unpaid" && (
                      <button
                        onClick={() => handlePay(booking)}
                        className="btn btn-primary flex-1 flex items-center justify-center gap-2"
                      >
                        <FaCreditCard /> Pay Now
                      </button>
                    )}
                    <button
                      onClick={() => handleCancel(booking._id)}
                      className="btn btn-outline btn-error flex-1 flex items-center justify-center gap-2"
                    >
                      <FaTimes /> Cancel
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Empty State */}
        {bookings.length === 0 && !loading && (
          <div className="bg-white shadow-lg rounded-xl p-12 text-center">
            <FaCalendarAlt className="text-6xl text-gray-300 mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-2">No Bookings Yet</h2>
            <p className="text-gray-600 mb-6">
              You haven't booked any services
            </p>
            <button className="btn btn-primary">Browse Services</button>
          </div>
        )}

        {/* Payment Modal */}
        {showPayModal && selectedBooking && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-xl shadow-2xl max-w-md w-full">
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-2xl font-bold">Complete Payment</h3>
                  <button
                    onClick={() => setShowPayModal(false)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <FaTimes size={24} />
                  </button>
                </div>

                <div className="space-y-4 mb-6">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Service:</span>
                    <span className="font-semibold">
                      {selectedBooking.service.name}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Provider:</span>
                    <span className="font-semibold">
                      {selectedBooking.provider.name}
                    </span>
                  </div>
                  <div className="flex justify-between text-lg">
                    <span className="font-bold">Total Amount:</span>
                    <span className="font-bold text-green-600">
                      ${selectedBooking.service.price}
                    </span>
                  </div>
                </div>

                <div className="space-y-3">
                  <input
                    type="text"
                    placeholder="Card Number"
                    className="input input-bordered w-full"
                  />
                  <div className="flex gap-3">
                    <input
                      type="text"
                      placeholder="MM/YY"
                      className="input input-bordered flex-1"
                    />
                    <input
                      type="text"
                      placeholder="CVV"
                      className="input input-bordered flex-1"
                    />
                  </div>
                  <input
                    type="text"
                    placeholder="Card Holder Name"
                    className="input input-bordered w-full"
                  />
                </div>

                <div className="mt-8 flex gap-3">
                  <button
                    onClick={() => setShowPayModal(false)}
                    className="btn btn-outline flex-1"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handlePaymentSubmit}
                    className="btn btn-primary flex-1 flex items-center justify-center gap-2"
                  >
                    <FaCreditCard /> Pay ${selectedBooking.service.price}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserBookedData;
