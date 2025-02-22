import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // For redirection
import { 
  Home, User, Building2, Mail, Lock, Phone, Globe, 
  MapPin, FileText, Camera, ChevronRight, ChevronLeft,
  Github
} from 'lucide-react';
import { jwtDecode } from 'jwt-decode';

const SignupPage = () => {
  const [role, setRole] = useState('renter');
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    location: '',
    idNumber: '',
    nationality: '',
    profileImage: null
  });
  const [imagePreview, setImagePreview] = useState(null); // For image preview
  const [errors, setErrors] = useState({}); // For validation errors
  const [apiError, setApiError] = useState(''); // For API errors
  const navigate = useNavigate(); // For redirection
  const handleLogin = () => navigate('/login');
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear errors when user types
    setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const containerVariants = {
    hidden: { opacity: 0, x: -100 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { duration: 0.5 }
    }
  };

  const roleButtonVariants = {
    hover: { scale: 1.05 },
    tap: { scale: 0.95 }
  };

  // Convert image to Base64
  const convertImageToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    });
  };

  // Handle image upload and preview
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const base64 = await convertImageToBase64(file);
      setFormData(prev => ({ ...prev, profileImage: base64 }));
      setIsLoading(true);
      setErrors({});
      setSuccessMessage('');
      setImagePreview(base64); // Set image preview
    }
  };

  // Validate form inputs
  const validateForm = () => {
    const newErrors = {};

    if (!formData.name) newErrors.name = 'Full Name is required';
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
    if (!formData.phone) newErrors.phone = 'Phone Number is required';
    if (!formData.location) newErrors.location = 'Location is required';
    if (!formData.idNumber) newErrors.idNumber = 'ID/Passport Number is required';
    if (!formData.nationality) newErrors.nationality = 'Nationality is required';
    if (!formData.profileImage) newErrors.profileImage = 'Profile Picture is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Return true if no errors
  };

  // Handle form submission
  const RegisterUser = async () => {
    if (!validateForm()) return; // Stop if validation fails

    try {
      const register = await axios.post(`${import.meta.env.VITE_LOCAL}auth/register`, {
        full_name: formData.name,
        email: formData.email,
        password: formData.password,
        phone: formData.phone,
        location: formData.location,
        id_number: formData.idNumber,
        nationality: formData.nationality,
        profile: formData.profileImage, // Send Base64 image
        role: role,
      });

      console.log(register.data);
      if (register.status === 200) {
        alert('Registration successful! Redirecting to login...');
        navigate('/login'); // Redirect to login page
      }
    } catch (error) {
      if (error.response) {
        // Handle backend errors
        setApiError(error.response.data.detail || 'An error occurred during registration.');
      } else {
        setApiError('An unexpected error occurred. Please try again.');
      }
      console.error("Registration Error:", error);
    }
  };
  const [isLoading, setIsLoading] = useState(false);
  const handleHomeClick = () => navigate('/');
  //google
  const handleSocialLogin = async (userInfo) => {
  
    let userObj;
    userObj = jwtDecode(userInfo.credential);

    setFormData({
        name: userObj.name,
        email: userObj.email,
        password: userObj.email,
        phone: "",
        location: "",
        idNumber: "",
        nationality: "",
        profileImage: userObj.picture, // Send Base64 image
        role: role,
      });
      setImagePreview(userObj.picture)
      setStep(2);

  };
    // Initialize Google Auth
    useEffect(() => {
      const initializeGoogleAuth = () => {
        if (window.google?.accounts?.id) {
          window.google.accounts.id.initialize({
            client_id: import.meta.env.VITE_CLIENT_ID,
            callback: (response) => handleSocialLogin(response),
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

  const renderStepContent = () => {
    if (step === 1) {
      return (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-4"
        >
                {/* Home Button */}
                <button
                  onClick={handleHomeClick}
                  className="absolute top-6 left-6 p-2 rounded-full bg-white shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-300"
                >
                  <Home className="w-5 h-5 text-orange-700" />
                </button>
          <div className="relative">
            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-700"
              placeholder="Full Name"
            />
            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
          </div>

          <div className="relative">
            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-700"
              placeholder="Email Address"
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
          </div>

          <div className="relative">
            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-700"
              placeholder="Password"
            />
            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
          </div>
        </motion.div>
      );
    }

    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="space-y-4"
      >
        
        <div className="relative">
          <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-700"
            placeholder="Phone Number"
          />
          {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
        </div>

        <div className="relative">
          <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleInputChange}
            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-700"
            placeholder="Location"
          />
          {errors.location && <p className="text-red-500 text-sm mt-1">{errors.location}</p>}
        </div>

        <div className="relative">
          <FileText className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            name="idNumber"
            value={formData.idNumber}
            onChange={handleInputChange}
            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-700"
            placeholder="ID/Passport Number"
          />
          {errors.idNumber && <p className="text-red-500 text-sm mt-1">{errors.idNumber}</p>}
        </div>

        <div className="relative">
          <Globe className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            name="nationality"
            value={formData.nationality}
            onChange={handleInputChange}
            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-700"
            placeholder="Nationality"
          />
          {errors.nationality && <p className="text-red-500 text-sm mt-1">{errors.nationality}</p>}
        </div>

        <div className="relative">
          <label className="flex items-center gap-2 p-2 border rounded-lg cursor-pointer hover:bg-gray-50">
            <Camera className="text-gray-400" />
            <span className="text-gray-600">Upload Profile Picture</span>
            <input
              type="file"
              className="hidden"
              accept="image/*"
              onChange={handleImageUpload}
            />
          </label>
          {imagePreview && (
            <div className="mt-4">
              <img
                src={imagePreview}
                alt="Profile Preview"
                className="w-24 h-24 rounded-full object-cover"
              />
            </div>
          )}
          {errors.profileImage && <p className="text-red-500 text-sm mt-1">{errors.profileImage}</p>}
        </div>
      </motion.div>
    );
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 to-indigo-50 p-4">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="bg-white shadow-xl rounded-2xl overflow-hidden flex flex-col md:flex-row w-full max-w-4xl"
      >
        <div className="bg-gradient-to-br from-orange-600 to-orange-700 text-white p-10 flex flex-col justify-center items-center md:w-1/2">
          <motion.h1 
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-4xl font-bold mb-4 text-center"
          >
            Welcome to Lala Rentals
          </motion.h1>
          <motion.p 
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-lg mb-8 text-center"
          >
            {role === 'renter' ? 'Find your perfect home' : 'List your property'}
          </motion.p>
          <div className="flex gap-4">
            <motion.button
              variants={roleButtonVariants}
              whileHover="hover"
              whileTap="tap"
              onClick={() => setRole('renter')}
              className={`px-8 py-3 rounded-full font-semibold transition-all duration-300 ${
                role === 'renter' 
                  ? 'bg-white text-orange-700 shadow-lg' 
                  : 'bg-orange-500 text-white hover:bg-orange-400'
              }`}
            >
              Renter
            </motion.button>
            <motion.button
              variants={roleButtonVariants}
              whileHover="hover"
              whileTap="tap"
              onClick={() => setRole('host')}
              className={`px-8 py-3 rounded-full font-semibold transition-all duration-300 ${
                role === 'host' 
                  ? 'bg-white text-orange-700 shadow-lg' 
                  : 'bg-orange-500 text-white hover:bg-orange-400'
              }`}
            >
              Host
            </motion.button>
          </div>
        </div>

        <div className="p-10 md:w-1/2">
          <motion.h2 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-3xl font-bold mb-6"
          >
            Create Your Account
          </motion.h2>

          {apiError && <p className="text-red-500 text-sm mb-4">{apiError}</p>}

          <form className="space-y-6">
            {renderStepContent()}

            <div className="flex justify-between mt-6">
              {step > 1 && (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  type="button"
                  onClick={() => setStep(1)}
                  className="flex items-center gap-2 bg-gray-600 text-white px-6 py-2 rounded-full font-semibold hover:bg-gray-700 transition duration-300"
                >
                  <ChevronLeft size={20} />
                  Back
                </motion.button>
              )}
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="button"
                onClick={() => step === 1 ? setStep(2) : RegisterUser()}
                className={`flex items-center gap-2 px-8 py-3 rounded-full font-semibold transition duration-300 ${
                  step === 1 
                    ? 'bg-orange-700 text-white hover:bg-orange-700'
                    : 'bg-green-600 text-white hover:bg-green-700'
                }`}
              >
                {step === 1 ? (
                  <>
                    Next
                    <ChevronRight size={20} />
                  </>
                ) : 'Complete Signup'}
              </motion.button>
            </div>
          </form>

          <div className="mt-6">
            <div className="relative flex items-center justify-center">
              <div className="border-t w-full border-gray-300"></div>
              <span className="bg-white px-4 text-sm text-gray-500">or</span>
              <div className="border-t w-full border-gray-300"></div>
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
            </div>

            <p className="text-center text-gray-600 mt-8">
              Already have an account?{' '}
              <button
                type="button"
                onClick={handleLogin}
                className="text-orange-700 hover:text-orange-700 font-medium"
              >
                Sign In
              </button>
            </p>
        </div>
      </motion.div>
    </div>
  );
};

export default SignupPage;