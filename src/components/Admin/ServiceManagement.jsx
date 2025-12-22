import React, { useState, useEffect } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { toast, Toaster } from "react-hot-toast";
import LoadingSpinner from "../Shared/LoadingSpinner";
const API_URL = import.meta.env.VITE_API_URL;

const ServiceManagement = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingService, setEditingService] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const { watch } = useForm();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  // Fetch services from API
  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_URL}/services`);
      setServices(response.data);
    } catch (error) {
      console.error("Error fetching services:", error);
      toast.error("Failed to load services");
    } finally {
      setLoading(false);
    }
  };

  // Filter services based on search and category
  const filteredServices = services.filter((service) => {
    const matchesSearch =
      service.serviceName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      service.description.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory =
      categoryFilter === "all" || service.serviceCategory === categoryFilter;

    return matchesSearch && matchesCategory;
  });

  // Get unique categories for filter
  const categories = [
    "all",
    ...new Set(services.map((s) => s.serviceCategory)),
  ];

  // Handle Edit
  const handleEdit = (service) => {
    setEditingService(service);
    reset({
      serviceName: service.serviceName,
      serviceCategory: service.serviceCategory,
      description: service.description,
      price: service.price,
      unit: service.unit,
      ServicImage: service.ServicImage,
      providerName: service.providerName,
      providerEmail: service.providerEmail,
      providerPhoto: service.providerPhoto,
    });
    setShowModal(true);
  };

  // Handle Update
  const onSubmit = async (data) => {
    try {
      if (editingService) {
        await axios.put(`${API_URL}/services/${editingService._id}`, data);
        alert("Service updated successfully!");
      }
      setShowModal(false);
      fetchServices();
      setEditingService(null);
      reset();
    } catch (error) {
      console.error("Error saving service:", error);
      toast.error("Failed to save service");
    }
  };

  // Handle Delete
  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_URL}/services/${id}`);
      setServices(services.filter((service) => service._id !== id));
      toast.success("Service deleted successfully!");
      setDeleteConfirm(null);
    } catch (error) {
      console.error("Error deleting service:", error);
      toast.error("Failed to delete service");
    }
  };

  // Handle Add New
  const handleAddNew = () => {
    setEditingService(null);
    reset({
      serviceName: "",
      serviceCategory: "interior-design",
      description: "",
      price: "",
      unit: "Inch",
      ServicImage: "",
      providerName: "",
      providerEmail: "",
      providerPhoto: "",
    });
    setShowModal(true);
  };

  // Format category name
  const formatCategory = (category) => {
    return category
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  if (loading) {
    return <LoadingSpinner></LoadingSpinner>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 p-4 md:p-6">
      <Toaster position="top-right" />

      {/* Header */}
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
              Service Management
            </h1>
            <p className="text-gray-600 mt-2">
              Total {services.length} services • {filteredServices.length}{" "}
              filtered
            </p>
          </div>
          <button
            onClick={handleAddNew}
            className="mt-4 md:mt-0 px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 flex items-center shadow-lg"
          >
            <svg
              className="w-5 h-5 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
              />
            </svg>
            Add New Service
          </button>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl shadow-sm p-4 md:p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Search Services
              </label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search by name or description..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-4 py-2 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <svg
                  className="absolute left-3 top-2.5 w-5 h-5 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Filter by Category
              </label>
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category === "all"
                      ? "All Categories"
                      : formatCategory(category)}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Services Table */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200">
          {/* Desktop View */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gradient-to-r from-gray-50 to-blue-50">
                <tr>
                  <th className="p-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Service
                  </th>
                  <th className="p-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Category
                  </th>
                  <th className="p-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Description
                  </th>
                  <th className="p-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Price & Unit
                  </th>
                  <th className="p-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Provider
                  </th>
                  <th className="p-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredServices.map((service) => (
                  <tr
                    key={service._id}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    {/* Service Column */}
                    <td className="p-4">
                      <div className="flex items-center">
                        <img
                          src={service.ServicImage}
                          alt={service.serviceName}
                          className="w-16 h-16 rounded-lg object-cover border border-gray-200"
                        />
                        <div className="ml-4">
                          <h3 className="font-semibold text-gray-800">
                            {service.serviceName}
                          </h3>
                        </div>
                      </div>
                    </td>

                    {/* Category Column */}
                    <td className="p-4">
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                        {formatCategory(service.serviceCategory)}
                      </span>
                    </td>

                    {/* Description Column */}
                    <td className="p-4">
                      <p className="text-sm text-gray-600 line-clamp-2">
                        {service.description}
                      </p>
                    </td>

                    {/* Price Column */}
                    <td className="p-4">
                      <div>
                        <p className="text-lg font-bold text-gray-900">
                          BDT {service.price}
                        </p>
                        <p className="text-sm text-gray-500">
                          per {service.unit}
                        </p>
                      </div>
                    </td>

                    {/* Provider Column */}
                    <td className="p-4">
                      <div className="flex items-center">
                        <img
                          src={service.providerPhoto}
                          alt={service.providerName}
                          className="w-10 h-10 rounded-full border border-gray-200"
                        />
                        <div className="ml-3">
                          <p className="text-sm font-medium text-gray-800">
                            {service.providerName}
                          </p>
                          <p className="text-xs text-gray-500 truncate max-w-[150px]">
                            {service.providerEmail}
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* Actions Column */}
                    <td className="p-4">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleEdit(service)}
                          className="px-4 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition flex items-center"
                        >
                          <svg
                            className="w-4 h-4 mr-1"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                            />
                          </svg>
                          Edit
                        </button>
                        <button
                          onClick={() => setDeleteConfirm(service._id)}
                          className="px-4 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition flex items-center"
                        >
                          <svg
                            className="w-4 h-4 mr-1"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                            />
                          </svg>
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile View */}
          <div className="md:hidden">
            {filteredServices.map((service) => (
              <div
                key={service._id}
                className="p-4 border-b border-gray-200 last:border-b-0"
              >
                <div className="flex items-start space-x-4">
                  <img
                    src={service.ServicImage}
                    alt={service.serviceName}
                    className="w-20 h-20 rounded-lg object-cover border border-gray-200"
                  />
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-semibold text-gray-800">
                          {service.serviceName}
                        </h3>
                        <span className="inline-flex items-center px-2 py-0.5 mt-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                          {formatCategory(service.serviceCategory)}
                        </span>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-bold text-gray-900">
                          BDT {service.price}
                        </p>
                        <p className="text-xs text-gray-500">
                          per {service.unit}
                        </p>
                      </div>
                    </div>

                    <p className="text-sm text-gray-600 mt-2 line-clamp-2">
                      {service.description}
                    </p>

                    <div className="flex items-center mt-3">
                      <img
                        src={service.providerPhoto}
                        alt={service.providerName}
                        className="w-8 h-8 rounded-full border border-gray-200"
                      />
                      <div className="ml-2">
                        <p className="text-xs font-medium text-gray-800">
                          {service.providerName}
                        </p>
                        <p className="text-xs text-gray-500 truncate max-w-[200px]">
                          {service.providerEmail}
                        </p>
                      </div>
                    </div>

                    <div className="flex space-x-2 mt-4">
                      <button
                        onClick={() => handleEdit(service)}
                        className="flex-1 px-3 py-2 bg-blue-50 text-blue-600 rounded-lg text-sm flex items-center justify-center"
                      >
                        <svg
                          className="w-4 h-4 mr-1"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                          />
                        </svg>
                        Edit
                      </button>
                      <button
                        onClick={() => setDeleteConfirm(service._id)}
                        className="flex-1 px-3 py-2 bg-red-50 text-red-600 rounded-lg text-sm flex items-center justify-center"
                      >
                        <svg
                          className="w-4 h-4 mr-1"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                          />
                        </svg>
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Empty State */}
          {filteredServices.length === 0 && (
            <div className="text-center py-12">
              <div className="text-gray-400 text-5xl mb-4">📦</div>
              <h3 className="text-xl font-semibold text-gray-600 mb-2">
                No services found
              </h3>
              <p className="text-gray-500">
                {searchTerm || categoryFilter !== "all"
                  ? "Try changing your filters"
                  : "Add your first service using the button above"}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Edit/Create Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/15 bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800">
                  {editingService ? "Edit Service" : "Add New Service"}
                </h2>
                <button
                  onClick={() => {
                    setShowModal(false);
                    setEditingService(null);
                    reset();
                  }}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Service Name */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Service Name *
                    </label>
                    <input
                      type="text"
                      {...register("serviceName", {
                        required: "Service name is required",
                      })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    {errors.serviceName && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.serviceName.message}
                      </p>
                    )}
                  </div>

                  {/* Category */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Category *
                    </label>
                    <select
                      {...register("serviceCategory", {
                        required: "Category is required",
                      })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="interior-design">Interior Design</option>
                      <option value="event-decoration">Event Decoration</option>
                      <option value="catering">Catering</option>
                      <option value="photography">Photography</option>
                      <option value="venue">Venue</option>
                    </select>
                    {errors.serviceCategory && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.serviceCategory.message}
                      </p>
                    )}
                  </div>

                  {/* Price */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Price *
                    </label>
                    <input
                      type="number"
                      {...register("price", {
                        required: "Price is required",
                        min: { value: 1, message: "Price must be positive" },
                      })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    {errors.price && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.price.message}
                      </p>
                    )}
                  </div>

                  {/* Unit */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Unit *
                    </label>
                    <select
                      {...register("unit", { required: "Unit is required" })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="Inch">Inch</option>
                      <option value="Square Feet">Square Feet</option>
                      <option value="Hour">Hour</option>
                      <option value="Day">Day</option>
                      <option value="Person">Person</option>
                      <option value="Event">Event</option>
                    </select>
                    {errors.unit && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.unit.message}
                      </p>
                    )}
                  </div>

                  {/* Service Image URL */}
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Service Image URL *
                    </label>
                    <input
                      type="url"
                      {...register("ServicImage", {
                        required: "Image URL is required",
                      })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    {errors.ServicImage && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.ServicImage.message}
                      </p>
                    )}
                    {watch("ServicImage") && (
                      <div className="mt-2">
                        <img
                          src={watch("ServicImage")}
                          alt="Preview"
                          className="w-32 h-32 object-cover rounded-lg border border-gray-200"
                          onError={(e) => {
                            e.target.src =
                              "https://via.placeholder.com/150?text=Image+Error";
                          }}
                        />
                      </div>
                    )}
                  </div>

                  {/* Description */}
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Description *
                    </label>
                    <textarea
                      rows={4}
                      {...register("description", {
                        required: "Description is required",
                        minLength: {
                          value: 10,
                          message: "Description must be at least 10 characters",
                        },
                      })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    {errors.description && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.description.message}
                      </p>
                    )}
                  </div>

                  {/* Provider Name */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Provider Name *
                    </label>
                    <input
                      type="text"
                      {...register("providerName", {
                        required: "Provider name is required",
                      })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    {errors.providerName && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.providerName.message}
                      </p>
                    )}
                  </div>

                  {/* Provider Email */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Provider Email *
                    </label>
                    <input
                      type="email"
                      {...register("providerEmail", {
                        required: "Provider email is required",
                        pattern: {
                          value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                          message: "Invalid email address",
                        },
                      })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    {errors.providerEmail && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.providerEmail.message}
                      </p>
                    )}
                  </div>

                  {/* Provider Photo URL */}
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Provider Photo URL *
                    </label>
                    <input
                      type="url"
                      {...register("providerPhoto", {
                        required: "Provider photo URL is required",
                      })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    {errors.providerPhoto && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.providerPhoto.message}
                      </p>
                    )}
                    {watch("providerPhoto") && (
                      <div className="mt-2">
                        <img
                          src={watch("providerPhoto")}
                          alt="Provider Preview"
                          className="w-16 h-16 object-cover rounded-full border border-gray-200"
                          onError={(e) => {
                            e.target.src =
                              "https://via.placeholder.com/150?text=Photo+Error";
                          }}
                        />
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200">
                  <button
                    type="button"
                    onClick={() => {
                      setShowModal(false);
                      setEditingService(null);
                      reset();
                    }}
                    className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg hover:from-blue-700 hover:to-indigo-700 transition"
                  >
                    {editingService ? "Update Service" : "Create Service"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteConfirm && (
        <div className="fixed inset-0 bg-black/15 bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-2xl p-6 max-w-md w-full">
            <div className="text-center">
              <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 mb-4">
                <svg
                  className="h-6 w-6 text-red-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.698-.833-2.464 0L4.732 16.5c-.77.833.192 2.5 1.732 2.5z"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Delete Service
              </h3>
              <p className="text-sm text-gray-500 mb-6">
                Are you sure you want to delete this service? This action cannot
                be undone.
              </p>
              <div className="flex justify-center space-x-4">
                <button
                  onClick={() => setDeleteConfirm(null)}
                  className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition"
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleDelete(deleteConfirm)}
                  className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Add watch function for form validation

export default ServiceManagement;
