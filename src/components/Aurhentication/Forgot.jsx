import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { FaEnvelope, FaArrowLeft, FaCheckCircle, FaArrowRight, FaLock } from 'react-icons/fa';

const Forgot = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!email.trim()) {
      setError('Email is required');
      return;
    }
    
    if (!/\S+@\S+\.\S+/.test(email)) {
      setError('Please enter a valid email address');
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      console.log('Password reset requested for:', email);
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-base-100 via-base-100 to-primary/10 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <div className="card bg-base-100 shadow-2xl">
          <div className="card-body p-6 lg:p-8">
            
            {/* Back Button */}
            <div className="mb-4">
              <button
                onClick={() => navigate(-1)}
                className="btn btn-ghost btn-sm gap-2"
              >
                <FaArrowLeft />
                Back
              </button>
            </div>

            {!isSubmitted ? (
              <>
                <div className="text-center mb-8">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 text-primary mb-4">
                    <FaLock className="text-2xl" />
                  </div>
                  <h1 className="text-3xl font-bold mb-2">Forgot Password</h1>
                  <p className="opacity-80">
                    Enter your email address and we'll send you a link to reset your password.
                  </p>
                </div>

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
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        setError('');
                      }}
                      placeholder="you@example.com"
                      className={`input input-bordered w-full ${error ? 'input-error' : ''}`}
                    />
                    {error && (
                      <label className="label">
                        <span className="label-text-alt text-error">{error}</span>
                      </label>
                    )}
                  </div>

                  {/* Submit Button */}
                  <div className="form-control mt-8">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className={`btn btn-primary w-full btn-lg ${isSubmitting ? 'loading' : ''}`}
                    >
                      {isSubmitting ? 'Sending...' : (
                        <>
                          Send Reset Link
                          <FaArrowRight className="ml-2 " />
                        </>
                      )}
                    </button>
                  </div>
                </form>

                {/* Login Link */}
                <div className="text-center mt-6">
                  <p className="opacity-80">
                    Remember your password?{' '}
                    <Link to="/login" className="link link-primary font-semibold">
                      Sign In
                    </Link>
                  </p>
                </div>
              </>
            ) : (
              /* Success Message */
              <div className="text-center py-8">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 text-green-600 mb-4">
                  <FaCheckCircle className="text-2xl" />
                </div>
                <h2 className="text-2xl font-bold mb-4">Check Your Email</h2>
                <p className="mb-6">
                  We've sent a password reset link to <strong>{email}</strong>. 
                  Please check your inbox and follow the instructions.
                </p>
                <div className="space-y-4">
                  <button
                    onClick={() => navigate('/login')}
                    className="btn btn-primary w-full gap-2"
                  >
                    Back to Login
                  </button>
                  <p className="text-sm opacity-70">
                    Didn't receive the email?{' '}
                    <button
                      onClick={() => setIsSubmitted(false)}
                      className="link link-primary"
                    >
                      Click to resend
                    </button>
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Forgot;