import axios from "axios";
import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../providers/AuthContext";
import {
  FiUser,
  FiMail,
  FiMapPin,
  FiClock,
  FiDollarSign,
  FiPackage,
  FiCheckCircle,
  FiLoader,
} from "react-icons/fi";
import LoadingSpinner from "../Shared/LoadingSpinner";
const API_URL = import.meta.env.VITE_API_URL;

const MyAssignedProject = () => {
  const { user } = useContext(AuthContext);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user?.email) fetchProjects();
  }, [user?.email]);

  const fetchProjects = async () => {
    try {
      const response = await axios.get(
        `${API_URL}/payment/decorator/${user?.email}`
      );
      setProjects(response.data);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Completed":
        return "badge-success";
      case "In Progress":
        return "badge-info";
      default:
        return "badge-warning";
    }
  };

  if (loading) {
    return <LoadingSpinner></LoadingSpinner>;
  }

  return (
    <div className="min-h-screen bg-base-200 p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-center">
            My Assigned Projects
          </h1>
          <p className="text-gray-600 mt-2 text-center">
            Track all your assigned decoration projects
          </p>
        </div>

        {/* Mobile View - Improved */}
        <div className="md:hidden">
          {projects.length === 0 ? (
            <div className="card bg-base-100 shadow text-center py-12">
              <div className="text-gray-500 text-lg">
                No projects assigned yet
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              {projects.map((project) => (
                <div key={project._id} className="card bg-base-100 shadow">
                  <div className="card-body">
                    {/* Service Name & Status Row */}
                    <div className="flex flex-col items-center mb-4 text-center">
                      <h3 className="font-bold text-lg mb-2">
                        {project.serviceName}
                      </h3>
                      <span
                        className={`badge ${getStatusColor(
                          project.workStatus
                        )}`}
                      >
                        {project.workStatus === "Completed" && (
                          <FiCheckCircle className="inline mr-1" />
                        )}
                        {project.workStatus === "In Progress" && (
                          <FiLoader className="inline mr-1 animate-spin" />
                        )}
                        {project.workStatus || "Pending"}
                      </span>
                    </div>

                    {/* Client Info */}
                    <div className="text-center mb-4">
                      <div className="flex flex-col items-center mb-3">
                        <div className="avatar mb-2">
                          <div className="w-16 h-16 rounded-full bg-base-300 flex items-center justify-center">
                            <FiUser className="text-2xl" />
                          </div>
                        </div>
                        <div>
                          <div className="font-bold text-lg">
                            {project.userName}
                          </div>
                          <div className="text-gray-500 text-sm mt-1">
                            {project.userEmail}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Details Grid */}
                    <div className="grid grid-cols-2 gap-4 text-center mb-4">
                      <div className="bg-base-300 rounded-lg p-3">
                        <FiMapPin className="mx-auto text-lg mb-1" />
                        <div className="text-sm text-gray-500">Location</div>
                        <div className="font-medium">{project.location}</div>
                      </div>
                      <div className="bg-base-300 rounded-lg p-3">
                        <FiClock className="mx-auto text-lg mb-1" />
                        <div className="text-sm text-gray-500">Timeline</div>
                        <div className="font-medium">
                          {project.time || "Flexible"}
                        </div>
                      </div>
                    </div>

                    {/* Price & Unit */}
                    <div className="grid grid-cols-2 gap-4 text-center">
                      <div className="bg-base-300 rounded-lg p-3">
                        <FiDollarSign className="mx-auto text-lg mb-1 text-green-500" />
                        <div className="text-sm text-gray-500">Price</div>
                        <div className="font-bold text-lg">
                          BDT {project.price}
                        </div>
                      </div>
                      <div className="bg-base-300 rounded-lg p-3">
                        <FiPackage className="mx-auto text-lg mb-1 text-blue-500" />
                        <div className="text-sm text-gray-500">Unit</div>
                        <div className="font-medium">{project.unit}</div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Desktop View - Improved */}
        <div className="hidden md:block">
          <div className="card bg-base-100 shadow">
            <div className="card-body p-0">
              <div className="overflow-x-auto">
                <table className="table w-full">
                  <thead>
                    <tr className="bg-base-300">
                      <th className="py-4 px-6 text-center">Client</th>
                      <th className="py-4 px-6 text-center">Location</th>
                      <th className="py-4 px-6 text-center">Service</th>
                      <th className="py-4 px-6 text-center">Price</th>
                      <th className="py-4 px-6 text-center">Unit</th>
                      <th className="py-4 px-6 text-center">Timeline</th>
                      <th className="py-4 px-6 text-center">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {projects.length === 0 ? (
                      <tr>
                        <td colSpan="7" className="text-center py-12">
                          <div className="text-gray-500 text-lg">
                            No projects assigned
                          </div>
                        </td>
                      </tr>
                    ) : (
                      projects.map((project) => (
                        <tr
                          key={project._id}
                          className="hover:bg-base-200 border-b border-base-300"
                        >
                          <td className="py-6 px-6">
                            <div className="flex flex-col items-center text-center">
                              <div>
                                <div className="font-bold">
                                  {project.userName}
                                </div>
                                <div className="text-sm text-gray-500 truncate max-w-[200px]">
                                  {project.userEmail}
                                </div>
                              </div>
                            </div>
                          </td>

                          <td className="py-6 px-6 text-center">
                            <div className="flex flex-col items-center">
                              <FiMapPin className="mb-1 text-gray-400" />
                              <span>{project.location}</span>
                            </div>
                          </td>

                          <td className="py-6 px-6 text-center">
                            <div className="font-semibold">
                              {project.serviceName}
                            </div>
                            {project.category && (
                              <div className="text-sm text-gray-500">
                                {project.category}
                              </div>
                            )}
                          </td>

                          <td className="py-6 px-6 text-center">
                            <div className="flex flex-col items-center">
                              <FiDollarSign className="mb-1 text-green-500" />
                              <span className="font-bold">
                                BDT {project.price}
                              </span>
                            </div>
                          </td>

                          <td className="py-6 px-6 text-center">
                            <div className="flex flex-col items-center">
                              <FiPackage className="mb-1 text-blue-500" />
                              <span>{project.unit}</span>
                            </div>
                          </td>

                          <td className="py-6 px-6 text-center">
                            <div className="flex flex-col items-center">
                              <FiClock className="mb-1 text-gray-400" />
                              <span>{project.deliveryTime || "Flexible"}</span>
                            </div>
                          </td>

                          <td className="py-6 px-6 text-center">
                            <div className="flex justify-center">
                              <span
                                className={`badge ${getStatusColor(
                                  project.workStatus
                                )} badge-lg px-4 py-2`}
                              >
                                {project.workStatus === "Completed" && (
                                  <FiCheckCircle className="inline mr-1" />
                                )}
                                {project.workStatus === "In Progress" && (
                                  <FiLoader className="inline mr-1 animate-spin" />
                                )}
                                {project.workStatus || "Pending"}
                              </span>
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Summary */}
        {projects.length > 0 && (
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="stat bg-base-100 rounded-lg shadow p-6 text-center">
              <div className="stat-figure text-primary mx-auto mb-3">
                <FiPackage className="text-3xl" />
              </div>
              <div className="stat-title">Total Projects</div>
              <div className="stat-value text-2xl">{projects.length}</div>
            </div>

            <div className="stat bg-base-100 rounded-lg shadow p-6 text-center">
              <div className="stat-figure text-success mx-auto mb-3">
                <FiCheckCircle className="text-3xl" />
              </div>
              <div className="stat-title">Completed</div>
              <div className="stat-value text-2xl">
                {projects.filter((p) => p.workStatus === "Completed").length}
              </div>
            </div>

            <div className="stat bg-base-100 rounded-lg shadow p-6 text-center">
              <div className="stat-figure text-info mx-auto mb-3">
                <FiDollarSign className="text-3xl" />
              </div>
              <div className="stat-title">Total Value</div>
              <div className="stat-value text-2xl">
                BDT{" "}
                {projects
                  .reduce((sum, p) => sum + parseFloat(p.price || 0), 0)
                  .toFixed(2)}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyAssignedProject;
