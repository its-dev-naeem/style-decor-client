import React, { useState, useEffect } from "react";
import axios from "axios";
import LoadingSpinner from "../Shared/LoadingSpinner";
import toast from "react-hot-toast";
const API_URL = import.meta.env.VITE_API_URL;

export default function AssignDecoratorPage() {
  const [services, setServices] = useState([]);
  const [decorators, setDecorators] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [assigned, setAssigned] = useState({});
  const [updateSuccess, setUpdateSuccess] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const paymentsResponse = await axios.get(`${API_URL}/payments`);
        setServices(paymentsResponse.data);

        const response = await axios.get(`${API_URL}/decorators`);
        const apiDecorators = response.data;
        const decorators = apiDecorators.map((item, index) => ({
          id: index + 1,
          name: item.name,
          email: item.email,
        }));
        setDecorators(decorators);

        const initialAssigned = {};
        paymentsResponse.data.forEach((payment) => {
          if (payment.decoretorName && payment.decoretorEmail) {
            initialAssigned[payment._id] = {
              name: payment.decoretorName,
              email: payment.decoretorEmail,
            };
          }
        });
        setAssigned(initialAssigned);
      } catch (err) {
        toast.error("Error fetching data:");
        setError("Failed to load data. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleAssign = async (serviceId, decoratorId) => {
    if (!decoratorId) return;

    const decorator = decorators.find((d) => d.id === Number(decoratorId));
    if (!decorator) return;

    try {
      const updateData = {
        decoretorName: decorator.name,
        decoretorEmail: decorator.email,
      };
      await axios.patch(`${API_URL}/add-decorator/${serviceId}`, updateData);
      setAssigned((prev) => ({
        ...prev,
        [serviceId]: { name: decorator.name, email: decorator.email },
      }));

      setUpdateSuccess((prev) => ({ ...prev, [serviceId]: true }));
      setTimeout(() => {
        setUpdateSuccess((prev) => ({ ...prev, [serviceId]: false }));
      }, 3000);
    } catch (err) {
      toast.error("Failed to assign decorator. Please try again.");
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  if (loading) {
    return <LoadingSpinner></LoadingSpinner>;
  }

  if (error) {
    return (
      <div className="w-full min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center p-8 bg-white rounded-xl shadow-lg">
          <div className="text-red-500 text-5xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Error Loading Data
          </h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
            Payment Management Dashboard
          </h1>
          <p className="text-gray-600">
            Assign decorators to paid services ({services.length} total
            payments)
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <div className="flex items-center">
              <div className="p-3 bg-blue-100 rounded-lg mr-4">
                <svg
                  className="w-6 h-6 text-blue-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <div>
                <p className="text-sm text-gray-500">Total Payments</p>
                <p className="text-2xl font-bold text-gray-800">
                  {services.length}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <div className="flex items-center">
              <div className="p-3 bg-green-100 rounded-lg mr-4">
                <svg
                  className="w-6 h-6 text-green-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <div>
                <p className="text-sm text-gray-500">Paid Services</p>
                <p className="text-2xl font-bold text-gray-800">
                  {services.filter((s) => s.status === "paid").length}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <div className="flex items-center">
              <div className="p-3 bg-purple-100 rounded-lg mr-4">
                <svg
                  className="w-6 h-6 text-purple-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
              </div>
              <div>
                <p className="text-sm text-gray-500">Available Decorators</p>
                <p className="text-2xl font-bold text-gray-800">
                  {decorators.length}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Main Table */}
        <div className="bg-white shadow-xl rounded-2xl overflow-hidden border border-gray-200">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gradient-to-r from-gray-50 to-blue-50">
                <tr className="text-left text-gray-700">
                  <th className="p-4 font-semibold text-sm uppercase">
                    Service Details
                  </th>
                  <th className="p-4 font-semibold text-sm uppercase">
                    Customer Info
                  </th>
                  <th className="p-4 font-semibold text-sm uppercase">
                    Payment Status
                  </th>
                  <th className="p-4 font-semibold text-sm uppercase">
                    Assign Decorator
                  </th>
                  <th className="p-4 font-semibold text-sm uppercase">
                    Current Assignment
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-100">
                {services.map((service) => (
                  <tr
                    key={service._id}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    {/* Service Details */}
                    <td className="p-4">
                      <div className="flex items-center space-x-4">
                        <div className="flex-shrink-0">
                          <img
                            src={service.image}
                            alt={service.serviceName}
                            className="w-20 h-20 md:w-24 md:h-24 object-cover rounded-lg border border-gray-200"
                          />
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-800">
                            {service.serviceName}
                          </h3>
                          <p className="text-sm text-gray-500 capitalize mt-1">
                            {service.category?.replace("-", " ")}
                          </p>
                          <div className="mt-2 space-y-1 text-sm">
                            <p className="text-gray-600">
                              <span className="font-medium">Quantity:</span>{" "}
                              {service.quantity} {service.unit}
                            </p>
                            <p className="text-gray-600">
                              <span className="font-medium">Provider:</span>{" "}
                              {service.providerName}
                            </p>
                            <p className="text-gray-600">
                              <span className="font-medium">Date:</span>{" "}
                              {formatDate(service.date)}
                            </p>
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* Customer Info */}
                    <td className="p-4">
                      <div>
                        <p className="font-medium text-gray-800">
                          {service.customer}
                        </p>
                        <p className="text-sm text-gray-500 mt-1">
                          {service.userEmail}
                        </p>
                        <div className="mt-3 p-2 bg-gray-50 rounded-lg">
                          <p className="text-xs text-gray-600">
                            <span className="font-medium">Location:</span>{" "}
                            {service.location}
                          </p>
                          {service.phone && (
                            <p className="text-xs text-gray-600 mt-1">
                              <span className="font-medium">Phone:</span>{" "}
                              {service.phone}
                            </p>
                          )}
                        </div>
                      </div>
                    </td>

                    {/* Payment Status */}
                    <td className="p-4">
                      <div className="flex flex-col space-y-3">
                        <div>
                          <span
                            className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                              service.status === "paid"
                                ? "bg-green-100 text-green-800"
                                : "bg-red-100 text-red-800"
                            }`}
                          >
                            {service.status === "paid"
                              ? "✅ Paid"
                              : "❌ Pending"}
                          </span>
                        </div>
                        <div className="text-sm">
                          <p className="font-semibold text-gray-800">
                            BDT {service.price}
                          </p>
                          <p className="text-xs text-gray-500 mt-1">
                            Transaction:{" "}
                            {service.transactionId?.substring(0, 10)}...
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* Assign Decorator */}
                    <td className="p-4">
                      {service.status === "paid" ? (
                        <div className="space-y-3">
                          <select
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            onChange={(e) =>
                              handleAssign(service._id, e.target.value)
                            }
                            defaultValue=""
                          >
                            <option value="" disabled>
                              Select a decorator
                            </option>
                            {decorators.map((decorator) => (
                              <option key={decorator.id} value={decorator.id}>
                                {decorator.name} ({decorator.email})
                              </option>
                            ))}
                          </select>

                          {updateSuccess[service._id] && (
                            <div className="animate-pulse bg-green-50 text-green-700 text-xs p-2 rounded-lg border border-green-200">
                              ✅ Decorator assigned successfully!
                            </div>
                          )}
                        </div>
                      ) : (
                        <div className="p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                          <p className="text-yellow-700 text-sm font-medium text-center">
                            ⚠️ Payment required
                          </p>
                          <p className="text-yellow-600 text-xs mt-1 text-center">
                            Assign after payment
                          </p>
                        </div>
                      )}
                    </td>

                    {/* Current Assignment */}
                    <td className="p-4">
                      {assigned[service._id] ? (
                        <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                          <p className="font-medium text-blue-800">
                            {assigned[service._id].name}
                          </p>
                          <p className="text-xs text-blue-600 mt-1">
                            {assigned[service._id].email}
                          </p>
                          <div className="mt-2 flex items-center text-xs text-green-600">
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
                            Assigned
                          </div>
                        </div>
                      ) : (
                        <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                          <p className="text-gray-500 text-sm font-medium">
                            No decorator assigned
                          </p>
                          <p className="text-gray-400 text-xs mt-1">
                            Please select one from dropdown
                          </p>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Empty State */}
          {services.length === 0 && !loading && (
            <div className="text-center py-12">
              <div className="text-gray-400 text-5xl mb-4">📋</div>
              <h3 className="text-xl font-semibold text-gray-600 mb-2">
                No payments found
              </h3>
              <p className="text-gray-500">
                There are no payments to display at the moment.
              </p>
            </div>
          )}
        </div>

        {/* Instructions */}
        <div className="mt-6 bg-blue-50 border border-blue-200 rounded-xl p-4">
          <h3 className="font-semibold text-blue-800 mb-2 flex items-center">
            <svg
              className="w-5 h-5 mr-2"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                clipRule="evenodd"
              />
            </svg>
            Admin Instructions
          </h3>
          <ul className="text-sm text-blue-700 space-y-1">
            <li>• Only paid services can be assigned decorators</li>
            <li>• Select a decorator from the dropdown to assign</li>
            <li>• Assignment updates are saved automatically</li>
            <li>• You can change assignment anytime</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
