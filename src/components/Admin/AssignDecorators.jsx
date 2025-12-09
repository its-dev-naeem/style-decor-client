import React, { useState } from "react";

export default function AssignDecoratorPage() {
  const services = [
    {
      id: "SRV-101",
      customer: "John Carter",
      serviceName: "Wedding Stage Decoration",
      date: "2025-12-20",
      time: "5:00 PM",
      amount: "$350",
      paid: true,
      image:
        "https://images.pexels.com/photos/169190/pexels-photo-169190.jpeg",
    },
    {
      id: "SRV-102",
      customer: "Emma Watson",
      serviceName: "Birthday Balloon Setup",
      date: "2025-12-22",
      time: "2:00 PM",
      amount: "$120",
      paid: true,
      image:
        "https://images.pexels.com/photos/587741/pexels-photo-587741.jpeg",
    },
    {
      id: "SRV-103",
      customer: "Jacob Miller",
      serviceName: "Corporate Event Decoration",
      date: "2025-12-25",
      time: "10:00 AM",
      amount: "$500",
      paid: true,
      image:
        "https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg",
    },
  ];

  const decorators = [
    { id: 1, name: "Michael Brown" },
    { id: 2, name: "Sophia Taylor" },
    { id: 3, name: "David Anderson" },
  ];

  const [assigned, setAssigned] = useState({});

  function handleAssign(serviceId, decoratorId) {
    const decorator = decorators.find((d) => d.id === Number(decoratorId));
    setAssigned((prev) => ({ ...prev, [serviceId]: decorator }));
  }

  return (
    <div className="w-full min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold mb-6 text-center">Paid Service List — Assign Decorator</h1>

      <div className="bg-white shadow-lg rounded-xl overflow-hidden w-full p-6">
        <table className="w-full border-collapse text-left">
          <thead>
            <tr className="bg-gray-200 text-sm text-gray-700">
              <th className="p-3 border">Image</th>
              <th className="p-3 border">Service Info</th>
              <th className="p-3 border">Customer</th>
              <th className="p-3 border">Payment</th>
              <th className="p-3 border">Assign Decorator</th>
            </tr>
          </thead>

          <tbody>
            {services.map((srv) => (
              <tr key={srv.id} className="border text-sm">
                <td className="p-3 border">
                  <img
                    src={srv.image}
                    alt={srv.serviceName}
                    className="w-24 h-16 object-cover rounded"
                  />
                </td>

                <td className="p-3 border">
                  <p className="font-semibold">{srv.serviceName}</p>
                  <p>Date: {srv.date}</p>
                  <p>Time: {srv.time}</p>
                  <p className="font-medium text-gray-600">Amount: {srv.amount}</p>
                </td>

                <td className="p-3 border font-medium">{srv.customer}</td>

                <td className="p-3 border">
                  {srv.paid ? (
                    <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-semibold">
                      Paid
                    </span>
                  ) : (
                    <span className="px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-xs font-semibold">
                      Pending
                    </span>
                  )}
                </td>

                <td className="p-3 border w-48">
                  {srv.paid ? (
                    <div>
                      <select
                        className="w-full p-2 border rounded"
                        onChange={(e) => handleAssign(srv.id, e.target.value)}
                        defaultValue=""
                      >
                        <option value="" disabled>
                          Select decorator
                        </option>
                        {decorators.map((d) => (
                          <option key={d.id} value={d.id}>
                            {d.name}
                          </option>
                        ))}
                      </select>

                      {assigned[srv.id] && (
                        <p className="mt-2 text-sm text-blue-600 font-medium">
                          Assigned: {assigned[srv.id].name}
                        </p>
                      )}
                    </div>
                  ) : (
                    <p className="text-red-500 text-sm font-medium">
                      Payment required
                    </p>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
