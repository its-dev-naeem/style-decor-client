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
import { useForm } from "react-hook-form";
import { Link } from "react-router";

const UserBookedData = () => {
  const { user } = useContext(AuthContext);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showPayModal, setShowPayModal] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);

  const { register, watch } = useForm({});
  const quantity = watch("quantity", 1);
  const location = watch("location", "Dhaka");

  //   console.log(quantity);
  const uid = user?.uid;

  useEffect(() => {
    if (uid) {
      fetchBookings();
    }
  }, [uid]);

  const fetchBookings = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/booking-data/${uid}`
      );
      setBookings(response.data);
    } catch (error) {
      console.error("Error fetching bookings:", error);
    } finally {
      setLoading(false);
    }
  };

  const handlePay = (booking) => {
    setSelectedBooking(booking);
    setShowPayModal(true);
  };

  const handleCancel = async (bookingId) => {
    alert("delete successfull..!");
    fetchBookings();

    try {
      await axios.delete(`http://localhost:3000/booking-data/${bookingId}`);
    } catch (error) {
      console.error("Error canceling booking:", error);
    }
  };

  const handlePaymentSubmit = async () => {
    if (!selectedBooking) return;
    const totalPrice = parseFloat(quantity * selectedBooking.service.price);
    // console.log(totalPrice);
    const payInfo = { ...selectedBooking, totalPrice, location, };
    console.log(payInfo);
    setShowPayModal(false);
    try {
      const result = await axios.post(
        `http://localhost:3000/create-checkout-session`,
        payInfo
      );
      const redirectUrl = result.data.url;
      window.location.href = redirectUrl;
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
                            <FaMoneyBill />
                            BDT {booking.service.price}/{booking.service.unit}
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
                          <>
                            <button
                              onClick={() => handlePay(booking)}
                              className="btn btn-sm btn-primary flex items-center gap-2"
                            >
                              <FaCreditCard /> Pay
                            </button>
                            <button
                              onClick={() => handleCancel(booking._id)}
                              className="btn btn-sm btn-outline btn-error flex items-center gap-2"
                            >
                              <FaTimes /> Cancel
                            </button>
                          </>
                        )}
                        {
                          booking.service.status === "Paid" && (
                            <Link to='/dashboard/payments' className="btn btn-sm btn-accent  flex justify-center shadow-xl items-center">
                            Browse Payments
                            </Link>
                          )
                        }
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
                      BDT {booking.service.price}/{booking.service.unit}
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
          <div className="fixed inset-0 bg-black/50 bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-xl shadow-2xl max-w-md w-full">
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-2xl font-bold">Payment info</h3>
                  <button
                    onClick={() => setShowPayModal(false)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <FaTimes size={24} />
                  </button>
                </div>

                <div className="space-y-4 mb-6">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Service Name:</span>
                    <span className="font-semibold">
                      {selectedBooking.service.name}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Provider Name:</span>
                    <span className="font-semibold">
                      {selectedBooking.provider.name}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Provider email:</span>
                    <span className="font-semibold">
                      {selectedBooking.provider.email}
                    </span>
                  </div>
                  <hr />
                  <div className="flex justify-between">
                    <span className="text-gray-600">User Name:</span>
                    <span className="font-semibold">{user.displayName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">User email:</span>
                    <span className="font-semibold">{user?.email}</span>
                  </div>
                  <div className="flex justify-between text-lg">
                    <span className="font-bold">Price:</span>
                    <span className="font-bold text-green-600">
                      BDT {selectedBooking.service.price}/
                      {selectedBooking.service.unit}
                    </span>
                  </div>
                </div>

                <div className="space-y-3">
                  <form className="flex flex-col gap-3">
                    <div className="flex">
                      <label
                        className="flex-1 font-bold text-lg"
                        htmlFor="quantity"
                      >
                        Get total Unit:
                      </label>
                      <input
                        id="quantity"
                        type="number"
                        defaultValue={1}
                        placeholder="total Unit"
                        className="input flex-1"
                        {...register("quantity", { min: 1 })}
                      />
                    </div>
                    <div>
                      <label
                        className="flex-1 font-bold text-lg"
                        htmlFor="location"
                      >
                        On site Location :
                      </label>
                      <input
                        id="location"
                        type="text"
                        defaultValue="Dhaka"
                        placeholder="Service location"
                        className="input  w-full"
                        {...register("location", {})}
                      />
                    </div>
                  </form>
                  <hr />
                  <div className="flex justify-between text-lg">
                    <span className="font-bold">Total Price:</span>
                    <span className="font-bold text-green-600">
                      {parseFloat(quantity) * selectedBooking?.service?.price}{" "}
                      BDT
                    </span>
                  </div>
                  <span className="font-bold text-xl text-green-600 text-wrap line-clamp-1">
                    {location}
                  </span>
                </div>

                <div className="mt-8 flex gap-3">
                  <button
                    onClick={() => setShowPayModal(false)}
                    className="btn btn-outline flex-1 "
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handlePaymentSubmit}
                    className="btn btn-primary flex-1 flex items-center justify-center gap-2"
                  >
                    <FaCreditCard /> Pay BDT {selectedBooking.service.price}/
                    {selectedBooking.service.unit}
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
