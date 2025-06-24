
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Mail, Lock, User, ArrowRight, Phone, Eye, EyeOff } from 'lucide-react';
import axios from "axios";
import { toast } from "react-toastify";

const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    password: '',
    userType: "Customer"
  });

  const [errors, setErrors] = useState({});
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const validateField = (name, value) => {
        switch (name) {
            case "fullName":
                return value.length < 2 ? "Name must be at least 2 characters" : "";
            case "email":
                return !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ? "Invalid email format" : "";
            case "password":
                return value.length < 8 ? "Password must be at least 8 characters" : "";
            case "phone":
                return !/^\d{10}$/.test(value) ? "Invalid phone number" : "";
            default:
                return "";
        }
    };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
        setIsLoading(true);

        const newErrors = {};
        Object.keys(formData).forEach((key) => {
            const error = validateField(key, formData[key]);
            if (error) newErrors[key] = error;
        });

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            setIsLoading(false);
            return;
        }

        try {
            const response = await axios.post("http://localhost:5000/signup", formData);
            console.log("User registered:", response.data);
            setErrors({});
            toast.success("user registered successfully.");
            setFormData({
                fullName: "",
                email: "",
                password: "",
                phone: "",
                userType: "Customer",
            });
            return navigate("/login");
        } catch (error) {
            console.error("Error registering user:", error);
            alert(error.response?.data?.message || "Something went wrong.");
        } finally {
            setIsLoading(false);
        }
  };

//   return (
//     <div className="min-h-screen bg-[#F5F5F5] flex items-center justify-center p-4">
//       <div className="w-full max-w-md">
//         <div className="bg-white rounded-2xl shadow-xl p-4">
//           <div className="text-center mb-4">
//             <h1 className="text-2xl font-bold text-[#1A73E8] mb-2">Create an Account</h1>
//             <p className="text-gray-600">Join Event.io to discover amazing events</p>
//           </div>

//           <form onSubmit={handleSubmit} className="space-y-6">
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 Full Name
//               </label>
//               <div className="relative">
//                 <input
//                   type="text"
//                   name="fullName"
//                   value={formData.fullName}
//                   onChange={handleChange}
//                   className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#1A73E8] focus:border-transparent pl-10"
//                   placeholder="Enter your full name"
//                   required
//                 />
//                 <User className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
//             {errors.fullName && <p className="text-red-500 text-sm">{errors.fullName}</p>}
//               </div>
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 Email Address
//               </label>
//               <div className="relative">
//                 <input
//                   type="email"
//                   name="email"
//                   value={formData.email}
//                   onChange={handleChange}
//                   className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#1A73E8] focus:border-transparent pl-10"
//                   placeholder="Enter your email"
//                   required
//                 />
//                 <Mail className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
//             {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
//               </div>
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 Phone Number
//               </label>
//               <div className="relative">
//                 <input
//                   type="tel"
//                   name="phone"
//                   value={formData.phone}
//                   onChange={handleChange}
//                   className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#1A73E8] focus:border-transparent pl-10"
//                   placeholder="Enter your phone number"
//                   required
//                 />
//                 <Phone className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
//                   {errors.phone && <p className="text-red-500 text-sm">{errors.phone}</p>}
//               </div>
//             </div>

//                   <div>
//   <label className="block text-sm font-medium text-gray-700 mb-2">
//     Password
//   </label>
//   <div className="relative">
//     <input
//       type={showPassword ? "text" : "password"}
//       name="password"
//       value={formData.password}
//       onChange={handleChange}
//       className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#1A73E8] focus:border-transparent pl-10 pr-10"
//       placeholder="Create a password"
//       required
//     />
//     <Lock className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
//     <button
//       type="button"
//       onClick={() => setShowPassword(!showPassword)}
//       className="absolute right-3 top-3.5 text-gray-500 focus:outline-none"
//     >
//       {showPassword ? (
//         <EyeOff className="h-5 w-5" />
//       ) : (
//         <Eye className="h-5 w-5" />
//       )}
//     </button>
//             {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
//   </div>
// </div>


//             <select
//                         name="userType"
//                         value={formData.userType}
//                         onChange={handleChange}
//                         className="block w-full px-3 py-2 border rounded-lg"
//                     >
//                         <option value="Customer">Customer</option>
//                         <option value="Organizer">Organizer</option>
//                     </select>

//             <button
//               type="submit"
//               className="w-full flex items-center justify-center px-4 py-3 border border-transparent rounded-lg shadow-sm text-white bg-[#1A73E8] hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#1A73E8] transition-colors duration-300"
//             >
//               Create Account
//               <ArrowRight className="ml-2 h-5 w-5" />
//             </button>
//           </form>

//           <div className="mt-2 text-center">
//             <p className="text-sm text-gray-600">
//               Already have an account?{' '}
//               <Link to="/login" className="text-[#1A73E8] hover:text-blue-700 font-medium">
//                 Sign in
//               </Link>
//             </p>
//           </div>
// {/* 
//           <div className="mt-8 pt-8 border-t border-gray-200">
//             <p className="text-xs text-center text-gray-500">
//               By signing up, you agree to Event.io's Terms of Service and Privacy Policy
//             </p>
//           </div> */}
//         </div>
//       </div>
//     </div>
//   );


