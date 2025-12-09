import React, { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {
  FaUser,
  FaEnvelope,
  FaPhone,
  FaCamera,
  FaUserTag,
  FaCheckCircle,
  FaEdit,
  FaSave,
  FaTimes,
  FaShieldAlt,
  FaStar,
  FaUserEdit
} from "react-icons/fa";
import { AuthContext } from "../providers/AuthContext";

const ProfilePage = () => {
  const { user , updateNamePhoto } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  // React Hook Form
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors, isDirty },
  } = useForm();

  const photoURL = watch("photoURL");

  // Available roles
  const roles = [
    { value: "user", label: "Regular User", icon: "👤", color: "bg-blue-100 text-blue-800" },
    { value: "premium", label: "Premium User", icon: "⭐", color: "bg-yellow-100 text-yellow-800" },
    { value: "designer", label: "Designer", icon: "🎨", color: "bg-purple-100 text-purple-800" },
    { value: "admin", label: "Administrator", icon: "🛡️", color: "bg-red-100 text-red-800" },
  ];

  // Load existing user data from Firestore
  useEffect(() => {
    const loadUserData = async () => {
      if (user) {
        try {
        //   if (userSnap.exists()) {
        //     const data = userSnap.data();
        //     setUserData(data);
        //     reset({
        //       name: user.displayName || "",
        //       email: user.email || "",
        //       phone: data.phone || "",
        //       photoURL: user.photoURL || "",
        //       role: data.role || "user",
        //       bio: data.bio || "",
        //       website: data.website || "",
        //     });
        //     setPreviewImage(user.photoURL || "");
        //   } else {
        //     // Create user document if doesn't exist
        //     const defaultData = {
        //       name: user.displayName || "",
        //       email: user.email || "",
        //       phone: "",
        //       role: "user",
        //       bio: "",
        //       website: "",
        //       createdAt: new Date().toISOString(),
        //     };
        //     await setDoc(userRef, defaultData);
        //     setUserData(defaultData);
        //     reset(defaultData);
        //   }
        } catch (error) {
          console.error("Error loading user data:", error);
        } finally {
          setLoading(false);
        }
      }
    };

    loadUserData();
  }, [user, reset]);

  // Handle image preview
  useEffect(() => {
    if (photoURL && photoURL.startsWith("http")) {
      setPreviewImage(photoURL);
    }
  }, [photoURL]);

  // Simulate image upload
  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    setIsUploading(true);
    setUploadProgress(0);

    // Simulate upload progress
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsUploading(false);
          return 100;
        }
        return prev + 10;
      });
    }, 100);

    // In real app, upload to Firebase Storage
    setTimeout(() => {
      const reader = new FileReader();
      reader.onloadend = () => {
        const imageUrl = reader.result;
        setPreviewImage(imageUrl);
        reset({ ...watch(), photoURL: imageUrl });
        clearInterval(interval);
        setIsUploading(false);
        setUploadProgress(100);
      };
      reader.readAsDataURL(file);
    }, 1000);
  };

  // Handle Profile Update
  const onSubmit = async (data) => {
    try {
      // Update Firebase Auth profile
      await updateNamePhoto(user, {
        displayName: data.name,
        photoURL: data.photoURL,
      });

      // Update email if changed
    //   if (data.email !== user.email) {
    //     await updateEmail(user, data.email);
    //   }

      // Update Firestore user document
    //   const userRef = doc(db, "users", user.uid);
    //   await updateDoc(userRef, {
    //     name: data.name,
    //     phone: data.phone,
    //     role: data.role,
    //     bio: data.bio,
    //     website: data.website,
    //     updatedAt: new Date().toISOString(),
    //   });

      // Update user data state
      setUserData(prev => ({ ...prev, ...data }));

      alert("✅ Profile Updated Successfully!");
      setIsEditing(false);
    } catch (error) {
      console.error("Update failed:", error);
      alert(`❌ Profile update failed: ${error.message}`);
    }
  };

  const getRoleBadge = (roleValue) => {
    const role = roles.find(r => r.value === roleValue) || roles[0];
    return (
      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${role.color} flex items-center gap-2`}>
        <span>{role.icon}</span>
        {role.label}
      </span>
    );
  };

  if (loading || !user) {
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
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">My Profile</h1>
          <p className="text-gray-600">Manage your personal information and preferences</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Profile Card */}
          <div className="lg:col-span-1">
            <div className="card bg-base-100 shadow-xl sticky top-6">
              <div className="card-body items-center text-center">
                {/* Avatar Section */}
                <div className="relative mb-4">
                  <div className="avatar">
                    <div className="w-40 h-40 rounded-full ring-4 ring-primary ring-offset-4 ring-offset-base-100">
                      <img
                        src={previewImage || user?.photoURL || "https://i.ibb.co/0jqHpnp/default-avatar.png"}
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

                {/* Upload Progress */}
                {isUploading && (
                  <div className="w-full mb-4">
                    <div className="flex justify-between text-xs mb-1">
                      <span>Uploading...</span>
                      <span>{uploadProgress}%</span>
                    </div>
                    <progress
                      className="progress progress-primary w-full"
                      value={uploadProgress}
                      max="100"
                    ></progress>
                  </div>
                )}

                {/* User Info */}
                <h2 className="text-2xl font-bold mt-2">{user.displayName || "Anonymous"}</h2>
                <p className="text-gray-500 flex items-center gap-2 mt-1">
                  <FaEnvelope className="text-sm" />
                  {user.email}
                </p>
                
                {/* Role Badge */}
                <div className="mt-4">
                  {getRoleBadge(userData?.role || "user")}
                </div>

                {/* Member Since */}
                <div className="mt-6 pt-6 border-t border-gray-200 w-full">
                  <p className="text-sm text-gray-500">Member since</p>
                  <p className="font-semibold">
                    {new Date(user.metadata.creationTime).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </p>
                </div>

                {/* Edit Toggle */}
                <button
                  onClick={() => setIsEditing(!isEditing)}
                  className={`btn w-full mt-6 ${isEditing ? 'btn-outline' : 'btn-primary'}`}
                >
                  {isEditing ? (
                    <>
                      <FaTimes className="mr-2" />
                      Cancel Editing
                    </>
                  ) : (
                    <>
                      <FaEdit className="mr-2" />
                      Edit Profile
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Right Column - Form */}
          <div className="lg:col-span-2">
            <div className="card bg-base-100 shadow-xl">
              <div className="card-body">
                {isEditing ? (
                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    {/* Form Header */}
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="text-2xl font-bold flex items-center gap-2">
                        <FaUserEdit />
                        Edit Profile Information
                      </h3>
                      {isDirty && (
                        <span className="badge badge-warning badge-lg">Unsaved Changes</span>
                      )}
                    </div>

                    {/* Name & Role */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="label font-semibold">
                          <span className="flex items-center gap-2">
                            <FaUser />
                            Full Name
                          </span>
                        </label>
                        <input
                          type="text"
                          placeholder="Enter your name"
                          {...register("name", { 
                            required: "Name is required",
                            minLength: {
                              value: 2,
                              message: "Name must be at least 2 characters"
                            }
                          })}
                          className="input input-bordered w-full"
                        />
                        {errors.name && (
                          <p className="text-error text-sm mt-1">{errors.name.message}</p>
                        )}
                      </div>

                      <div>
                        <label className="label font-semibold">
                          <span className="flex items-center gap-2">
                            <FaUserTag />
                            User Role
                          </span>
                        </label>
                        <select
                          {...register("role")}
                          className="select select-bordered w-full"
                        >
                          {roles.map(role => (
                            <option key={role.value} value={role.value}>
                              {role.icon} {role.label}
                            </option>
                          ))}
                        </select>
                        <p className="text-xs text-gray-500 mt-2">
                          Role determines your access level and features
                        </p>
                      </div>
                    </div>

                    {/* Email */}
                    <div>
                      <label className="label font-semibold">
                        <span className="flex items-center gap-2">
                          <FaEnvelope />
                          Email Address
                        </span>
                      </label>
                      <input
                        type="email"
                        placeholder="you@example.com"
                        {...register("email", { 
                          required: "Email is required",
                          pattern: {
                            value: /\S+@\S+\.\S+/,
                            message: "Invalid email address"
                          }
                        })}
                        className="input input-bordered w-full"
                      />
                      {errors.email && (
                        <p className="text-error text-sm mt-1">{errors.email.message}</p>
                      )}
                    </div>

                    {/* Phone & Website */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="label font-semibold">
                          <span className="flex items-center gap-2">
                            <FaPhone />
                            Phone Number
                          </span>
                        </label>
                        <input
                          type="tel"
                          placeholder="+1 (123) 456-7890"
                          {...register("phone", {
                            pattern: {
                              value: /^[+]?[0-9\s\-()]+$/,
                              message: "Invalid phone number"
                            }
                          })}
                          className="input input-bordered w-full"
                        />
                        {errors.phone && (
                          <p className="text-error text-sm mt-1">{errors.phone.message}</p>
                        )}
                      </div>

                      <div>
                        <label className="label font-semibold">
                          <span className="flex items-center gap-2">
                            <FaStar />
                            Website
                          </span>
                        </label>
                        <input
                          type="url"
                          placeholder="https://yourwebsite.com"
                          {...register("website", {
                            pattern: {
                              value: /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/,
                              message: "Invalid URL"
                            }
                          })}
                          className="input input-bordered w-full"
                        />
                      </div>
                    </div>

                    {/* Bio */}
                    <div>
                      <label className="label font-semibold">
                        <span className="flex items-center gap-2">
                          <FaUserEdit />
                          Bio
                        </span>
                      </label>
                      <textarea
                        placeholder="Tell us about yourself..."
                        {...register("bio", {
                          maxLength: {
                            value: 500,
                            message: "Bio cannot exceed 500 characters"
                          }
                        })}
                        className="textarea textarea-bordered w-full h-32"
                        rows="4"
                      />
                      <div className="flex justify-between mt-1">
                        {errors.bio && (
                          <p className="text-error text-sm">{errors.bio.message}</p>
                        )}
                        <p className="text-xs text-gray-500 ml-auto">
                          {watch("bio")?.length || 0}/500 characters
                        </p>
                      </div>
                    </div>

                    {/* Photo URL */}
                    <div>
                      <label className="label font-semibold">
                        <span className="flex items-center gap-2">
                          <FaCamera />
                          Profile Photo URL
                        </span>
                      </label>
                      <input
                        type="text"
                        placeholder="Enter image URL or upload above"
                        {...register("photoURL", {
                          pattern: {
                            value: /^(https?:\/\/.*\.(?:png|jpg|jpeg|gif|webp))$/,
                            message: "Must be a valid image URL"
                          }
                        })}
                        className="input input-bordered w-full"
                      />
                      {errors.photoURL && (
                        <p className="text-error text-sm mt-1">{errors.photoURL.message}</p>
                      )}
                      <p className="text-xs text-gray-500 mt-2">
                        Supports: .png, .jpg, .jpeg, .gif, .webp
                      </p>
                    </div>

                    {/* Submit Buttons */}
                    <div className="flex gap-4 pt-6 border-t border-gray-200">
                      <button
                        type="submit"
                        className="btn btn-primary flex-1 gap-2"
                        disabled={isUploading}
                      >
                        <FaSave />
                        Save Changes
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
                  /* Read-only View */
                  <div className="space-y-6">
                    <h3 className="text-2xl font-bold mb-6">Profile Information</h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <h4 className="font-semibold text-gray-500">Full Name</h4>
                        <p className="text-lg">{userData?.name || "Not set"}</p>
                      </div>
                      
                      <div className="space-y-2">
                        <h4 className="font-semibold text-gray-500">Role</h4>
                        <div>{getRoleBadge(userData?.role || "user")}</div>
                      </div>
                      
                      <div className="space-y-2">
                        <h4 className="font-semibold text-gray-500">Email</h4>
                        <p className="text-lg">{user.email}</p>
                      </div>
                      
                      <div className="space-y-2">
                        <h4 className="font-semibold text-gray-500">Phone</h4>
                        <p className="text-lg">{userData?.phone || "Not provided"}</p>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <h4 className="font-semibold text-gray-500">Bio</h4>
                      <p className="text-lg">{userData?.bio || "No bio provided"}</p>
                    </div>
                    
                    <div className="space-y-2">
                      <h4 className="font-semibold text-gray-500">Website</h4>
                      {userData?.website ? (
                        <a 
                          href={userData.website} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="link link-primary text-lg"
                        >
                          {userData.website}
                        </a>
                      ) : (
                        <p className="text-lg">No website</p>
                      )}
                    </div>
                    
                    <div className="pt-6 border-t border-gray-200">
                      <h4 className="font-semibold text-gray-500 mb-2">Account Status</h4>
                      <div className="flex items-center gap-2">
                        <FaCheckCircle className="text-green-500" />
                        <span>Email Verified: {user.emailVerified ? "Yes" : "No"}</span>
                      </div>
                      <div className="flex items-center gap-2 mt-2">
                        <FaShieldAlt className="text-blue-500" />
                        <span>Last Login: {new Date(user.metadata.lastSignInTime).toLocaleDateString()}</span>
                      </div>
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