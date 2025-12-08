import React, { useState, useCallback, useEffect } from 'react';
import { Link, useNavigate } from 'react-router'; 
import { FaEnvelope, FaLock, FaEye, FaEyeSlash, FaGoogle, FaFacebook, FaArrowRight } from 'react-icons/fa';

const Login = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Optimized handleChange with useCallback
  const handleChange = useCallback((e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    // Clear error when user starts typing in the field
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  }, [errors]);

  // Optimized validateForm with useCallback
  const validateForm = useCallback(() => {
    const newErrors = {};
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    }
    
    return newErrors;
  }, [formData.email, formData.password]);

  // Optimized handleSubmit with useCallback and async/await
  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      console.log('❌ Login Validation Errors:', validationErrors);
      setErrors(validationErrors);
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      console.log('🔐 Login Attempt:', {
        email: formData.email,
        rememberMe: formData.rememberMe,
        timestamp: new Date().toISOString()
      });
      
      // Simulate API call with better error handling
      const response = await new Promise((resolve, reject) => {
        setTimeout(() => {
          // Mock API response - in real app, replace with actual API call
          const mockUser = {
            id: 'user_123',
            email: formData.email,
            name: 'John Doe',
            token: 'mock_jwt_token_xyz123'
          };
          
          if (formData.email && formData.password) {
            console.log('✅ Login Successful - Mock Response:', {
              user: mockUser,
              rememberMe: formData.rememberMe
            });
            
            // Store remember me preference
            if (formData.rememberMe) {
              localStorage.setItem('rememberMe', 'true');
              console.log('💾 Remember Me preference saved to localStorage');
            }
            
            resolve(mockUser);
          } else {
            reject(new Error('Invalid credentials'));
          }
        }, 1500);
      });
      
      setIsSubmitting(false);
      
      // Console log successful login details
      console.log('🚀 Redirecting to dashboard with user:', {
        email: formData.email,
        userId: response.id,
        rememberMeEnabled: formData.rememberMe
      });
      
      // Show success message
      alert('Login successful! Redirecting to dashboard...');
      
      // Navigate to dashboard
      navigate('/dashboard');
      
    } catch (error) {
      console.error('❌ Login Failed:', error.message);
      setIsSubmitting(false);
      
      // Show appropriate error message
      setErrors({
        general: 'Invalid email or password. Please try again.'
      });
      
      alert('Login failed. Please check your credentials.');
    }
  }, [formData, validateForm, navigate]);

  // Optimized social login handler
  const handleSocialLogin = useCallback((provider) => {
    console.log(`🌐 Social Login Initiated: ${provider}`);
    console.log(`🔄 Redirecting to ${provider} OAuth...`);
    
    // Log the social login attempt
    console.table({
      Provider: provider,
      Timestamp: new Date().toLocaleTimeString(),
      Status: 'Redirecting'
    });
    
    alert(`Continue with ${provider}`);
    // Implement actual social login logic here
  }, []);

  // Toggle password visibility with optimization
  const togglePasswordVisibility = useCallback(() => {
    setShowPassword(prev => !prev);
    console.log(`👁️ Password visibility toggled: ${!showPassword ? 'Visible' : 'Hidden'}`);
  }, [showPassword]);

  // Check for remembered user on component mount
  useEffect(() => {
    const remembered = localStorage.getItem('rememberMe');
    if (remembered === 'true') {
      console.log('🔍 Remember Me is enabled from previous session');
      // In real app, you might auto-fill email here
    }
  }, []);

  // Monitor form data changes for debugging
  useEffect(() => {
    if (formData.email || formData.password) {
      console.log('📝 Form Data Updated:', {
        email: formData.email,
        passwordLength: formData.password.length,
        rememberMe: formData.rememberMe
      });
    }
  }, [formData]);

  // Monitor error state changes
  useEffect(() => {
    if (Object.keys(errors).length > 0) {
      console.log('⚠️ Current Form Errors:', errors);
    }
  }, [errors]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-base-100 via-base-100 to-primary/10 flex items-center justify-center p-4">
      <div className="max-w-4xl w-140 items-center">
        
        {/* Login Form */}
        <div className="card bg-base-100 shadow-2xl">
          <div className="card-body p-6 lg:p-8">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold mb-2">Sign In</h1>
              <p className="opacity-80">Welcome back to StyleDecor</p>
            </div>

            {/* Display general errors if any */}
            {errors.general && (
              <div className="alert alert-error mb-4">
                <span>{errors.general}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              
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
                    placeholder="Enter your password"
                    className={`input input-bordered w-full ${errors.password ? 'input-error' : ''}`}
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
                
                {/* Remember Me & Forgot Password */}
                <div className="flex justify-between items-center mt-2">
                  <label className="label cursor-pointer gap-2">
                    <input
                      type="checkbox"
                      name="rememberMe"
                      checked={formData.rememberMe}
                      onChange={handleChange}
                      className="checkbox checkbox-primary checkbox-sm"
                    />
                    <span className="label-text">Remember me</span>
                  </label>
                  
                  <Link to="/forgot-password" className="link link-primary text-sm">
                    Forgot password?
                  </Link>
                </div>
              </div>

              {/* Submit Button */}
              <div className="form-control mt-8">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`btn w-full btn-primary btn-lg ${isSubmitting ? 'loading' : ''}`}
                >
                  {isSubmitting ? 'Signing In...' : (
                    <>
                      Sign In
                      <FaArrowRight className="ml-2" />
                    </>
                  )}
                </button>
              </div>

              {/* Social Login */}
              <div className="divider">OR CONTINUE WITH</div>
              
              <div className="gap-4">
                <button
                  type="button"
                  onClick={() => handleSocialLogin('Google')}
                  className="btn btn-outline gap-2 w-full"
                >
                  <FaGoogle />
                  Google
                </button>
              </div>

              {/* Signup Link */}
              <div className="text-center mt-6">
                <p className="opacity-80">
                  Don't have an account?{' '}
                  <Link to="/signup" className="link link-primary font-semibold">
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