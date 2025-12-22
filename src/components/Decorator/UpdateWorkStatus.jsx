import axios from "axios";
import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../providers/AuthContext";
import {
  FiPackage,
  FiLoader,
  FiCheckCircle,
  FiRefreshCw,
} from "react-icons/fi";
import LoadingSpinner from "../Shared/LoadingSpinner";
const API_URL = import.meta.env.VITE_API_URL;

const UpdateWorkStatus = () => {
  const { user } = useContext(AuthContext);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    if (user?.email) fetchProjects();
  }, [user?.email]);

  const fetchProjects = async () => {
    try {
      const response = await axios.get(
        `${API_URL}/payment/decorator/${user.email}`
      );
      setProjects(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error:", error);
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (projectId, newStatus) => {
    setUpdating(true);
    try {
      await axios.patch(`${API_URL}/decorator-update/${projectId}`, {
        workStatus: newStatus,
      });

      setProjects(
        projects.map((project) =>
          project._id === projectId
            ? { ...project, workStatus: newStatus }
            : project
        )
      );
    } catch (error) {
      console.error("Error updating:", error);
      alert("Failed to update status");
    } finally {
      setUpdating(false);
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "completed":
        return <FiCheckCircle className="text-green-500" />;
      case "processing":
        return <FiLoader className="text-blue-500 animate-spin" />;
      default:
        return <FiPackage className="text-yellow-500" />;
    }
  };

  if (loading) return <LoadingSpinner></LoadingSpinner>;

  return (
    <div className="min-h-screen bg-base-200 p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8 text-center">
          <h1 className="text-2xl md:text-3xl font-bold flex items-center justify-center gap-2">
            <FiRefreshCw className="text-primary" /> Update Work Status
          </h1>
          <p className="text-gray-600 mt-2">
            Update status of your assigned projects
          </p>
        </div>

        {projects.length === 0 ? (
          <div className="card bg-base-100 shadow text-center py-12">
            <div className="text-gray-500 text-lg">No projects assigned</div>
          </div>
        ) : (
          <div className="space-y-4">
            {projects.map((project) => (
              <div key={project._id} className="card bg-base-100 shadow">
                <div className="card-body">
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-4">
                    <div>
                      <h3 className="font-bold text-lg">
                        {project.serviceName}
                      </h3>
                      <div className="text-sm text-gray-500">
                        {project.category}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {getStatusIcon(project.workStatus?.toLowerCase())}
                      <span
                        className={`badge ${
                          project.workStatus?.toLowerCase() === "completed"
                            ? "badge-success"
                            : project.workStatus?.toLowerCase() === "processing"
                            ? "badge-info"
                            : "badge-warning"
                        }`}
                      >
                        {project.workStatus || "pending"}
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <div className="text-sm text-gray-500">Client</div>
                      <div className="font-medium">{project.userName}</div>
                      <div className="text-sm text-gray-500">
                        {project.userEmail}
                      </div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-500">Location</div>
                      <div className="font-medium">{project.location}</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-500">Price</div>
                      <div className="font-bold text-lg">
                        BDT{project.price}
                      </div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-500">Unit</div>
                      <div className="font-medium">{project.unit}</div>
                    </div>
                  </div>

                  <div className="flex flex-col md:flex-row justify-between items-center gap-4 pt-4 border-t">
                    <div className="w-full md:w-auto">
                      <div className="text-sm text-gray-500 mb-2">
                        Update Status
                      </div>
                      <select
                        value={project.workStatus?.toLowerCase() || "pending"}
                        onChange={(e) =>
                          handleStatusUpdate(project._id, e.target.value)
                        }
                        className="select select-bordered w-full"
                        disabled={updating}
                      >
                        <option value="pending">Pending</option>
                        <option value="processing">Processing</option>
                        <option value="completed">Completed</option>
                      </select>
                    </div>
                    {project.deliveryTime && (
                      <div className="text-center">
                        <div className="text-sm text-gray-500">
                          Delivery Date
                        </div>
                        <div className="font-medium">
                          {new Date(project.deliveryTime).toLocaleDateString()}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {projects.length > 0 && (
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="stat bg-base-100 rounded-lg shadow p-6 text-center">
              <div className="stat-figure text-warning mx-auto mb-3">
                <FiPackage className="text-3xl" />
              </div>
              <div className="stat-title">Pending</div>
              <div className="stat-value text-2xl">
                {
                  projects.filter(
                    (p) =>
                      !p.workStatus || p.workStatus.toLowerCase() === "pending"
                  ).length
                }
              </div>
            </div>

            <div className="stat bg-base-100 rounded-lg shadow p-6 text-center">
              <div className="stat-figure text-info mx-auto mb-3">
                <FiLoader className="text-3xl" />
              </div>
              <div className="stat-title">Processing</div>
              <div className="stat-value text-2xl">
                {
                  projects.filter(
                    (p) => p.workStatus?.toLowerCase() === "processing"
                  ).length
                }
              </div>
            </div>

            <div className="stat bg-base-100 rounded-lg shadow p-6 text-center">
              <div className="stat-figure text-success mx-auto mb-3">
                <FiCheckCircle className="text-3xl" />
              </div>
              <div className="stat-title">Completed</div>
              <div className="stat-value text-2xl">
                {
                  projects.filter(
                    (p) => p.workStatus?.toLowerCase() === "completed"
                  ).length
                }
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UpdateWorkStatus;
