import React, { useState } from 'react';
import { FaEdit, FaCheck, FaTimes, FaFilter, FaSearch } from 'react-icons/fa';

const ManageBookings = () => {
  // Initial bookings data
  const initialBookings = [
    {
      id: 1,
      userName: 'John Doe',
      userEmail: 'john@example.com',
      providerName: 'Alex Johnson',
      providerEmail: 'alex@provider.com',
      service: 'Home Cleaning',
      category: 'Cleaning',
      status: 'pending',
      price: '$120',
      date: '2024-01-15',
      serviceImage: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=400'
    },
    {
      id: 2,
      userName: 'Sarah Smith',
      userEmail: 'sarah@example.com',
      providerName: 'Mike Wilson',
      providerEmail: 'mike@provider.com',
      service: 'Plumbing Repair',
      category: 'Repair',
      status: 'processing',
      price: '$200',
      date: '2024-01-14',
      serviceImage: 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w-400'
    },
    {
      id: 3,
      userName: 'Robert Brown',
      userEmail: 'robert@example.com',
      providerName: 'Emma Davis',
      providerEmail: 'emma@provider.com',
      service: 'Electrical Work',
      category: 'Electrical',
      status: 'completed',
      price: '$180',
      date: '2024-01-13',
      serviceImage: 'https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=400'
    },
    {
      id: 4,
      userName: 'Lisa Wang',
      userEmail: 'lisa@example.com',
      providerName: 'Tom Lee',
      providerEmail: 'tom@provider.com',
      service: 'Painting Service',
      category: 'Painting',
      status: 'pending',
      price: '$350',
      date: '2024-01-12',
      serviceImage: 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=400'
    },
    {
      id: 5,
      userName: 'David Kim',
      userEmail: 'david@example.com',
      providerName: 'Sophia Chen',
      providerEmail: 'sophia@provider.com',
      service: 'Carpet Cleaning',
      category: 'Cleaning',
      status: 'processing',
      price: '$90',
      date: '2024-01-11',
      serviceImage: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=400'
    }
  ];

  // State management
  const [bookings, setBookings] = useState(initialBookings);
  const [editingId, setEditingId] = useState(null);
  const [editStatus, setEditStatus] = useState('');
  const [search, setSearch] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');

  // Get unique categories
  const categories = ['all', ...new Set(initialBookings.map(b => b.category))];
  const statuses = ['all', 'pending', 'processing', 'completed'];

  // Filter bookings
  const filteredBookings = bookings.filter(booking => {
    const matchesSearch = 
      booking.userName.toLowerCase().includes(search.toLowerCase()) ||
      booking.userEmail.toLowerCase().includes(search.toLowerCase()) ||
      booking.service.toLowerCase().includes(search.toLowerCase());
    
    const matchesCategory = filterCategory === 'all' || booking.category === filterCategory;
    const matchesStatus = filterStatus === 'all' || booking.status === filterStatus;
    
    return matchesSearch && matchesCategory && matchesStatus;
  });

  // Handle status edit
  const startEdit = (id, currentStatus) => {
    setEditingId(id);
    setEditStatus(currentStatus);
  };

  const saveEdit = (id) => {
    setBookings(bookings.map(booking => 
      booking.id === id ? { ...booking, status: editStatus } : booking
    ));
    setEditingId(null);
  };

  const cancelEdit = () => {
    setEditingId(null);
  };

  // Get status color
  const getStatusColor = (status) => {
    switch(status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'processing': return 'bg-blue-100 text-blue-800';
      case 'completed': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Manage Bookings</h1>

      {/* Filters and Search */}
      <div className="bg-white p-4 rounded-lg shadow mb-6">
        <div className="flex flex-col md:flex-row gap-4 mb-4">
          {/* Search */}
          <div className="flex-1">
            <div className="relative">
              <FaSearch className="absolute left-3 top-3 text-gray-400" />
              <input
                type="text"
                placeholder="Search by name, email, or service..."
                className="w-full pl-10 pr-4 py-2 border rounded-lg"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>

          {/* Category Filter */}
          <div className="flex gap-4">
            <select
              className="border rounded-lg px-3 py-2"
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
            >
              {categories.map(cat => (
                <option key={cat} value={cat}>
                  {cat === 'all' ? 'All Categories' : cat}
                </option>
              ))}
            </select>

            {/* Status Filter */}
            <select
              className="border rounded-lg px-3 py-2"
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
            >
              {statuses.map(status => (
                <option key={status} value={status}>
                  {status === 'all' ? 'All Status' : status.charAt(0).toUpperCase() + status.slice(1)}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Stats */}
        <div className="flex gap-4 text-sm">
          <span className="px-3 py-1 bg-gray-100 rounded-full">
            Total: {filteredBookings.length}
          </span>
          <span className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full">
            Pending: {filteredBookings.filter(b => b.status === 'pending').length}
          </span>
          <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full">
            Processing: {filteredBookings.filter(b => b.status === 'processing').length}
          </span>
          <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full">
            Completed: {filteredBookings.filter(b => b.status === 'completed').length}
          </span>
        </div>
      </div>

      {/* Bookings Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Service
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  User
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Provider
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Category
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date & Price
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredBookings.map((booking) => (
                <tr key={booking.id} className="hover:bg-gray-50">
                  {/* Service Column */}
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <img
                        src={booking.serviceImage}
                        alt={booking.service}
                        className="w-12 h-12 rounded-lg object-cover mr-3"
                      />
                      <div>
                        <div className="font-medium text-gray-900">{booking.service}</div>
                      </div>
                    </div>
                  </td>

                  {/* User Column */}
                  <td className="px-6 py-4">
                    <div>
                      <div className="font-medium text-gray-900">{booking.userName}</div>
                      <div className="text-sm text-gray-500">{booking.userEmail}</div>
                    </div>
                  </td>

                  {/* Provider Column */}
                  <td className="px-6 py-4">
                    <div>
                      <div className="font-medium text-gray-900">{booking.providerName}</div>
                      <div className="text-sm text-gray-500">{booking.providerEmail}</div>
                    </div>
                  </td>

                  {/* Category Column */}
                  <td className="px-6 py-4">
                    <span className="px-3 py-1 bg-gray-100 rounded-full text-sm">
                      {booking.category}
                    </span>
                  </td>

                  {/* Date & Price */}
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900">{booking.date}</div>
                    <div className="text-sm font-medium text-green-600">{booking.price}</div>
                  </td>

                  {/* Status Column */}
                  <td className="px-6 py-4">
                    {editingId === booking.id ? (
                      <div className="flex items-center space-x-2">
                        <select
                          className="border rounded px-2 py-1 text-sm"
                          value={editStatus}
                          onChange={(e) => setEditStatus(e.target.value)}
                        >
                          <option value="pending">Pending</option>
                          <option value="processing">Processing</option>
                          <option value="completed">Completed</option>
                        </select>
                        <button
                          onClick={() => saveEdit(booking.id)}
                          className="text-green-600 hover:text-green-800"
                        >
                          <FaCheck />
                        </button>
                        <button
                          onClick={cancelEdit}
                          className="text-red-600 hover:text-red-800"
                        >
                          <FaTimes />
                        </button>
                      </div>
                    ) : (
                      <div className="flex items-center space-x-2">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(booking.status)}`}>
                          {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                        </span>
                        <button
                          onClick={() => startEdit(booking.id, booking.status)}
                          className="text-gray-400 hover:text-gray-600"
                        >
                          <FaEdit />
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Empty State */}
        {filteredBookings.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-2">No bookings found</div>
            <div className="text-gray-500 text-sm">Try changing your search or filters</div>
          </div>
        )}
      </div>

      {/* Summary */}
      <div className="mt-6 text-sm text-gray-600">
        Showing {filteredBookings.length} of {bookings.length} bookings
      </div>
    </div>
  );
};

export default ManageBookings;