return (
  <div className="min-h-screen w-full flex">
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-r from-blue-600 to-indigo-600 relative overflow-hidden">
          <div className="absolute inset-0 bg-black/20 backdrop-blur-sm" />
          <img
              src="src\istockphoto-1357747202-612x612.jpg"
              alt="Event background"
              className="absolute inset-0 w-full h-full object-cover mix-blend-overlay opacity-90"
          />
          <div className="mt-120 relative z-10 p-12 text-white">
              <h2 className="text-4xl font-bold mb-4">Join Event.io Today</h2>
              <p className="text-xl">Create and discover amazing events</p>
          </div>
      </div>

      <div className="w-full lg:w-1/2 flex items-center justify-center pt-6 pb-2 bg-gray-50">
          <div className="w-full max-w-md space-y-2 bg-white pt-6 px-10 pb-10 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.12)]">
              <div className="text-center space-y-2 mt-0">
                  <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                      Create your account
                  </h1>
                  <p className="text-gray-500">
                      Join Event.io to start creating and discovering events
                  </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-4">
                      <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                              Full Name
                          </label>
                          <div className="relative group">
                              <input
                                  type="text"
                                  name="fullName"
                                  value={formData.fullName}
                                  onChange={handleChange}
                                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent pl-10 bg-white/50 backdrop-blur-sm transition-all duration-300 group-hover:border-blue-500"
                                  placeholder="Enter your full name"
                                  required
                              />
                              <User className="absolute left-3 top-3.5 h-5 w-5 text-gray-400 group-hover:text-blue-500 transition-colors duration-300" />
                          </div>
                          {errors.fullName && (
                              <p className="mt-1 text-sm text-red-500">{errors.fullName}</p>
                          )}
                      </div>

                      <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                              Email Address
                          </label>
                          <div className="relative group">
                              <input
                                  type="email"
                                  name="email"
                                  value={formData.email}
                                  onChange={handleChange}
                                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent pl-10 bg-white/50 backdrop-blur-sm transition-all duration-300 group-hover:border-blue-500"
                                  placeholder="Enter your email"
                                  required
                              />
                              <Mail className="absolute left-3 top-3.5 h-5 w-5 text-gray-400 group-hover:text-blue-500 transition-colors duration-300" />
                          </div>
                          {errors.email && (
                              <p className="mt-1 text-sm text-red-500">{errors.email}</p>
                          )}
                      </div>

                      <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                              Phone Number
                          </label>
                          <div className="relative group">
                              <input
                                  type="tel"
                                  name="phone"
                                  value={formData.phone}
                                  onChange={handleChange}
                                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent pl-10 bg-white/50 backdrop-blur-sm transition-all duration-300 group-hover:border-blue-500"
                                  placeholder="Enter your phone number"
                                  required
                              />
                              <Phone className="absolute left-3 top-3.5 h-5 w-5 text-gray-400 group-hover:text-blue-500 transition-colors duration-300" />
                          </div>
                          {errors.phone && (
                              <p className="mt-1 text-sm text-red-500">{errors.phone}</p>
                          )}
                      </div>

                      <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                              Password
                          </label>
                          <div className="relative group">
                              <input
                                  type={showPassword ? "text" : "password"}
                                  name="password"
                                  value={formData.password}
                                  onChange={handleChange}
                                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent pl-10 bg-white/50 backdrop-blur-sm transition-all duration-300 group-hover:border-blue-500"
                                  placeholder="Create a password"
                                  required
                              />
                              <Lock className="absolute left-3 top-3.5 h-5 w-5 text-gray-400 group-hover:text-blue-500 transition-colors duration-300" />
                              <button
                                  type="button"
                                  onClick={() => setShowPassword(!showPassword)}
                                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                              >
                                  {showPassword ? (
                                      <EyeOff className="h-5 w-5 text-gray-400 hover:text-blue-500 transition-colors duration-300" />
                                  ) : (
                                      <Eye className="h-5 w-5 text-gray-400 hover:text-blue-500 transition-colors duration-300" />
                                  )}
                              </button>
                          </div>
                          {errors.password && (
                              <p className="mt-1 text-sm text-red-500">{errors.password}</p>
                          )}
                      </div>

                      <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                              Account Type
                          </label>
                          <select
                              name="userType"
                              value={formData.userType}
                              onChange={handleChange}
                              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white/50 backdrop-blur-sm transition-all duration-300 hover:border-blue-500"
                          >
                              <option value="Customer">Customer</option>
                              <option value="Organizer">Organizer</option>
                          </select>
                      </div>
                  </div>

                  <button
                      type="submit"
                      // disabled={isLoading || Object.keys(errors).some((key) => errors[key as keyof Errors])}
                      className="w-full flex items-center justify-center px-4 py-3 border border-transparent rounded-xl shadow-sm text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-300 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                  >
                      {isLoading ? (
                          <div className="flex items-center">
                              <div className="w-5 h-5 border-t-2 border-b-2 border-white rounded-full animate-spin mr-2"></div>
                              Creating account...
                          </div>
                      ) : (
                          <>
                              Create Account
                              <ArrowRight className="ml-2 h-5 w-5 animate-pulse" />
                          </>
                      )}
                  </button>

                  <div className="text-center">
                      <p className="text-sm text-gray-600">
                          Already have an account?{' '}
                          <Link
                              to="/login"
                              className="font-medium text-blue-600 hover:text-blue-500 transition-colors duration-300"
                          >
                              Sign In
                          </Link>
                      </p>
                  </div>

                  {/* <div className="mt-8 pt-8 border-t border-gray-200">
                      <p className="text-xs text-center text-gray-500 leading-relaxed">
                          By continuing, you agree to Event.io's{' '}
                          <a href="#" className="text-blue-600 hover:text-blue-500 transition-colors duration-300">Terms of Service</a>
                          {' '}and{' '}
                          <a href="#" className="text-blue-600 hover:text-blue-500 transition-colors duration-300">Privacy Policy</a>
                      </p>
                  </div> */}
              </form>
          </div>
      </div>
  </div>
);
};

export default Signup;