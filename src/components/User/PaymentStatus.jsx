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
    if (email) fetchBookings();
  }, [email]);

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

  // 获取状态对应的样式
  const getStatusBadgeClass = (status) => {
    switch (status?.toLowerCase()) {
      case 'completed': return 'badge-success';
      case 'processing': return 'badge-info';
      case 'pending': return 'badge-warning';
      default: return 'badge-ghost';
    }
  };

  if (loading) return <LoadingSpinner />;

  if (payments.length === 0) {
    return (
      <div className="min-h-[400px] flex flex-col justify-center items-center p-4">
        <div className="text-center">
          <div className="w-24 h-24 mx-auto mb-6 text-gray-400">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
            </svg>
          </div>
          <h2 className="text-2xl font-semibold text-gray-700 mb-2">No Payments Found</h2>
          <p className="text-gray-500">You haven't made any payments yet.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-6">
      <div className="mb-6 md:mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Payment History</h1>
        <p className="text-gray-600 mt-2">Total {payments.length} payment{payments.length > 1 ? "s" : ""} found</p>
      </div>

      {/* 桌面视图表格 */}
      <div className="hidden md:block overflow-x-auto bg-white rounded-xl shadow-lg border border-gray-200">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gradient-to-r from-blue-50 to-indigo-50">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase">Service</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase">Provider</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase">Decorator</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase">Payment Status</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase">Work Status</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase">Delivery Date</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase">Price</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {payments.map((payment) => (
              <tr key={payment._id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-5">
                  <div className="flex items-center">
                    <img className="h-16 w-16 rounded-lg object-cover border" src={payment.image} alt={payment.serviceName} />
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">{payment.serviceName}</div>
                      <div className="text-xs text-gray-500 capitalize">{payment.category?.replace("-", " ")}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-5">
                  <div className="text-sm text-gray-900">{payment.providerName}</div>
                  <div className="text-xs text-gray-500">{payment.providerEmail}</div>
                </td>
                <td className="px-6 py-5">
                  {payment.decoretorName ? (
                    <>
                      <div className="text-sm text-gray-900">{payment.decoretorName}</div>
                      <div className="text-xs text-gray-500">{payment.decoretorEmail}</div>
                    </>
                  ) : (
                    <span className="badge badge-warning badge-sm">Not assigned</span>
                  )}
                </td>
                <td className="px-6 py-5">
                  <span className={`badge ${payment.status === "paid" ? "badge-success" : "badge-error"}`}>
                    {payment.status === "paid" ? "Paid" : payment.status}
                  </span>
                </td>
                {/* 新增：工作状态列 */}
                <td className="px-6 py-5">
                  <span className={`badge ${getStatusBadgeClass(payment.workStatus)}`}>
                    {payment.workStatus || "Pending"}
                  </span>
                </td>
                {/* 新增：交付时间列 */}
                <td className="px-6 py-5">
                  <div className="text-sm text-gray-900">
                    {payment.deliveryTime ? new Date(payment.deliveryTime).toLocaleDateString() : "Not set"}
                  </div>
                </td>
                <td className="px-6 py-5">
                  <div className="text-lg font-semibold text-gray-900">BDT {payment.price}</div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* 移动视图卡片 */}
      <div className="md:hidden space-y-4">
        {payments.map((payment) => (
          <div key={payment._id} className="bg-white rounded-xl shadow-md border p-4">
            <div className="flex justify-between items-start mb-3">
              <div className="flex items-center">
                <img className="h-12 w-12 rounded-lg object-cover border" src={payment.image} alt={payment.serviceName} />
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-gray-900">{payment.serviceName}</h3>
                  <p className="text-xs text-gray-500 capitalize">{payment.category?.replace("-", " ")}</p>
                </div>
              </div>
              <div className="flex flex-col items-end gap-1">
                <span className={`badge badge-sm ${payment.status === "paid" ? "badge-success" : "badge-error"}`}>
                  {payment.status}
                </span>
                <span className={`badge badge-sm ${getStatusBadgeClass(payment.workStatus)}`}>
                  {payment.workStatus || "Pending"}
                </span>
              </div>
            </div>

            <div className="space-y-2 text-sm">
              <div className="flex justify-between"><span className="text-gray-600">Provider:</span><span>{payment.providerName}</span></div>
              <div className="flex justify-between"><span className="text-gray-600">Decorator:</span><span>{payment.decoretorName || "Not assigned"}</span></div>
              <div className="flex justify-between"><span className="text-gray-600">Delivery:</span><span>{payment.deliveryTime ? new Date(payment.deliveryTime).toLocaleDateString() : "Not set"}</span></div>
              <div className="flex justify-between"><span className="text-gray-600">Price:</span><span className="font-semibold">BDT {payment.price}</span></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PaymentStatus;