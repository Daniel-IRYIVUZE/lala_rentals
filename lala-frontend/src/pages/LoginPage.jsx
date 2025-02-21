import React, { useEffect, useState } from 'react';
import { Eye, EyeOff, Home, Mail, Lock, ArrowRight, Github } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode'; // For decoding Google JWT

const LoginPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState('');

  // Validate form inputs
  const validateForm = () => {
    const newErrors = {};
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    return newErrors;
  };

  // Handle input changes
  const handleChange = (e) => {
    const { name, value, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'rememberMe' ? checked : value,
    }));
    // Clear errors when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validateForm();

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsLoading(true);
    setErrors({});
    setSuccessMessage('');

    try {
      const response = await axios.post(`${import.meta.env.VITE_LOCAL}auth/login`, {
        email: formData.email,
        password: formData.password,
      });

      if (response.status === 200) {
        localStorage.setItem('userData', JSON.stringify(response.data));
        setSuccessMessage('Login successful! Redirecting to Dashboard...');
        setTimeout(() => window.location.href ="/dashboard", 1000);// Redirect after 2 seconds
      }
    } catch (error) {
      if (error.response) {
        setErrors({ submit: error.response.data.detail || 'Login failed. Please try again.' });
      } else {
        setErrors({ submit: 'An unexpected error occurred. Please try again.' });
      }
    } finally {
      setIsLoading(false);
    }
  };

 // Handle social login (Google)
