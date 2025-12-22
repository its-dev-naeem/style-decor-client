import axios from "axios";
import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../providers/AuthContext";
import {
  FiCalendar,
  FiClock,
  FiMapPin,
  FiUser,
  FiCheckCircle,
  FiAlertCircle,
  FiPackage,
} from "react-icons/fi";

const TodaysSchedule = () => {
  const { user } = useContext(AuthContext);
  const [todayProjects, setTodayProjects] = useState([]);
  const [upcomingProjects, setUpcomingProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user?.email) fetchSchedule();
  }, [user?.email]);

  const fetchSchedule = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/payment/decorator/${user.email}`
      );
      const projects = response.data;
      const today = new Date().toDateString();

      const todayProjectsList = projects.filter((project) => {
        if (!project.deliveryTime) return false;
        return new Date(project.deliveryTime).toDateString() === today;
      });

      const upcomingProjectsList = projects
        .filter((project) => {
          if (!project.deliveryTime) return false;
          const projectDate = new Date(project.deliveryTime);
          const diffDays = Math.ceil((projectDate - new Date()) / 86400000);
          return diffDays > 0 && diffDays <= 7;
        })
        .sort((a, b) => new Date(a.deliveryTime) - new Date(b.deliveryTime));

      setTodayProjects(todayProjectsList);
      setUpcomingProjects(upcomingProjectsList);
      setLoading(false);
    } catch (error) {
      console.error("Error:", error);
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
      year: "numeric",
    });
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

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="loading loading-spinner loading-lg"></div>
      </div>
    );

  const totalProjects = todayProjects.length + upcomingProjects.length;

  return (
    <div className="min-h-screen bg-base-200 p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8 text-center">
          <h1 className="text-2xl md:text-3xl font-bold flex items-center justify-center gap-2">
            <FiCalendar className="text-primary" /> Today's Schedule
          </h1>
          <p className="text-gray-600 mt-2">
            {new Date().toLocaleDateString("en-US", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="stat bg-base-100 rounded-lg shadow p-6 text-center">
            <div className="stat-figure text-primary mx-auto mb-3">
              <FiClock className="text-3xl" />
            </div>
            <div className="stat-title">Today's Tasks</div>
            <div className="stat-value text-2xl">{todayProjects.length}</div>
          </div>
          <div className="stat bg-base-100 rounded-lg shadow p-6 text-center">
            <div className="stat-figure text-info mx-auto mb-3">
              <FiCalendar className="text-3xl" />
            </div>
            <div className="stat-title">Upcoming (7 days)</div>
            <div className="stat-value text-2xl">{upcomingProjects.length}</div>
          </div>
          <div className="stat bg-base-100 rounded-lg shadow p-6 text-center">
            <div className="stat-figure text-success mx-auto mb-3">
              <FiCheckCircle className="text-3xl" />
            </div>
            <div className="stat-title">Total Scheduled</div>
            <div className="stat-value text-2xl">{totalProjects}</div>
          </div>
        </div>

        <div className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <h2 className="text-xl font-bold">Today's Projects</h2>
            <span
              className={`badge ${
                todayProjects.length > 0 ? "badge-primary" : "badge-ghost"
              }`}
            >
              {todayProjects.length}
            </span>
          </div>

          {todayProjects.length === 0 ? (
            <div className="card bg-base-100 shadow text-center py-12">
              <FiAlertCircle className="text-4xl text-gray-400 mx-auto mb-4" />
              <div className="text-gray-500 text-lg">No projects for today</div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {todayProjects.map((project) => (
                <div key={project._id} className="card bg-base-100 shadow">
                  <div className="card-body">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="font-bold text-lg">
                          {project.serviceName}
                        </h3>
                        <div className="text-sm text-gray-500">
                          {project.category}
                        </div>
                      </div>
                      <span className="badge badge-primary">
                        <FiClock className="mr-1" /> Today
                      </span>
                    </div>

                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <FiUser className="text-gray-400" />
                        <div>
                          <div className="text-sm text-gray-500">Client</div>
                          <div className="font-medium">{project.userName}</div>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <FiMapPin className="text-gray-400" />
                        <div>
                          <div className="text-sm text-gray-500">Location</div>
                          <div className="font-medium">{project.location}</div>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <FiPackage className="text-gray-400" />
                        <div>
                          <div className="text-sm text-gray-500">
                            Work Status
                          </div>
                          <span
                            className={`badge ${getStatusColor(
                              project.workStatus
                            )}`}
                          >
                            {project.workStatus}
                          </span>
                        </div>
                      </div>

                      <div className="flex justify-between items-center pt-3 border-t">
                        <div>
                          <div className="text-sm text-gray-500">Price</div>
                          <div className="font-bold text-lg">
                            ${project.price}
                          </div>
                        </div>
                        <div>
                          <div className="text-sm text-gray-500">Unit</div>
                          <div className="font-medium">{project.unit}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <h2 className="text-xl font-bold">Upcoming Schedule</h2>
            <span
              className={`badge ${
                upcomingProjects.length > 0 ? "badge-info" : "badge-ghost"
              }`}
            >
              {upcomingProjects.length}
            </span>
          </div>

          {upcomingProjects.length === 0 ? (
            <div className="card bg-base-100 shadow text-center py-12">
              <FiCalendar className="text-4xl text-gray-400 mx-auto mb-4" />
              <div className="text-gray-500 text-lg">No upcoming projects</div>
            </div>
          ) : (
            <div className="card bg-base-100 shadow">
              <div className="card-body p-0">
                <div className="overflow-x-auto">
                  <table className="table w-full">
                    <thead>
                      <tr className="bg-base-300">
                        <th className="py-4 px-6 text-center">Delivery Date</th>
                        <th className="py-4 px-6 text-center">Service</th>
                        <th className="py-4 px-6 text-center">Client</th>
                        <th className="py-4 px-6 text-center">Location</th>
                        <th className="py-4 px-6 text-center">Price</th>
                        <th className="py-4 px-6 text-center">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {upcomingProjects.map((project) => (
                        <tr
                          key={project._id}
                          className="hover:bg-base-200 border-b border-base-300"
                        >
                          <td className="py-4 px-6 text-center">
                            <div className="font-bold">
                              {formatDate(project.deliveryTime)}
                            </div>
                          </td>
                          <td className="py-4 px-6 text-center">
                            <div className="font-semibold">
                              {project.serviceName}
                            </div>
                            <div className="text-sm text-gray-500">
                              {project.category}
                            </div>
                          </td>
                          <td className="py-4 px-6 text-center">
                            <div className="flex flex-col items-center">
                              <FiUser className="mb-1 text-gray-400" />
                              <div className="font-medium">
                                {project.userName}
                              </div>
                            </div>
                          </td>
                          <td className="py-4 px-6 text-center">
                            <div className="flex flex-col items-center">
                              <FiMapPin className="mb-1 text-gray-400" />
                              <span>{project.location}</span>
                            </div>
                          </td>
                          <td className="py-4 px-6 text-center">
                            <div className="font-bold text-lg">
                              ${project.price}
                            </div>
                            <div className="text-sm text-gray-500">
                              {project.unit}
                            </div>
                          </td>
                          <td className="py-4 px-6 text-center">
                            <span
                              className={`badge ${getStatusColor(
                                project.workStatus
                              )}`}
                            >
                              {project.workStatus}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
        </div>

        {totalProjects > 0 && (
          <div className="card bg-base-100 shadow">
            <div className="card-body">
              <h3 className="card-title">Schedule Summary</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold mb-2">Today's Priority</h4>
                  <ul className="space-y-2">
                    {todayProjects.slice(0, 3).map((project) => (
                      <li key={project._id} className="flex items-center gap-3">
                        <FiClock className="text-primary" />
                        <span className="font-medium">
                          {project.serviceName}
                        </span>
                        <span className="text-gray-500 ml-auto">
                          {project.location}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Next 3 Days</h4>
                  <ul className="space-y-2">
                    {upcomingProjects.slice(0, 3).map((project) => (
                      <li key={project._id} className="flex items-center gap-3">
                        <FiCalendar className="text-info" />
                        <div>
                          <div className="font-medium">
                            {project.serviceName}
                          </div>
                          <div className="text-sm text-gray-500">
                            {formatDate(project.deliveryTime)}
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TodaysSchedule;
