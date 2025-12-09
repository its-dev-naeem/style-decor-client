import React, { useState, useRef } from "react";
import { useForm } from "react-hook-form";
import {
  FaPlus,
  FaImage,
  FaTag,
  FaDollarSign,
  FaListAlt,
  FaFileAlt,
  FaUpload,
  FaTimes,
  FaCheckCircle,
  FaSpinner,
} from "react-icons/fa";

const AddService = () => {
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors, isSubmitting },
  } = useForm();

  const [imagePreview, setImagePreview] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef(null);

  // Service categories
  const serviceCategories = [
    {
      value: "home-decoration",
      label: "🏠 Home Decoration",
      color: "bg-blue-100 text-blue-800",
    },
    {
      value: "interior-design",
      label: "🎨 Interior Design",
      color: "bg-purple-100 text-purple-800",
    },
    {
      value: "event-decoration",
      label: "🎉 Event Decoration",
      color: "bg-pink-100 text-pink-800",
    },
    {
      value: "luxury-makeover",
      label: "✨ Luxury Makeover",
      color: "bg-yellow-100 text-yellow-800",
    },
    {
      value: "office-design",
      label: "💼 Office Design",
      color: "bg-green-100 text-green-800",
    },
    {
      value: "landscaping",
      label: "🌿 Landscaping",
      color: "bg-emerald-100 text-emerald-800",
    },
  ];

  // Handle image upload
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validate file type
    if (!file.type.match("image.*")) {
      alert("Please select an image file (JPEG, PNG, etc.)");
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert("Image size should be less than 5MB");
      return;
    }

    // Simulate upload progress
    setIsUploading(true);
    setUploadProgress(0);

    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsUploading(false);

          // Create preview
          const reader = new FileReader();
          reader.onloadend = () => {
            setImagePreview(reader.result);
            alert("Image uploaded successfully!");
          };
          reader.readAsDataURL(file);

          return 100;
        }
        return prev + 20;
      });
    }, 100);
  };

  // Handle form submission
  const onSubmit = async (data) => {
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      console.log("Service Data Submitted:", {
        ...data,
        image: imagePreview ? "Uploaded Image" : data.image,
        timestamp: new Date().toISOString(),
      });

      // Show success alert
      alert(
        <div>
          <FaCheckCircle className="inline mr-2" />
          <strong>Service Added Successfully!</strong>
          <p className="text-sm">"{data.serviceName}" is now live.</p>
        </div>
      );

      // Reset form
      reset();
      setImagePreview(null);
      setUploadProgress(0);

      // Reset file input
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    } catch (error) {
      console.log(error);
      alert("Failed to add service. Please try again.");
    }
  };

  // Remove image preview
  const removeImagePreview = () => {
    setImagePreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  // Watch form values for live preview
  const serviceName = watch("serviceName", "");
  const description = watch("description", "");
  const price = watch("price", "");
  const category = watch("serviceCategory", "");

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-primary/5 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-gray-900 mb-3">
            <FaPlus className="inline mr-3 text-primary" />
            Add New Service
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Create and publish your decoration service to attract clients
            worldwide
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column - Form */}
          <div>
            <div className="card bg-white shadow-2xl rounded-2xl overflow-hidden border border-gray-100">
              <div className="card-body p-6 md:p-8">
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  {/* Service Name */}
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text font-bold text-gray-700 flex items-center gap-2">
                        <FaTag />
                        Service Name
                      </span>
                    </label>
                    <input
                      type="text"
                      className={`input input-bordered w-full focus:ring-2 focus:ring-primary focus:border-transparent transition-all ${
                        errors.serviceName ? "input-error" : ""
                      }`}
                      placeholder="Complete Home Makeover Package"
                      {...register("serviceName", {
                        required: "Service name is required",
                        minLength: {
                          value: 5,
                          message: "Name must be at least 5 characters",
                        },
                      })}
                    />
                    {errors.serviceName && (
                      <div className="text-error text-sm mt-2 flex items-center gap-1">
                        <FaTimes className="text-xs" />
                        {errors.serviceName.message}
                      </div>
                    )}
                  </div>

                  {/* Category Selection */}
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text font-bold text-gray-700 flex items-center gap-2">
                        <FaListAlt />
                        Service Category
                      </span>
                    </label>
                    <select
                      className={`select select-bordered w-full focus:ring-2 focus:ring-primary focus:border-transparent ${
                        errors.serviceCategory ? "select-error" : ""
                      }`}
                      {...register("serviceCategory", {
                        required: "Please select a category",
                      })}
                    >
                      <option value="">Select Category</option>
                      {serviceCategories.map((cat) => (
                        <option key={cat.value} value={cat.value}>
                          {cat.label}
                        </option>
                      ))}
                    </select>
                    {errors.serviceCategory && (
                      <div className="text-error text-sm mt-2 flex items-center gap-1">
                        <FaTimes className="text-xs" />
                        {errors.serviceCategory.message}
                      </div>
                    )}
                  </div>

                  {/* Description */}
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text font-bold text-gray-700 flex items-center gap-2">
                        <FaFileAlt />
                        Description
                      </span>
                    </label>
                    <textarea
                      className={`textarea textarea-bordered w-full focus:ring-2 focus:ring-primary focus:border-transparent h-32 ${
                        errors.description ? "textarea-error" : ""
                      }`}
                      placeholder="Describe your service in detail. Include what clients can expect, special features, and any requirements."
                      {...register("description", {
                        required: "Description is required",
                        minLength: {
                          value: 50,
                          message: "Description must be at least 50 characters",
                        },
                        maxLength: {
                          value: 1000,
                          message: "Description cannot exceed 1000 characters",
                        },
                      })}
                    />
                    <div className="flex justify-between mt-2">
                      {errors.description ? (
                        <div className="text-error text-sm flex items-center gap-1">
                          <FaTimes className="text-xs" />
                          {errors.description.message}
                        </div>
                      ) : (
                        <div className="text-gray-500 text-sm">
                          {watch("description", "").length || 0}/1000 characters
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Price & Quantity */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="form-control">
                      <label className="label">
                        <span className="label-text font-bold text-gray-700 flex items-center gap-2">
                          <FaDollarSign />
                          Price per unit
                        </span>
                      </label>
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                          $
                        </span>
                        <input
                          type="number"
                          className={`input input-bordered w-full pl-8 focus:ring-2 focus:ring-primary focus:border-transparent ${
                            errors.price ? "input-error" : ""
                          }`}
                          placeholder="0000"
                          step="0.01"
                          {...register("price", {
                            required: "Price is required",
                            min: {
                              value: 1,
                              message: "Price must be at least $1",
                            },
                          })}
                        />
                      </div>
                      {errors.price && (
                        <div className="text-error text-sm mt-2 flex items-center gap-1">
                          <FaTimes className="text-xs" />
                          {errors.price.message}
                        </div>
                      )}
                    </div>

                    <div className="form-control">
                      <label className="label">
                        <span className="label-text font-bold text-gray-700">
                          Square Unit
                        </span>
                      </label>
                      <select
                        className="select w-full"
                        defaultValue="Inch"
                        {...register("unit", { required: true })}
                      >
                        <option value="Inch">Inch</option>
                        <option value="Meter">Meter</option>
                        <option value="Feet">Feet</option>
                      </select>
                    </div>
                  </div>

                  {/* Image Upload */}
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text font-bold text-gray-700 flex items-center gap-2">
                        <FaImage />
                        Service Image
                      </span>
                    </label>

                    {/* Image Preview */}
                    {imagePreview && (
                      <div className="mb-4 relative">
                        <div className="relative w-full h-48 rounded-lg overflow-hidden border-2 border-dashed border-primary/30">
                          <img
                            src={imagePreview}
                            alt="Preview"
                            className="w-full h-full object-cover"
                          />
                          <button
                            type="button"
                            onClick={removeImagePreview}
                            className="absolute top-2 right-2 btn btn-circle btn-sm btn-error"
                          >
                            <FaTimes />
                          </button>
                        </div>
                      </div>
                    )}

                    {/* Upload Progress */}
                    {isUploading && (
                      <div className="mb-4">
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-gray-600">Uploading...</span>
                          <span className="font-semibold">
                            {uploadProgress}%
                          </span>
                        </div>
                        <progress
                          className="progress progress-primary w-full"
                          value={uploadProgress}
                          max="100"
                        />
                      </div>
                    )}

                    {/* File Upload */}
                    <label
                      className={`flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer transition-all hover:border-primary hover:bg-primary/5 ${
                        imagePreview ? "hidden" : ""
                      } ${errors.image ? "border-error" : "border-gray-300"}`}
                    >
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <FaUpload className="w-10 h-10 mb-3 text-gray-400" />
                        <p className="mb-2 text-sm text-gray-500">
                          <span className="font-semibold">Click to upload</span>{" "}
                          or drag and drop
                        </p>
                        <p className="text-xs text-gray-500">
                          PNG, JPG, WEBP (MAX. 5MB)
                        </p>
                      </div>
                      <input
                        type="file"
                        className="hidden"
                        accept="image/*"
                        ref={fileInputRef}
                        {...register("image", {
                          required: !imagePreview && "Please upload an image",
                        })}
                        onChange={handleImageUpload}
                      />
                    </label>
                    {errors.image && !imagePreview && (
                      <div className="text-error text-sm mt-2 flex items-center gap-1">
                        <FaTimes className="text-xs" />
                        {errors.image.message}
                      </div>
                    )}
                  </div>

                  {/* Submit Button */}
                  <div className="form-control pt-6">
                    <button
                      type="submit"
                      disabled={isSubmitting || isUploading}
                      className={`btn btn-primary btn-lg w-full transition-all hover:scale-[1.02] ${
                        isSubmitting ? "loading" : ""
                      }`}
                    >
                      {isSubmitting ? (
                        <>
                          <FaSpinner className="animate-spin mr-2" />
                          Adding Service...
                        </>
                      ) : (
                        <>
                          <FaPlus className="mr-2" />
                          Publish Service
                        </>
                      )}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>

          {/* Right Column - Preview */}
          <div>
            <div className="card bg-white shadow-2xl rounded-2xl overflow-hidden border border-gray-100 sticky top-8">
              <div className="card-body p-6 md:p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-6 pb-4 border-b">
                  Service Preview
                </h3>

                {/* Preview Card */}
                <div className="bg-gradient-to-br from-gray-50 to-white rounded-xl border border-gray-200 overflow-hidden">
                  {/* Image Preview */}
                  <div className="h-48 bg-gradient-to-r from-primary/20 to-secondary/20 flex items-center justify-center overflow-hidden">
                    {imagePreview ? (
                      <img
                        src={imagePreview}
                        alt="Service Preview"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="text-center text-gray-400">
                        <FaImage className="w-16 h-16 mx-auto mb-4" />
                        <p>Upload image to preview</p>
                      </div>
                    )}
                  </div>

                  {/* Preview Content */}
                  <div className="p-6">
                    {serviceName ? (
                      <h4 className="text-xl font-bold text-gray-900 mb-2">
                        {serviceName}
                      </h4>
                    ) : (
                      <div className="h-6 bg-gray-200 rounded animate-pulse mb-2"></div>
                    )}

                    {category && (
                      <div className="mb-4">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-semibold ${
                            serviceCategories.find((c) => c.value === category)
                              ?.color || "bg-gray-100 text-gray-800"
                          }`}
                        >
                          {serviceCategories
                            .find((c) => c.value === category)
                            ?.label.split(" ")[1] || "Category"}
                        </span>
                      </div>
                    )}

                    {description ? (
                      <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                        {description}
                      </p>
                    ) : (
                      <div className="space-y-2 mb-4">
                        <div className="h-3 bg-gray-200 rounded animate-pulse"></div>
                        <div className="h-3 bg-gray-200 rounded animate-pulse"></div>
                        <div className="h-3 bg-gray-200 rounded animate-pulse w-3/4"></div>
                      </div>
                    )}

                    <div className="flex justify-between items-center pt-4 border-t border-gray-200">
                      {price ? (
                        <div>
                          <span className="text-sm text-gray-500">
                            Starting from
                          </span>
                          <p className="text-2xl font-bold text-primary">
                            ${parseFloat(price).toLocaleString()}
                          </p>
                        </div>
                      ) : (
                        <div>
                          <div className="h-4 bg-gray-200 rounded animate-pulse w-24 mb-1"></div>
                          <div className="h-8 bg-gray-200 rounded animate-pulse w-20"></div>
                        </div>
                      )}

                      <div className="text-right">
                        <span className="text-sm text-gray-500 block">
                          Square Unit
                        </span>
                        {watch("unit") ? (
                          <p className="font-semibold">
                            {watch("unit")} per square
                          </p>
                        ) : (
                          <div className="h-6 bg-gray-200 rounded animate-pulse w-16 inline-block"></div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Tips Section */}
                <div className="mt-8 p-4 bg-blue-50 rounded-lg border border-blue-100">
                  <h4 className="font-bold text-blue-800 mb-2 flex items-center gap-2">
                    <FaCheckCircle />
                    Tips for Better Listings
                  </h4>
                  <ul className="text-sm text-blue-700 space-y-1">
                    <li>• Use high-quality, professional images</li>
                    <li>• Be specific about what's included</li>
                    <li>• Mention any special requirements</li>
                    <li>• Set a competitive price based on market</li>
                    <li>• Keep description clear and engaging</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddService;