const handleSocialLogin = async (provider, userInfo) => {
  setIsLoading(true);
  setErrors({});
  setSuccessMessage('');

  let userObj;
  try {
    if (provider === 'Google') {
      // Decode Google token to extract user information
      userObj = jwtDecode(userInfo.credential);
      console.log(userObj);  // To inspect the decoded Google user object
    }

    // Send the Google email to your backend to authenticate
    const response = await axios.post(
      `${import.meta.env.VITE_LOCAL}auth/google-auth-token?Email=${userObj.email}`,
      {}
    );

    // Check if the response is successful
    if (response.status === 200) {
      localStorage.setItem('userData', JSON.stringify(response.data));  // Save user data to local storage
      setSuccessMessage('Login successful! Redirecting to Dashboard...');
      setTimeout(() => window.location.href ="/dashboard", 1000);  // Redirect after 1 second
    }
  } catch (error) {
    // Handle errors appropriately
    if (error.response) {
      if (error.response.status === 404) {
        // Handle 404 error
        setErrors({ submit: `no Account Assoicated with This Email ${userObj.email}` });
      } else {
        // Handle other errors
        setErrors({ submit: `${provider} login failed. Please try again.` });
      }
    } else {
      setErrors({ submit: 'An unexpected error occurred. Please try again.' });
      console.error(error);  // Log any unexpected errors
    }
  } finally {
    setIsLoading(false);
  }
};

  // Initialize Google Auth
  useEffect(() => {
    const initializeGoogleAuth = () => {
      if (window.google?.accounts?.id) {
        window.google.accounts.id.initialize({
          client_id: import.meta.env.VITE_CLIENT_ID,
          callback: (response) => handleSocialLogin('Google', response),
          ux_mode: 'popup',
        });
        window.google.accounts.id.renderButton(document.getElementById('signInDiv'), {
          theme: 'outline',
          size: 'large',
        });
      }
    };
    initializeGoogleAuth();
  }, [navigate]);

  // Navigation handlers
  const handleForgotPassword = () => navigate('/forgot-password');
  const handleSignUp = () => navigate('/signup');
  const handleHomeClick = () => navigate('/');

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4">
      {/* Home Button */}
      <button
        onClick={handleHomeClick}
        className="absolute top-6 left-6 p-2 rounded-full bg-white shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-300"
      >
        <Home className="w-5 h-5 text-blue-900" />
      </button>

      <div className="bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col md:flex-row w-full max-w-4xl transform hover:shadow-3xl transition-all duration-500">
        {/* Left Side */}
        <div className="relative bg-gradient-to-br from-blue-900 to-blue-800 text-white p-12 flex flex-col justify-center items-center md:w-1/2 overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div
              className="absolute inset-0 bg-repeat bg-center"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M54.627 0l.83.828-1.415 1.415L51.8 0h2.827zM5.373 0l-.83.828L5.96 2.243 8.2 0H5.374zM48.97 0l3.657 3.657-1.414 1.414L46.143 0h2.828zM11.03 0L7.372 3.657 8.787 5.07 13.857 0H11.03zm32.284 0L49.8 6.485 48.384 7.9l-7.9-7.9h2.83zM16.686 0L10.2 6.485 11.616 7.9l7.9-7.9h-2.83zm20.97 0l9.315 9.314-1.414 1.414L34.828 0h2.83zM22.344 0L13.03 9.314l1.414 1.414L25.172 0h-2.83zM32 0l12.142 12.142-1.414 1.414L30 .828 17.272 13.556l-1.414-1.414L28 0h4zM.284 0l28 28-1.414 1.414L0 2.544V0h.284zM0 5.373l25.456 25.455-1.414 1.415L0 8.2V5.374zm0 5.656l22.627 22.627-1.414 1.414L0 13.86v-2.83zm0 5.656l19.799 19.8-1.414 1.413L0 19.514v-2.83zm0 5.657l16.97 16.97-1.414 1.415L0 25.172v-2.83zM0 28l14.142 14.142-1.414 1.414L0 30.828V28zm0 5.657L11.314 44.97 9.9 46.386l-9.9-9.9v-2.828zm0 5.657L8.485 47.8 7.07 49.212 0 42.143v-2.83zm0 5.657l5.657 5.657-1.414 1.415L0 47.8v-2.83zm0 5.657l2.828 2.83-1.414 1.413L0 53.456v-2.83zM54.627 60L30 35.373 5.373 60H8.2L30 38.2 51.8 60h2.827zm-5.656 0L30 41.03 11.03 60h2.828L30 43.858 46.142 60h2.83zm-5.656 0L30 46.686 16.686 60h2.83L30 49.515 40.485 60h2.83zm-5.657 0L30 52.343 22.344 60h2.83L30 55.172 34.828 60h2.83zM32 60l-2-2-2 2h4z' fill='%23ffffff' fill-opacity='0.4' fill-rule='evenodd'/%3E%3C/svg%3E")`,
              }}
            />
          </div>

          <div className="relative z-10 text-center">
            <h1 className="text-4xl font-bold mb-6">Welcome Back!</h1>
            <p className="text-lg mb-8 opacity-90">
              Access your Lala Rentals account and discover amazing properties
            </p>
            <img
              src="/api/placeholder/500/300"
              alt="Login"
              className="w-full rounded-xl shadow-lg transform hover:scale-105 transition-all duration-500"
            />
          </div>
        </div>

        {/* Right Side */}
        <div className="p-12 md:w-1/2 bg-white">
          <div className="text-center md:text-left">
            <h2 className="text-3xl font-bold mb-2">Login</h2>
            <p className="text-gray-600 mb-8">Please sign in to continue</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="block text-gray-700 text-sm font-medium">
                Email Address
              </label>
              <div className="relative">
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 rounded-lg border ${
                    errors.email ? 'border-red-500' : 'border-gray-300'
                  } focus:ring-2 focus:ring-blue-900 focus:border-transparent transition-all pl-10`}
                  placeholder="Enter your email"
                />
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-gray-700 text-sm font-medium">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 rounded-lg border ${
                    errors.password ? 'border-red-500' : 'border-gray-300'
                  } focus:ring-2 focus:ring-blue-900 focus:border-transparent transition-all pl-10`}
                  placeholder="Enter your password"
                />
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
                {errors.password && (
                  <p className="text-red-500 text-sm mt-1">{errors.password}</p>
                )}
              </div>
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center space-x-2 text-sm">
                <input
                  type="checkbox"
                  name="rememberMe"
                  checked={formData.rememberMe}
                  onChange={handleChange}
                  className="w-4 h-4 text-blue-900 border-gray-300 rounded focus:ring-blue-500"
                />
                <span className="text-gray-600">Remember me</span>
              </label>
              <button
                type="button"
                onClick={handleForgotPassword}
                className="text-sm text-blue-900 hover:text-blue-800 font-medium"
              >
                Forgot Password?
              </button>
            </div>

            {errors.submit && (
              <p className="text-red-500 text-sm text-center">{errors.submit}</p>
            )}
            {successMessage && (
              <p className="text-green-500 text-sm text-center">{successMessage}</p>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-blue-900 to-blue-700 text-white py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-blue-800 transition-all duration-300 flex items-center justify-center space-x-2 group disabled:opacity-70"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-t-2 border-white rounded-full animate-spin" />
              ) : (
                <>
                  <span>Sign In</span>
                  <ArrowRight className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>

            <div className="relative my-8">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">Or continue with</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div id="signInDiv"></div>
              <button
                type="button"
                onClick={() => handleSocialLogin('GitHub')}
                disabled={isLoading}
                className="flex items-center justify-center px-4 py-2 border border-gray-300 rounded-lg shadow-sm hover:shadow-md transition-all space-x-2 bg-white disabled:opacity-70"
              >
                <Github className="w-6 h-6" />
                <span className="text-gray-700">GitHub</span>
              </button>
            </div>

            <p className="text-center text-gray-600 mt-8">
              Don't have an account?{' '}
              <button
                type="button"
                onClick={handleSignUp}
                className="text-blue-900 hover:text-blue-800 font-medium"
              >
                Sign up
              </button>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;