import React, { useEffect, useState } from 'react';
import { Eye, EyeOff, Home, Mail, Lock, ArrowRight, Github } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

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

  // Validation and handlers remain the same
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

  const handleChange = (e) => {
    const { name, value, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'rememberMe' ? checked : value,
    }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

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
        setTimeout(() => window.location.href ="/dashboard", 1000);
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

  const handleSocialLogin = async (provider, userInfo) => {
    setIsLoading(true);
    setErrors({});
    setSuccessMessage('');

    let userObj;
    try {
      if (provider === 'Google') {
        userObj = jwtDecode(userInfo.credential);
        console.log(userObj);
      }

      const response = await axios.post(
        `${import.meta.env.VITE_LOCAL}auth/google-auth-token?Email=${userObj.email}`,
        {}
      );

      if (response.status === 200) {
        localStorage.setItem('userData', JSON.stringify(response.data));
        setSuccessMessage('Login successful! Redirecting to Dashboard...');
        setTimeout(() => window.location.href ="/dashboard", 1000);
      }
    } catch (error) {
      if (error.response) {
        if (error.response.status === 404) {
          setErrors({ submit: `No Account Associated with This Email ${userObj.email}` });
        } else {
          setErrors({ submit: `${provider} login failed. Please try again.` });
        }
      } else {
        setErrors({ submit: 'An unexpected error occurred. Please try again.' });
        console.error(error);
      }
    } finally {
      setIsLoading(false);
    }
  };

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

  const handleForgotPassword = () => navigate('/forgot-password');
  const handleSignUp = () => navigate('/signup');
  const handleHomeClick = () => navigate('/');

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-orange-100 flex items-center justify-center p-2">
      <button
        onClick={handleHomeClick}
        className="absolute top-6 left-6 p-2 rounded-full bg-white shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-300"
      >
        <Home className="w-5 h-5 text-orange-600" />
      </button>

      <div className="bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col md:flex-row w-full max-w-4xl transform hover:shadow-3xl transition-all duration-500">
        {/* Left Side */}
        <div className="relative bg-gradient-to-br from-orange-600 to-orange-500 text-white p-8 flex flex-col justify-center items-center md:w-1/2 overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div
              className="absolute inset-0 bg-repeat bg-center"
              style={{
                backgroundImage: `url("https://www.rentpay.expert/public/images/avtar.webp")`,
              }}
            />
          </div>

          <div className="relative z-10 text-center">
            <h1 className="text-4xl font-bold mb-6">Welcome Back!</h1>
            <p className="text-lg mb-8 opacity-90">
              Access your Lala Rentals account and discover amazing properties
            </p>
            <img
              src="https://www.rentpay.expert/public/images/avtar.webp"
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
                  } focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all pl-10`}
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
                  } focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all pl-10`}
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
                  className="w-4 h-4 text-orange-600 border-gray-300 rounded focus:ring-orange-500"
                />
                <span className="text-gray-600">Remember me</span>
              </label>
              <button
                type="button"
                onClick={handleForgotPassword}
                className="text-sm text-orange-600 hover:text-orange-700 font-medium"
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
              className="w-full bg-gradient-to-r from-orange-600 to-orange-500 text-white py-3 rounded-lg font-semibold hover:from-orange-700 hover:to-orange-600 transition-all duration-300 flex items-center justify-center space-x-2 group disabled:opacity-70"
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

            <div className="grid grid-cols-2 gap-24">
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
                className="text-orange-600 hover:text-orange-700 font-medium"
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