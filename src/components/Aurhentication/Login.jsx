import React, { useState, useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router";
import {
  FaEnvelope,
  FaLock,
  FaEye,
  FaEyeSlash,
  FaGoogle,
  FaArrowRight,
} from "react-icons/fa";
import { AuthContext } from "../../providers/AuthContext";
import { useForm } from "react-hook-form";
import { saveOrUpdateUser } from "../../utils";

const Login = () => {
  const navigate = useNavigate();
  const { userLogin, googleSignIn } = useContext(AuthContext);

  const [showPassword, setShowPassword] = useState(false);

  // React Hook Form setup
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
    setError,
  } = useForm();

  // Remember Me check
  const rememberMeValue = watch("rememberMe");

  // Submit Handler
  const onSubmit = async (data) => {
    try {
      const { email, password } = data;

      const { user } = await userLogin(email, password);
      await saveOrUpdateUser({
        name: user?.displayName,
        email: user?.email,
        imageURL: user?.photoURL,
      });
      // Save remember me
      if (rememberMeValue) {
        localStorage.setItem("rememberMe", "true");
      } else {
        localStorage.removeItem("rememberMe");
      }

      alert("Login successful!");
      navigate("/dashboard");
    } catch (error) {
      setError("general", {
        type: "manual",
        message: "Invalid email or password",
      });

      alert("Login failed: " + error.message);
    }
  };

  // Google Login
  const handleSocialLogin = async () => {
    try {
      const { user } = await googleSignIn();
      await saveOrUpdateUser({
        name: user?.displayName,
        email: user?.email,
        imageURL: user?.photoURL,
      });
      navigate("/dashboard");
    } catch (error) {
      alert(error.message);
    }
  };

  // Auto detect remember me
  useEffect(() => {
    const remembered = localStorage.getItem("rememberMe");
    if (remembered === "true") {
      console.log("Remember Me enabled previously");
    }
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-base-100 via-base-100 to-primary/10 flex items-center justify-center p-4">
      <div className="max-w-4xl w-140 items-center">
        <div className="card bg-base-100 shadow-2xl">
          <div className="card-body p-6 lg:p-8">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold mb-2">Sign In</h1>
              <p className="opacity-80">Welcome back to StyleDecor</p>
            </div>

            {/* General error */}
            {errors.general && (
              <div className="alert alert-error mb-4">
                <span>{errors.general.message}</span>
              </div>
            )}

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
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
                  className={`input w-full input-bordered ${
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
                  <p className="label-text-alt text-error">
                    {errors.email.message}
                  </p>
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
                    placeholder="Enter your password"
                    className={`input input-bordered w-full ${
                      errors.password ? "input-error" : ""
                    }`}
                    {...register("password", {
                      required: "Password is required",
                      minLength: {
                        value: 6,
                        message: "Minimum 6 characters",
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
                  <p className="label-text-alt text-error">
                    {errors.password.message}
                  </p>
                )}

                {/* Remember Me + Forgot password */}
                <div className="flex justify-between items-center mt-2">
                  <label className="label cursor-pointer gap-2">
                    <input
                      type="checkbox"
                      className="checkbox checkbox-primary checkbox-sm"
                      {...register("rememberMe")}
                    />
                    <span className="label-text">Remember me</span>
                  </label>

                  <Link
                    to="/forgot-password"
                    className="link link-primary text-sm"
                  >
                    Forgot password?
                  </Link>
                </div>
              </div>

              {/* Submit */}
              <div className="form-control mt-8">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`btn w-full btn-primary btn-lg ${
                    isSubmitting ? "loading" : ""
                  }`}
                >
                  {isSubmitting ? (
                    "Signing In..."
                  ) : (
                    <>
                      Sign In <FaArrowRight className="ml-2" />
                    </>
                  )}
                </button>
              </div>

              {/* Social login */}
              <div className="divider">OR CONTINUE WITH</div>

              <div className="">
                <button
                  type="button"
                  onClick={handleSocialLogin}
                  className="btn btn-outline gap-2 w-full"
                >
                  <FaGoogle />
                  Google
                </button>
              </div>

              {/* Signup link */}
              <div className="text-center mt-6">
                <p className="opacity-80">
                  Don't have an account?{" "}
                  <Link
                    to="/signup"
                    className="link link-primary font-semibold"
                  >
                    Create Account
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

export default Login;
