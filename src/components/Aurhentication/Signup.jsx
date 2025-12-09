import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router";
import {
  FaUser,
  FaEnvelope,
  FaLock,
  FaCamera,
  FaEye,
  FaEyeSlash,
  FaGoogle,
  FaArrowRight,
} from "react-icons/fa";
import { AuthContext } from "../../providers/AuthContext";
import { useForm } from "react-hook-form";
import { imageUpload } from "../../utils";

const Signup = () => {
  const { createUser, googleSignIn } =
    useContext(AuthContext);

  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [photoPreview, setPhotoPreview] = useState("");
  const [photoFile, setPhotoFile] = useState(null);

  // console.log(user); 

  // React Hook Form setup
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
    setError,
    clearErrors,
  } = useForm();

  const passwordValue = watch("password");

  // Handle photo upload preview
  const handlePhoto = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setPhotoFile(file);

    const reader = new FileReader();
    reader.onloadend = () => {
      setPhotoPreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  // Form Submit
  const onSubmit = async (datas) => {
    if (datas.password !== datas.confirmPassword) {
      setError("confirmPassword", {
        type: "manual",
        message: "Passwords do not match",
      });
      return;
    }

    try {
      const userImage = await imageUpload(photoFile)

      const  displayName = datas.name
      const  photoURL =  userImage || 'https://i.pinimg.com/736x/2f/15/f2/2f15f2e8c688b3120d3d26467b06330c.jpg'

      await createUser(datas.email, datas.password, photoURL, displayName);

      alert("Registration successful!");
      navigate("/dashboard");
    } catch (error) {
      alert("Registration failed: " + error.message);
    }
  };
  // console.log(photoFile);
  // Google Login
  const handleSocialLogin = async () => {
    try {
      await googleSignIn();
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="py-30 bg-gradient-to-br from-base-100 via-base-100 to-primary/10 flex items-center justify-center p-4">
      <div className=" items-center w-140 max-w-4xl">
        <div className="card bg-base-100  w-full shadow-2xl">
          <div className="card-body p-6 lg:p-8">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold mb-2">Create Account</h1>
              <p className="opacity-80">
                Join StyleDecor to start your decoration journey
              </p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {/* Photo Upload */}
              <div className="flex justify-center mb-6">
                <div className="relative">
                  <div className="avatar">
                    <div className="w-24 h-24 rounded-full ring-4 ring-primary ring-offset-4 ring-offset-base-100">
                      {photoPreview ? (
                        <img src={photoPreview} alt="Preview" />
                      ) : (
                        <div className="bg-base-300 w-full h-full rounded-full flex items-center justify-center">
                          <FaUser className="text-4xl opacity-50" />
                        </div>
                      )}
                    </div>
                  </div>
                  <label className="absolute bottom-0 right-0 btn btn-circle btn-primary btn-sm cursor-pointer">
                    <FaCamera />
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      {...register("photo")}
                      onChange={handlePhoto}
                    />
                  </label>
                </div>
              </div>

              {/* Name */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text flex items-center gap-2">
                    <FaUser />
                    Full Name
                  </span>
                </label>
                <input
                  type="text"
                  placeholder="Enter your full name"
                  className={`input input-bordered w-full ${
                    errors.name ? "input-error" : ""
                  }`}
                  {...register("name", {
                    required: "Name is required",
                  })}
                />
                {errors.name && (
                  <p className="text-error text-sm">{errors.name.message}</p>
                )}
              </div>

              {/* Email */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text flex items-center gap-2">
                    <FaEnvelope />
                    Email Address
                  </span>
                </label>
                <input
                  type="email"
                  placeholder="you@example.com"
                  className={`input input-bordered w-full ${
                    errors.email ? "input-error" : ""
                  }`}
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /\S+@\S+\.\S+/,
                      message: "Invalid email format",
                    },
                  })}
                />
                {errors.email && (
                  <p className="text-error text-sm">{errors.email.message}</p>
                )}
              </div>

              {/* Password */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text flex items-center gap-2">
                    <FaLock />
                    Password
                  </span>
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="At least 6 characters"
                    className={`input input-bordered w-full ${
                      errors.password ? "input-error" : ""
                    }`}
                    {...register("password", {
                      required: "Password is required",
                      minLength: {
                        value: 6,
                        message: "Minimum 6 characters",
                      },
                      pattern: {
                        value: /(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])/,
                        message:
                          "Must include uppercase, lowercase & number",
                      },
                    })}
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-3"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-error text-sm">
                    {errors.password.message}
                  </p>
                )}
              </div>

              {/* Confirm Password */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text flex items-center gap-2">
                    <FaLock />
                    Confirm Password
                  </span>
                </label>
                <div className="relative">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Re-enter your password"
                    className={`input input-bordered w-full ${
                      errors.confirmPassword ? "input-error" : ""
                    }`}
                    {...register("confirmPassword", {
                      required: "Please confirm your password",
                      validate: (value) =>
                        value === passwordValue ||
                        "Passwords do not match",
                    })}
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-3"
                    onClick={() =>
                      setShowConfirmPassword(!showConfirmPassword)
                    }
                  >
                    {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
                {errors.confirmPassword && (
                  <p className="text-error text-sm">
                    {errors.confirmPassword.message}
                  </p>
                )}
              </div>

              {/* Terms */}
              <div className="form-control">
                <label className="label cursor-pointer justify-start gap-3">
                  <input
                    type="checkbox"
                    className="checkbox checkbox-primary"
                    required
                  />
                  <span className="label-text text-wrap">
                    I agree to the{" "}
                    <a href="#" className="link link-primary">
                      Terms of Service
                    </a>{" "}
                    and{" "}
                    <a href="#" className="link link-primary">
                      Privacy Policy
                    </a>
                  </span>
                </label>
              </div>

              {/* Submit */}
              <div className="form-control mt-8">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`btn btn-primary w-full btn-lg ${
                    isSubmitting ? "loading" : ""
                  }`}
                >
                  {isSubmitting ? (
                    "Creating Account..."
                  ) : (
                    <>
                      Create Account <FaArrowRight className="ml-2" />
                    </>
                  )}
                </button>
              </div>

              {/* Social Login */}
              <div className="divider">OR CONTINUE WITH</div>
              <div className="flex">
                <button
                  type="button"
                  onClick={handleSocialLogin}
                  className="btn w-full btn-outline gap-2"
                >
                  <FaGoogle /> Google
                </button>
              </div>

              {/* Login Link */}
              <div className="text-center mt-6">
                <p className="opacity-80">
                  Already have an account?{" "}
                  <Link
                    to="/login"
                    className="link link-primary font-semibold"
                  >
                    Sign In
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
