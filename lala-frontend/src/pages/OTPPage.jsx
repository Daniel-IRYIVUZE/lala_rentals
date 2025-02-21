import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Home, Mail, CheckCircle, RefreshCw, AlertCircle } from 'lucide-react';

const OTPPage = () => {
  const [otpValues, setOtpValues] = useState(['', '', '', '', '', '']);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [timeLeft, setTimeLeft] = useState(30);
  const [canResend, setCanResend] = useState(false);
  const inputRefs = useRef([]);

  useEffect(() => {
    if (timeLeft > 0 && !canResend) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && !canResend) {
      setCanResend(true);
    }
  }, [timeLeft, canResend]);

  const handleInput = (index, value) => {
    if (!/^[0-9]*$/.test(value)) return;

    const newOtpValues = [...otpValues];
    newOtpValues[index] = value;
    setOtpValues(newOtpValues);
    setErrorMessage('');

    // Auto-focus next input
    if (value && index < 5) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otpValues[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').slice(0, 6);
    const newOtpValues = [...otpValues];
    
    for (let i = 0; i < pastedData.length; i++) {
      if (/^[0-9]$/.test(pastedData[i])) {
        newOtpValues[i] = pastedData[i];
      }
    }
    
    setOtpValues(newOtpValues);
    if (newOtpValues[5]) {
      inputRefs.current[5].focus();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const otp = otpValues.join('');
    
    if (otp.length !== 6) {
      setErrorMessage('Please enter all 6 digits');
      return;
    }

    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      console.log('OTP Verified:', otp);
    } catch (error) {
      setErrorMessage('Invalid OTP. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendOTP = async () => {
    setCanResend(false);
    setTimeLeft(30);
    // Simulate OTP resend
    await new Promise(resolve => setTimeout(resolve, 1000));
    console.log('OTP Resent');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-50 p-4">
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="absolute top-5 left-5 text-blue-900 p-2 rounded-full hover:bg-white/50 transition-colors"
      >
        <Home className="w-6 h-6" />
      </motion.button>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white shadow-2xl rounded-2xl overflow-hidden flex flex-col md:flex-row w-full max-w-4xl"
      >
        {/* Left Side */}
        <div className="bg-gradient-to-br from-blue-900 to-indigo-600 text-white p-10 flex flex-col justify-center items-center md:w-1/2">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <h1 className="text-4xl font-bold mb-4 text-center">Verify Your Email</h1>
            <p className="text-lg mb-8 text-center opacity-90">
              We've sent a 6-digit code to your email address. Enter the code below to continue.
            </p>
          </motion.div>

          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="w-full max-w-md"
          >
            <div className="relative w-full pt-[75%]">
              <div className="absolute inset-0 rounded-lg overflow-hidden bg-white/10 backdrop-blur-sm flex items-center justify-center">
                <Mail className="w-24 h-24 text-white/50" />
              </div>
            </div>
          </motion.div>
        </div>

        {/* Right Side */}
        <div className="p-10 md:w-1/2">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <h2 className="text-3xl font-bold mb-6">Enter Verification Code</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-4">
                <div className="flex justify-between gap-2">
                  {otpValues.map((value, index) => (
                    <input
                      key={index}
                      ref={el => inputRefs.current[index] = el}
                      type="text"
                      maxLength={1}
                      value={value}
                      onChange={e => handleInput(index, e.target.value)}
                      onKeyDown={e => handleKeyDown(index, e)}
                      onPaste={handlePaste}
                      className="w-12 h-12 text-center text-xl font-bold border rounded-lg focus:ring-2 focus:ring-blue-900 
                        focus:border-blue-900 transition-colors"
                    />
                  ))}
                </div>

                {errorMessage && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center gap-2 text-red-500"
                  >
                    <AlertCircle className="w-4 h-4" />
                    <span className="text-sm">{errorMessage}</span>
                  </motion.div>
                )}
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={isLoading}
                className="relative w-full bg-blue-900 text-white px-8 py-3 rounded-lg font-semibold 
                  hover:bg-blue-700 transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed
                  flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                    className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                  />
                ) : (
                  <>
                    Verify Code
                    <CheckCircle className="w-5 h-5" />
                  </>
                )}
              </motion.button>

              <div className="text-center">
                {canResend ? (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    onClick={handleResendOTP}
                    className="text-blue-900 font-medium hover:underline flex items-center justify-center gap-2"
                  >
                    <RefreshCw className="w-4 h-4" />
                    Resend Code
                  </motion.button>
                ) : (
                  <p className="text-gray-600">
                    Resend code in <span className="font-medium">{timeLeft}s</span>
                  </p>
                )}
              </div>
            </form>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default OTPPage;