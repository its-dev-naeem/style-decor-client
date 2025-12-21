import React, { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {
  FaUser,
  FaEnvelope,
  FaPhone,
  FaCamera,
  FaCheckCircle,
  FaEdit,
  FaSave,
  FaTimes,
  FaShieldAlt,
  FaStar,
  FaUserEdit,
} from "react-icons/fa";
import { AuthContext } from "../providers/AuthContext";
import { saveOrUpdateUser } from "../utils";
import useRole from "../hooks/useRole";
import axios from "axios";
import toast from "react-hot-toast";

const ProfilePage = () => {
  const { user, updateNamePhoto, updateEmail } = useContext(AuthContext);
  const { role: userRole } = useRole();
  const [isEditing, setIsEditing] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [isUploading, setIsUploading] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors, isDirty },
  } = useForm();

  const photoURL = watch("photoURL");
  const roles = [
    {
      value: "user",
      label: "User",
      icon: "👤",
      color: "bg-blue-100 text-blue-800",
    },
    {
      value: "decorator",
      label: "Decorator",
      icon: "🎨",
      color: "bg-green-100 text-green-800",
    },
    {
      value: "admin",
      label: "Admin",
      icon: "🛡️",
      color: "bg-red-100 text-red-800",
    },
  ];

  const handleAddRequest = async () => {
    const today = new Date();
    const formattedDate = today.toISOString().split("T")[0];

    const requestData = {
      name: user?.displayName,
      email: user?.email,
      photo: user?.photoURL,
      requestDate: formattedDate,
    };
    console.log(requestData);
    try {
      const response = await axios.post(
        "http://localhost:3000/requests",
        requestData
      );
      alert('Your request sent successfully')
      console.log("Data posted successfully:", response.data);
    } catch (error) {
      alert('Your request sent failed')
      console.error("Error posting data:", error);
    }
  };

  useEffect(() => {
    if (user) {
      const initialData = {
        name: user.displayName || "",
        email: user.email || "",
        phone: userRole?.phone || "",
        photoURL: user.photoURL || "",
        role: userRole?.role || "user",
        bio: userRole?.bio || "",
        website: userRole?.website || "",
      };
      reset(initialData);
      setPreviewImage(user.photoURL || "");
    }
  }, [user, userRole, reset]);

  useEffect(() => {
    if (photoURL && photoURL.startsWith("http")) setPreviewImage(photoURL);
  }, [photoURL]);

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    setIsUploading(true);
    const reader = new FileReader();
    reader.onloadend = () => {
      const imageUrl = reader.result;
      setPreviewImage(imageUrl);
      reset({ ...watch(), photoURL: imageUrl });
      setIsUploading(false);
    };
    reader.readAsDataURL(file);
  };

  const onSubmit = async (data) => {
    try {
      if (data.name !== user.displayName || data.photoURL !== user.photoURL) {
        await updateNamePhoto({
          displayName: data.name,
          photoURL: data.photoURL,
        });
      }

      if (data.email && data.email !== user.email) {
        try {
          await updateEmail(data.email);
        } catch (error) {
          console.error("Email update failed:", error);
        }
      }

      await saveOrUpdateUser({
        name: data.name,
        email: user?.email,
        imageURL: data.photoURL,
        phone: data.phone || "",
        role: userRole?.role || "user",
        bio: data.bio || "",
        website: data.website || "",
      });

      alert("✅ Profile Updated Successfully!");
      setIsEditing(false);
    } catch (error) {
      console.error("Update failed:", error);
      alert(`❌ Profile update failed: ${error.message}`);
    }
  };

  const getRoleBadge = (roleValue) => {
    const role = roles.find((r) => r.value === roleValue) || roles[0];
    return (
      <span
        className={`px-3 py-1 rounded-full text-xs font-semibold ${role.color} flex items-center gap-2`}
      >
        <span>{role.icon}</span>
        {role.label}
      </span>
    );
  };

  if (!user || !userRole) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="loading loading-spinner loading-lg text-primary"></div>
          <p className="mt-4 text-gray-600">Loading profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-base-100 via-base-100 to-primary/5 p-4 md:p-6">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">My Profile</h1>
          <p className="text-gray-600">Manage your personal information</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <div className="card bg-base-100 shadow-xl sticky top-6">
              <div className="card-body items-center text-center">
                <div className="relative mb-4">
                  <div className="avatar">
                    <div className="w-40 h-40 rounded-full ring-4 ring-primary ring-offset-4 ring-offset-base-100">
                      <img
                        src={
                          previewImage ||
                          user?.photoURL ||
                          "https://i.ibb.co/0jqHpnp/default-avatar.png"
                        }
                        alt="Profile"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                  {isEditing && (
                    <label className="absolute bottom-4 right-4 btn btn-circle btn-primary btn-sm cursor-pointer shadow-lg">
                      <FaCamera />
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleImageUpload}
                      />
                    </label>
                  )}
                </div>

                {isUploading && (
                  <div className="loading loading-spinner loading-md"></div>
                )}

                <h2 className="text-2xl font-bold mt-2">
                  {user.displayName || "Anonymous"}
                </h2>
                <p className="text-gray-500 flex items-center gap-2 mt-1">
                  <FaEnvelope className="text-sm" /> {user.email}
                </p>

                <div className="mt-4">
                  {getRoleBadge(userRole?.role || "user")}
                </div>

                <div className="mt-6 pt-6 border-t border-gray-200 w-full">
                  <p className="text-sm text-gray-500">Member since</p>
                  <p className="font-semibold">
                    {userRole?.created_at
                      ? new Date(userRole.created_at).toLocaleDateString(
                          "en-US",
                          { year: "numeric", month: "long", day: "numeric" }
                        )
                      : "Recently"}
                  </p>
                </div>

                <button
                  onClick={() => setIsEditing(!isEditing)}
                  className={`btn w-full mt-6 ${
                    isEditing ? "btn-outline" : "btn-primary"
                  }`}
                >
                  {isEditing ? (
                    <>
                      <FaTimes className="mr-2" /> Cancel
                    </>
                  ) : (
                    <>
                      <FaEdit className="mr-2" /> Edit Profile
                    </>
                  )}
                </button>
                {userRole?.role === "user" && (
                  <button
                    className="btn w-full mt-6 btn-primary"
                    onClick={handleAddRequest}
                  >
                    Request for decorator
                  </button>
                )}
              </div>
            </div>
          </div>

          <div className="lg:col-span-2">
            <div className="card bg-base-100 shadow-xl">
              <div className="card-body">
                {isEditing ? (
                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="text-2xl font-bold flex items-center gap-2">
                        <FaUserEdit /> Edit Profile
                      </h3>
                      {isDirty && (
                        <span className="badge badge-warning badge-lg">
                          Unsaved Changes
                        </span>
                      )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="label font-semibold">
                          <span className="flex items-center gap-2">
                            <FaUser /> Full Name
                          </span>
                        </label>
                        <input
                          type="text"
                          placeholder="Enter your name"
                          {...register("name", {
                            required: "Name is required",
                            minLength: {
                              value: 2,
                              message: "Name must be at least 2 characters",
                            },
                          })}
                          className="input input-bordered w-full"
                          defaultValue={user.displayName || ""}
                        />
                        {errors.name && (
                          <p className="text-error text-sm mt-1">
                            {errors.name.message}
                          </p>
                        )}
                      </div>

                      <div>
                        <label className="label font-semibold">
                          <span className="flex items-center gap-2">
                            <FaUserEdit /> User Role
                          </span>
                        </label>
                        <span className="input input-bordered font-bold w-full">
                          {userRole?.role}
                        </span>
                        <p className="text-xs text-gray-500 mt-2">
                          Role determines your access level
                        </p>
                      </div>
                    </div>

                    <div>
                      <label className="label font-semibold">
                        <span className="flex items-center gap-2">
                          <FaEnvelope /> Email
                        </span>
                      </label>
                      <input
                        type="email"
                        placeholder="you@example.com"
                        {...register("email", {
                          required: "Email is required",
                          pattern: {
                            value: /\S+@\S+\.\S+/,
                            message: "Invalid email",
                          },
                        })}
                        className="input input-bordered w-full"
                        defaultValue={user.email || ""}
                      />
                      {errors.email && (
                        <p className="text-error text-sm mt-1">
                          {errors.email.message}
                        </p>
                      )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="label font-semibold">
                          <span className="flex items-center gap-2">
                            <FaPhone /> Phone
                          </span>
                        </label>
                        <input
                          type="tel"
                          placeholder="+1 (123) 456-7890"
                          {...register("phone")}
                          className="input input-bordered w-full"
                          defaultValue={userRole?.phone || ""}
                        />
                      </div>

                      <div>
                        <label className="label font-semibold">
                          <span className="flex items-center gap-2">
                            <FaStar /> Website
                          </span>
                        </label>
                        <input
                          type="url"
                          placeholder="https://yourwebsite.com"
                          {...register("website")}
                          className="input input-bordered w-full"
                          defaultValue={userRole?.website || ""}
                        />
                      </div>
                    </div>

                    <div>
                      <label className="label font-semibold">
                        <span className="flex items-center gap-2">
                          <FaUserEdit /> Bio
                        </span>
                      </label>
                      <textarea
                        placeholder="Tell us about yourself..."
                        {...register("bio", {
                          maxLength: {
                            value: 500,
                            message: "Max 500 characters",
                          },
                        })}
                        className="textarea textarea-bordered w-full h-32"
                        defaultValue={userRole?.bio || ""}
                      />
                      <p className="text-xs text-gray-500 mt-1">
                        {watch("bio")?.length || 0}/500 characters
                      </p>
                    </div>

                    <div>
                      <label className="label font-semibold">
                        <span className="flex items-center gap-2">
                          <FaCamera /> Profile Photo URL
                        </span>
                      </label>
                      <input
                        type="text"
                        placeholder="Enter image URL"
                        {...register("photoURL")}
                        className="input input-bordered w-full"
                        defaultValue={user.photoURL || ""}
                      />
                    </div>

                    <div className="flex gap-4 pt-6 border-t border-gray-200">
                      <button
                        type="submit"
                        className="btn btn-primary flex-1 gap-2"
                        disabled={isUploading}
                      >
                        <FaSave /> Save Changes
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setIsEditing(false);
                          reset();
                        }}
                        className="btn btn-outline"
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                ) : (
                  <div className="space-y-6">
                    <h3 className="text-2xl font-bold mb-6">
                      Profile Information
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-semibold text-gray-500">
                          Full Name
                        </h4>
                        <p className="text-lg">
                          {user.displayName || "Not set"}
                        </p>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-500">Role</h4>
                        {getRoleBadge(userRole?.role || "user")}
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-500">Email</h4>
                        <p className="text-lg">{user.email}</p>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-500">Phone</h4>
                        <p className="text-lg">
                          {userRole?.phone || "Not provided"}
                        </p>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-semibold text-gray-500">Bio</h4>
                      <p className="text-lg">
                        {userRole?.bio || "No bio provided"}
                      </p>
                    </div>

                    <div>
                      <h4 className="font-semibold text-gray-500">Website</h4>
                      {userRole?.website ? (
                        <a
                          href={userRole.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="link link-primary text-lg"
                        >
                          {userRole.website}
                        </a>
                      ) : (
                        <p className="text-lg">No website</p>
                      )}
                    </div>

                    <div className="pt-6 border-t border-gray-200">
                      <h4 className="font-semibold text-gray-500 mb-2">
                        Account Status
                      </h4>
                      <div className="flex items-center gap-2">
                        <FaCheckCircle className="text-green-500" />{" "}
                        <span>
                          Email Verified: {user.emailVerified ? "Yes" : "No"}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 mt-2">
                        <FaShieldAlt className="text-blue-500" />{" "}
                        <span>
                          Member Since:{" "}
                          {userRole?.created_at
                            ? new Date(userRole.created_at).toLocaleDateString()
                            : "Recently"}
                        </span>
                      </div>
                      {userRole?.last_loggedIn && (
                        <div className="flex items-center gap-2 mt-2">
                          <FaShieldAlt className="text-blue-500" />{" "}
                          <span>
                            Last Login:{" "}
                            {new Date(
                              userRole.last_loggedIn
                            ).toLocaleDateString()}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
