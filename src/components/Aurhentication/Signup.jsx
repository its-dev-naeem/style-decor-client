import React, { useState, useCallback } from 'react';
import { Link, useNavigate } from 'react-router';
import { FaUser, FaEnvelope, FaLock, FaCamera, FaEye, FaEyeSlash, FaGoogle, FaFacebook, FaArrowRight } from 'react-icons/fa';

const Signup = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    photo: null,
    photoPreview: ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // useCallback used function
  const handleChange = useCallback((e) => {
    const { name, value, files } = e.target;
    
    if (name === 'photo' && files[0]) {
      const file = files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({
          ...prev,
          photo: file,
          photoPreview: reader.result
        }));
      };
      reader.readAsDataURL(file);
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
    
    // Clear error for this field
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  }, [errors]);

  // useCallback validation
  const validateForm = useCallback(() => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    return newErrors;
  }, [formData]);

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      
      console.error('Form Validation Errors:', validationErrors);
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      const response = await new Promise((resolve) => {
        setTimeout(() => {
          resolve({
            success: true,
            data: {
              ...formData,
              password: '[HIDDEN]',
              confirmPassword: '[HIDDEN]'
            }
          });
        }, 1500);
      });
      
      console.log('✅ Signup Successful!');
      console.log('📋 Registration Data:', {
        ...formData,
        password: '[HIDDEN]',
        confirmPassword: '[HIDDEN]',
        photo: formData.photo ? formData.photo.name : 'No photo uploaded'
      });
      
      console.table({
        Name: formData.name,
        Email: formData.email,
        'Password Length': formData.password.length,
        'Photo Uploaded': formData.photo ? 'Yes' : 'No',
        'Photo Size': formData.photo ? `${(formData.photo.size / 1024).toFixed(2)} KB` : 'N/A'
      });
      
      setIsSubmitting(false);
      alert('Registration successful! Redirecting to dashboard...');
      navigate('/dashboard');
      
    } catch (error) {
      console.error('❌ Signup Error:', error);
      setIsSubmitting(false);
      alert('Registration failed. Please try again.');
    }
  }, [formData, validateForm, navigate]);

  const handleSocialLogin = useCallback((provider) => {
    console.log(`🔗 Social Login Attempt: ${provider}`);
    console.log(`📍 Redirecting to ${provider} authentication...`);
    
    alert(`Continue with ${provider}`);
    // Implement social login logic here
  }, []);

  React.useEffect(() => {
    console.log('🔄 Form Data Updated:', {
      name: formData.name,
      email: formData.email,
      passwordLength: formData.password.length,
      passwordsMatch: formData.password === formData.confirmPassword
    });
  }, [formData]);

  // Error state change
  React.useEffect(() => {
    if (Object.keys(errors).length > 0) {
      console.log('⚠️ Current Form Errors:', errors);
    }
  }, [errors]);

  // Toggle password visibility 
  const togglePasswordVisibility = useCallback(() => {
    setShowPassword(prev => !prev);
    console.log(`👁️ Password visibility: ${!showPassword ? 'Visible' : 'Hidden'}`);
  }, [showPassword]);

  const toggleConfirmPasswordVisibility = useCallback(() => {
    setShowConfirmPassword(prev => !prev);
    console.log(`👁️ Confirm Password visibility: ${!showConfirmPassword ? 'Visible' : 'Hidden'}`);
  }, [showConfirmPassword]);

  return (
    <div className="py-30 bg-gradient-to-br from-base-100 via-base-100 to-primary/10 flex items-center justify-center p-4">
      <div className=" items-center w-140 max-w-4xl">

        {/* Form */}
        <div className="card bg-base-100  w-full shadow-2xl">
          <div className="card-body p-6 lg:p-8">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold mb-2">Create Account</h1>
              <p className="opacity-80">Join StyleDecor to start your decoration journey</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              
              {/* Profile Photo Upload */}
              <div className="flex justify-center mb-6">
                <div className="relative">
                  <div className="avatar">
                    <div className="w-24 h-24 rounded-full ring-4 ring-primary ring-offset-4 ring-offset-base-100">
                      {formData.photoPreview ? (
                        <img src={formData.photoPreview} alt="Preview" />
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
                      name="photo"
                      accept="image/*"
                      className="hidden"
                      onChange={handleChange}
                    />
                  </label>
                </div>
              </div>

              {/* Name Field */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text flex items-center gap-2">
                    <FaUser />
                    Full Name
                  </span>
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  className={`input input-bordered w-full ${errors.name ? 'input-error' : ''}`}
                />
                {errors.name && (
                  <label className="label">
                    <span className="label-text-alt text-error">{errors.name}</span>
                  </label>
                )}
              </div>

              {/* Email Field */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text flex items-center gap-2">
                    <FaEnvelope />
                    Email Address
                  </span>
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  className={`input w-full input-bordered ${errors.email ? 'input-error' : ''}`}
                />
                {errors.email && (
                  <label className="label">
                    <span className="label-text-alt text-error">{errors.email}</span>
                  </label>
                )}
              </div>

              {/* Password Field */}
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
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="At least 6 characters"
                    className={`input w-full input-bordered w-full ${errors.password ? 'input-error' : ''}`}
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-3"
                    onClick={togglePasswordVisibility}
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
                {errors.password && (
                  <label className="label">
                    <span className="label-text-alt text-error">{errors.password}</span>
                  </label>
                )}
              </div>

              {/* Confirm Password Field */}
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
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="Re-enter your password"
                    className={`input input-bordered w-full ${errors.confirmPassword ? 'input-error' : ''}`}
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-3"
                    onClick={toggleConfirmPasswordVisibility}
                  >
                    {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
                {errors.confirmPassword && (
                  <label className="label">
                    <span className="label-text-alt text-error">{errors.confirmPassword}</span>
                  </label>
                )}
              </div>

              {/* Terms and Conditions */}
              <div className="form-control">
                <label className="label  cursor-pointer justify-start gap-3">
                  <input type="checkbox" className="checkbox checkbox-primary" required />
                  <span className="label-text text-wrap">
                    I agree to the{' '}
                    <a href="#" className="link link-primary">Terms of Service</a>{' '}
                    and 
                    <a href="#" className="link link-primary">Privacy Policy</a>
                  </span>
                </label>
              </div>

              {/* Submit Button */}
              <div className="form-control mt-8">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`btn btn-primary w-full btn-lg ${isSubmitting ? 'loading' : ''}`}
                >
                  {isSubmitting ? 'Creating Account...' : (
                    <>
                      Create Account
                      <FaArrowRight className="ml-2" />
                    </>
                  )}
                </button>
              </div>

              {/* Social Login */}
              <div className="divider">OR CONTINUE WITH</div>
              
              <div className="flex">
                <button
                  type="button"
                  onClick={() => handleSocialLogin('Google')}
                  className="btn w-full btn-outline gap-2"
                >
                  <FaGoogle />
                  Google
                </button>
              </div>

              {/* Login Link */}
              <div className="text-center mt-6">
                <p className="opacity-80">
                  Already have an account?{' '}
                  <Link to="/login" className="link link-primary font-semibold">
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