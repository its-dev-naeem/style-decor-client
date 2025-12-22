import React, { useState, useEffect } from "react";
import axios from "axios";
import { FiSearch, FiUser, FiUserCheck, FiShield } from "react-icons/fi";
import LoadingSpinner from "../Shared/LoadingSpinner";
import toast from "react-hot-toast";
const API_URL = import.meta.env.VITE_API_URL;

const ManageDecorators = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRole, setSelectedRole] = useState("All User");
  const [showRequestModal, setShowRequestModal] = useState(false);
  const [request, setRequest] = useState([]);
  const [decoratorRequests, setDecoratorRequests] = useState([]);

  const getRequests = async () => {
    try {
      const response = await axios.get(`${API_URL}/requests`);
      setRequest(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };
  useEffect(() => {
    getRequests();
  }, []);
  useEffect(() => {
    setDecoratorRequests(request);
  }, [request]);

  const fetchUsers = async () => {
    try {
      const response = await axios.get(`${API_URL}/all-users`);
      setUsers(response.data);
      setFilteredUsers(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching users:", error);
      setLoading(false);
    }
  };
  // Fetch users
  useEffect(() => {
    fetchUsers();
  }, []);

  const filterUsers = () => {
    let filtered = users;

    // Filter by role
    if (selectedRole !== "All User") {
      filtered = filtered.filter(
        (user) => selectedRole.toLowerCase() === user.role.toLowerCase()
      );
    }
    // Filter by search term
    if (searchTerm.trim() !== "") {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (user) =>
          user.name.toLowerCase().includes(term) ||
          user.email.toLowerCase().includes(term)
      );
    }
    setFilteredUsers(filtered);
  };

  // Filter users when search or role changes
  useEffect(() => {
    filterUsers();
  }, [searchTerm, selectedRole, users]);

  const handleRoleChange = async (userEmail, newRole) => {
    try {
      // API call to update role
      await axios.put(`${API_URL}/update-role/${userEmail}`, {
        role: newRole,
      });

      // Update local state
      setUsers(
        users.map((user) =>
          user.email === userEmail ? { ...user, role: newRole } : user
        )
      );

      toast.success("Role updated successfully!");
    } catch (error) {
      console.error("Error updating role:", error);
      toast.error("Failed to update role");
    }
  };

  const handleReject = async (id) => {
    await axios.delete(`${API_URL}/delete-request/${id}`);
  };

  const handleRequestAction = (requestId, requestEmail, action) => {
    // Remove request from list
    setDecoratorRequests(
      decoratorRequests.filter((req) => req._id !== requestId)
    );

    if (action === "accept") {
      handleRoleChange(requestEmail, "decorator");
      handleReject(requestId);
      toast.success('Request Accept!')
    } else {
      toast("Request rejected!");
      handleReject(requestId);
    }
  };

  const getRoleIcon = (role) => {
    switch (role) {
      case "admin":
        return <FiShield className="text-red-500" />;
      case "decorator":
        return <FiUserCheck className="text-green-500" />;
      default:
        return <FiUser className="text-blue-500" />;
    }
  };

  if (loading) {
    return <LoadingSpinner></LoadingSpinner>;
  }

  return (
    <div className="min-h-screen w-full bg-base-200 rounded-2xl p-4 md:p-6">
      {/* Header */}
      <div className="border-b pb-4 md:pb-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <h1 className="font-bold text-2xl">User Management</h1>

          <div className="flex flex-col md:flex-row gap-3 w-full md:w-auto">
            {/* Search Bar */}
            <div className="relative w-full md:w-64">
              <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search by name or email..."
                className="input input-bordered pl-10 w-full"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            {/* Role Filter */}
            <select
              value={selectedRole}
              onChange={(e) => setSelectedRole(e.target.value)}
              className="select select-bordered w-full md:w-40"
            >
              <option>All User</option>
              <option>User</option>
              <option>Decorator</option>
              <option>Admin</option>
            </select>

            {/* Request Button */}
            <button
              onClick={() => setShowRequestModal(true)}
              className="btn btn-primary w-full md:w-auto"
            >
              Decorator Requests ({decoratorRequests.length})
            </button>
          </div>
        </div>
      </div>

      {/* User Table */}
      <div className="rounded-2xl mt-6 overflow-x-auto">
        {/* Table Header - Desktop */}
        <div className="hidden md:grid grid-cols-12 font-semibold bg-base-100 rounded-xl shadow-md text-center py-3">
          <span className="col-span-1">No</span>
          <span className="col-span-2">Avatar</span>
          <span className="col-span-3">Name</span>
          <span className="col-span-3">Email</span>
          <span className="col-span-1">Role</span>
          <span className="col-span-2">Edit Role</span>
        </div>

        {/* Users List */}
        <div className="mt-3 space-y-3">
          {filteredUsers.length === 0 ? (
            <div className="text-center py-8 bg-base-100 rounded-xl">
              No users found
            </div>
          ) : (
            filteredUsers.map((user, index) => (
              <div
                key={user._id}
                className="bg-base-100 shadow-md rounded-xl p-4 md:p-0 md:grid md:grid-cols-12 items-center"
              >
                {/* Mobile View */}
                <div className="md:hidden space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <img
                        className="h-12 w-12 rounded-full border"
                        src={user.imageURL || "https://i.pravatar.cc/150?img=3"}
                        alt={user.name}
                      />
                      <div>
                        <p className="font-semibold">{user.name}</p>
                        <p className="text-sm opacity-70">{user.email}</p>
                      </div>
                    </div>
                    <span className="badge badge-outline">
                      {getRoleIcon(user.role)} {user.role}
                    </span>
                  </div>

                  <select
                    value={user.role}
                    onChange={(e) => handleRoleChange(user._id, e.target.value)}
                    className="select select-bordered w-full"
                  >
                    <option value="user">User</option>
                    <option value="decorator">Decorator</option>
                    <option value="admin">Admin</option>
                  </select>
                </div>

                {/* Desktop View */}
                <div className="hidden md:grid md:col-span-1 text-center py-3">
                  {index + 1}
                </div>

                <div className="hidden md:grid md:col-span-2 justify-center py-3">
                  <img
                    className="h-12 w-12 rounded-full border"
                    src={user.imageURL || "https://i.pravatar.cc/150?img=3"}
                    alt={user.name}
                  />
                </div>

                <div className="hidden md:grid md:col-span-3 items-center py-3">
                  {user.name}
                </div>

                <div className="hidden md:grid md:col-span-3 items-center py-3">
                  {user.email}
                </div>

                <div className="hidden md:grid md:col-span-1 items-center justify-center py-3">
                  <div className="flex items-center gap-1">
                    {getRoleIcon(user.role)}
                    <span className="capitalize">{user.role}</span>
                  </div>
                </div>

                <div className="hidden md:grid md:col-span-2 items-center justify-center py-3">
                  <select
                    value={user.role}
                    onChange={(e) =>
                      handleRoleChange(user.email, e.target.value)
                    }
                    className="select select-bordered w-40"
                  >
                    <option value="user">User</option>
                    <option value="decorator">Decorator</option>
                    <option value="admin">Admin</option>
                  </select>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Request Modal */}
      {showRequestModal && (
        <div className="modal modal-open">
          <div className="modal-box max-w-2xl">
            <h3 className="font-bold text-lg mb-4">Decorator Requests</h3>

            {decoratorRequests.length === 0 ? (
              <div className="text-center py-8">No pending requests</div>
            ) : (
              <div className="space-y-3">
                {decoratorRequests.map((request) => (
                  <div
                    key={request._id}
                    className="flex items-center justify-between bg-base-200 p-3 rounded-lg"
                  >
                    <div className="flex items-center gap-3">
                      <img
                        className="h-10 w-10 rounded-full"
                        src={request.photo}
                        alt={request.name}
                      />
                      <div>
                        <p className="font-semibold">{request.name}</p>
                        <p className="text-sm opacity-70">{request.email}</p>
                        <p className="text-xs opacity-50">
                          Requested on: {request.requestDate}
                        </p>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <button
                        onClick={() =>
                          handleRequestAction(
                            request._id,
                            request.email,
                            "accept"
                          )
                        }
                        className="btn btn-sm btn-success"
                      >
                        Accept
                      </button>
                      <button
                        onClick={() =>
                          handleRequestAction(
                            request._id,
                            request.email,
                            "reject"
                          )
                        }
                        className="btn btn-sm btn-error"
                      >
                        Reject
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            <div className="modal-action">
              <button
                onClick={() => setShowRequestModal(false)}
                className="btn"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageDecorators;
