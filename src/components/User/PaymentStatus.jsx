import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../providers/AuthContext";
import LoadingSpinner from "../Shared/LoadingSpinner";

const PaymentStatus = () => {
  const { user } = useContext(AuthContext);
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const email = user?.email;
  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    if (email) {
      fetchBookings();
    }
  }, [email]);
  // console.log(email);

  const fetchBookings = async () => {
    try {
      const response = await axios.get(`${API_URL}/my-payments/${email}`);
      setPayments(response.data);
    } catch (error) {
      console.error("Error fetching bookings:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <LoadingSpinner></LoadingSpinner>;
  }

  if (payments.length === 0) {
    return (
      <div className="min-h-[400px] flex flex-col justify-center items-center p-4">
        <div className="text-center">
          <div className="w-24 h-24 mx-auto mb-6 text-gray-400">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
              />
            </svg>
          </div>
          <h2 className="text-2xl font-semibold text-gray-700 mb-2">
            No Payments Found
          </h2>
          <p className="text-gray-500">You haven't made any payments yet.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-6">
      <div className="mb-6 md:mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
          Payment History
        </h1>
        <p className="text-gray-600 mt-2">
          Total {payments.length} payment{payments.length > 1 ? "s" : ""} found
        </p>
      </div>

      <div className="overflow-x-auto bg-white rounded-xl shadow-lg border border-gray-200">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gradient-to-r from-blue-50 to-indigo-50">
            <tr>
              <th
                scope="col"
                className="px-4 py-4 md:px-6 md:py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider"
              >
                Service
              </th>
              <th
                scope="col"
                className="px-4 py-4 md:px-6 md:py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider"
              >
                Provider
              </th>
              <th
                scope="col"
                className="px-4 py-4 md:px-6 md:py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider"
              >
                Decorator
              </th>
              <th
                scope="col"
                className="px-4 py-4 md:px-6 md:py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider"
              >
                Status
              </th>
              <th
                scope="col"
                className="px-4 py-4 md:px-6 md:py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider"
              >
                Price
              </th>
              <th
                scope="col"
                className="px-4 py-4 md:px-6 md:py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider"
              >
                Details
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {payments.map((payment) => (
              <tr
                key={payment._id}
                className="hover:bg-gray-50 transition-colors duration-150"
              >
                {/* Service Column */}
                <td className="px-4 py-4 md:px-6 md:py-5">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-12 w-12 md:h-16 md:w-16">
                      <img
                        className="h-12 w-12 md:h-16 md:w-16 rounded-lg object-cover border border-gray-200"
                        src={payment.image}
                        alt={payment.serviceName}
                      />
                    </div>
                    <div className="ml-3 md:ml-4">
                      <div className="text-sm font-medium text-gray-900">
                        {payment.serviceName}
                      </div>
                      <div className="text-xs text-gray-500 capitalize">
                        {payment.category.replace("-", " ")}
                      </div>
                      <div className="text-xs text-gray-500 mt-1">
                        {payment.quantity} {payment.unit}
                      </div>
                    </div>
                  </div>
                </td>

                {/* Provider Column */}
                <td className="px-4 py-4 md:px-6 md:py-5">
                  <div className="text-sm text-gray-900">
                    {payment.providerName}
                  </div>
                  <div className="text-xs text-gray-500">
                    {payment.providerEmail}
                  </div>
                </td>

                {/* Decorator Column */}
                <td className="px-4 py-4 md:px-6 md:py-5">
                  {payment.decoretorName && payment.decoretorEmail ? (
                    <>
                      <div className="text-sm text-gray-900">
                        {payment.decoretorName}
                      </div>
                      <div className="text-xs text-gray-500">
                        {payment.decoretorEmail}
                      </div>
                    </>
                  ) : (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                      Decorator not assigned
                    </span>
                  )}
                </td>

                {/* Status Column */}
                <td className="px-4 py-4 md:px-6 md:py-5">
                  <span
                    className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                      payment.status === "paid"
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {payment.status === "paid" ? (
                      <>
                        <svg
                          className="w-3 h-3 mr-1"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                        Paid
                      </>
                    ) : (
                      <>
                        <svg
                          className="w-3 h-3 mr-1"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                            clipRule="evenodd"
                          />
                        </svg>
                        {payment.status}
                      </>
                    )}
                  </span>
                </td>

                {/* Price Column */}
                <td className="px-4 py-4 md:px-6 md:py-5">
                  <div className="text-sm font-semibold text-gray-900">
                    BDT{payment.price}
                  </div>
                </td>

                {/* Details Column */}
                <td className="px-4 py-4 md:px-6 md:py-5">
                  <div className="text-xs text-gray-500 space-y-1">
                    <div className="flex items-center">
                      <svg
                        className="w-3 h-3 mr-1 text-gray-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>
                      {payment.location}
                    </div>
                    <div className="flex items-center">
                      <svg
                        className="w-3 h-3 mr-1 text-gray-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2"
                        />
                      </svg>
                      {payment.customer}
                    </div>
                    <div className="text-xs font-mono text-gray-400 truncate max-w-[120px] md:max-w-[150px]">
                      ID: {payment.transactionId}
                    </div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-6 md:hidden">
        <div className="space-y-4">
          {payments.map((payment) => (
            <div
              key={payment._id}
              className="bg-white rounded-xl shadow-md border border-gray-200 p-4"
            >
              <div className="flex justify-between items-start mb-3">
                <div className="flex items-center">
                  <img
                    className="h-12 w-12 rounded-lg object-cover border border-gray-200"
                    src={payment.image}
                    alt={payment.serviceName}
                  />
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-gray-900">
                      {payment.serviceName}
                    </h3>
                    <p className="text-xs text-gray-500 capitalize">
                      {payment.category.replace("-", " ")}
                    </p>
                  </div>
                </div>
                <span
                  className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                    payment.status === "paid"
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {payment.status}
                </span>
              </div>

              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Provider:</span>
                  <span className="text-gray-900">{payment.providerName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Decorator:</span>
                  <span className="text-gray-900">
                    {payment.decoretorName || (
                      <span className="text-yellow-600">Not assigned</span>
                    )}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Price:</span>
                  <span className="font-semibold text-gray-900">
                    BDT{payment.price}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Location:</span>
                  <span className="text-gray-900">{payment.location}</span>
                </div>
              </div>

              <div className="mt-3 pt-3 border-t border-gray-100">
                <div className="text-xs text-gray-400 truncate">
                  Transaction: {payment.transactionId.substring(0, 20)}...
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PaymentStatus;
