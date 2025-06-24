import React, { useState } from "react";
import { FaEnvelope, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { ArrowRight } from 'lucide-react';


const LoginForm = () => {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });
    const [errors, setErrors] = useState({});
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const validateField = (name, value) => {
        switch (name) {
            case "email":
                return !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ? "Invalid email format" : "";
            case "password":
                return value.length < 8 ? "Password must be at least 8 characters" : "";
            default:
                return "";
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        const error = validateField(name, value);
        setErrors((prev) => ({ ...prev, [name]: error }));
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
            const response = await axios.post("http://localhost:5000/login", formData);

            if (response.data.success) {

                
                const { token, userType, userId } = response.data;



if (token) {
    localStorage.removeItem("user");
    localStorage.setItem("token", token); // ✅ Save token
    localStorage.setItem("user", JSON.stringify({ id: userId, role: userType.toLowerCase() })); // ✅ Save role + id

}
                toast.success("login successful");


                // Navigate based on user type
                if (response.data.userType === "organizer"){
                    navigate("/Organiser");
                }
                else if(response.data.userType === "customer"){
                    navigate("/customer");
                }
            } else {
                toast.warning(response.data.message || "Invalid credentials.");
            }
        } catch (error) {
            console.error("Login error:", error);
            toast.error(error.response?.data?.message || "Something went wrong.");
        } finally {
            setIsLoading(false);
        }
    };


        return (
//     <div className="min-h-screen bg-[#F5F5F5] flex items-center justify-center p-4">
//     <div className="w-full max-w-md">
//       <div className="bg-white rounded-2xl shadow-xl p-8">
//         <div className="text-center mb-8">
//           <h1 className="text-2xl font-bold text-[#1A73E8] mb-2">Welcome to Event.io</h1>
//           <p className="text-gray-600">Sign in to continue to your account</p>
//         </div>

//         <form onSubmit={handleSubmit} className="space-y-6">
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-2">
//               Email Address
//             </label>
//             <div className="relative">
//               <input
//                 type="email"
//                 name="email"
//                value={formData.email}
//                onChange={handleChange}
//                 className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#1A73E8] focus:border-transparent pl-10"
//                 placeholder="Enter your email"
//                 required
//               />
//               <FaEnvelope className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
//             </div>
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-2">
//               Password
//             </label>
//             <div className="relative">
//               <input
//                     type={showPassword ? "text" : "password"}
//                     name="password"
//                     value={formData.password}
//                     onChange={handleChange}
//                 className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#1A73E8] focus:border-transparent pl-10"
//                 placeholder="Enter your password"
//                 required
//               />
//               <FaLock className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />

//               <button
//                                 type="button"
//                                 onClick={() => setShowPassword(!showPassword)}
//                                 className="absolute inset-y-0 right-0 pr-3 flex items-center"
//                             >
//                                 {showPassword ? <FaEyeSlash className="h-5 w-5 text-gray-400" /> : <FaEye className="h-5 w-5 text-gray-400" />}
//                             </button>
//                             {/* {errors.password && <p className="mt-1 text-sm text-red-500">{errors.password}</p>} */}
//             </div>
//           </div>

//           <button
//             type="submit"
//             disabled={isLoading || Object.keys(errors).some((key) => errors[key])}
//             className="w-full flex items-center justify-center px-4 py-3 border border-transparent rounded-lg shadow-sm text-white bg-[#1A73E8] hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#1A73E8] transition-colors duration-300"
//           >
//             {isLoading ? "Loading..." : "Sign In"}
//             <ArrowRight className="ml-2 h-5 w-5" />
//           </button>
//         </form>

//         <div className="mt-6 text-center">
//           <p className="text-sm text-gray-600">
//             Don't have an account?{' '}
//             <Link to="/signup" className="font-medium text-blue-600 hover:text-blue-500">
//                              Sign Up
//           </Link>
//           </p>
//         </div>

//         <div className="mt-8 pt-8 border-t border-gray-200">
//           <p className="text-xs text-center text-gray-500">
//             By continuing, you agree to Event.io's Terms of Service and Privacy Policy
//           </p>
//         </div>
//       </div>
//     </div>
//   </div>



<div className="min-h-screen w-full flex">
            <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-r from-blue-600 to-indigo-600 relative overflow-hidden">
                <div className="absolute inset-0 bg-black/20 backdrop-blur-sm" />
                <img
                    src="src\istockphoto-1357747202-612x612.jpg"
                    alt="Coding background"
                    className="absolute inset-0 w-full h-full object-cover mix-blend-overlay opacity-90"
                />
                <div className="mt-120 relative z-10 p-12 text-white">
                    <h2 className="text-4xl font-bold mb-4">Welcome to Event.io</h2>
                    <p className="text-xl">Your one-stop platform for event management</p>
                </div>
            </div>

            <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-gray-50">
                <div className="w-full max-w-md space-y-8 bg-white p-10 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.12)]">
                    <div className="text-center space-y-4">
                        <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                            Sign in to Event.io
                        </h1>
                        <p className="text-gray-500">
                            Enter your details to access your account
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6 mt-8">
                        <div className="space-y-4">
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
                                    <FaEnvelope className="absolute left-3 top-3.5 h-5 w-5 text-gray-400 group-hover:text-blue-500 transition-colors duration-300" />
                                </div>
                                {errors.email && (
                                    <p className="mt-1 text-sm text-red-500">{errors.email}</p>
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
                                        placeholder="Enter your password"
                                        required
                                    />
                                    <FaLock className="absolute left-3 top-3.5 h-5 w-5 text-gray-400 group-hover:text-blue-500 transition-colors duration-300" />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute inset-y-0 right-0 pr-3 flex items-center"
                                    >
                                        {showPassword ? (
                                            <FaEyeSlash className="h-5 w-5 text-gray-400 hover:text-blue-500 transition-colors duration-300" />
                                        ) : (
                                            <FaEye className="h-5 w-5 text-gray-400 hover:text-blue-500 transition-colors duration-300" />
                                        )}
                                    </button>
                                </div>
                                {errors.password && (
                                    <p className="mt-1 text-sm text-red-500">{errors.password}</p>
                                )}
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading || Object.keys(errors).some((key) => errors[key])}
                            className="w-full flex items-center justify-center px-4 py-3 border border-transparent rounded-xl shadow-sm text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-300 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                        >
                            {isLoading ? (
                                <div className="flex items-center">
                                    <div className="w-5 h-5 border-t-2 border-b-2 border-white rounded-full animate-spin mr-2"></div>
                                    Signing in...
                                </div>
                            ) : (
                                <>
                                    Sign In
                                    <ArrowRight className="ml-2 h-5 w-5 animate-pulse" />
                                </>
                            )}
                        </button>

                        <div className="text-center">
                            <p className="text-sm text-gray-600">
                                Don't have an account?{' '}
                                <Link
                                    to="/signup"
                                    className="font-medium text-blue-600 hover:text-blue-500 transition-colors duration-300"
                                >
                                    Sign Up
                                </Link>
                            </p>
                        </div>

                        <div className="mt-8 pt-8 border-t border-gray-200">
                            <p className="text-xs text-center text-gray-500 leading-relaxed">
                                By continuing, you agree to Event.io's{' '}
                                <a href="#" className="text-blue-600 hover:text-blue-500 transition-colors duration-300">Terms of Service</a>
                                {' '}and{' '}
                                <a href="#" className="text-blue-600 hover:text-blue-500 transition-colors duration-300">Privacy Policy</a>
                            </p>
                        </div>
                    </form>
                </div>
            </div>
        </div>
);
};





export default LoginForm;



// import React, { useState } from "react";
// import { FaEnvelope, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
// import { Link, useNavigate } from "react-router-dom";
// import axios from "axios";
// import { toast } from "react-toastify";
// import { ArrowRight } from 'lucide-react';

// const LoginForm = () => {
//     const [formData, setFormData] = useState({
//         email: "",
//         password: "",
//     });
//     const [errors, setErrors] = useState({});
//     const [showPassword, setShowPassword] = useState(false);
//     const [isLoading, setIsLoading] = useState(false);
//     const navigate = useNavigate();

//     const validateField = (name, value) => {
//         switch (name) {
//             case "email":
//                 return !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ? "Invalid email format" : "";
//             case "password":
//                 return value.length < 8 ? "Password must be at least 8 characters" : "";
//             default:
//                 return "";
//         }
//     };

//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setFormData((prev) => ({ ...prev, [name]: value }));
//         const error = validateField(name, value);
//         setErrors((prev) => ({ ...prev, [name]: error }));
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         setIsLoading(true);

//         const newErrors = {};
//         Object.keys(formData).forEach((key) => {
//             const error = validateField(key, formData[key]);
//             if (error) newErrors[key] = error;
//         });

//         if (Object.keys(newErrors).length > 0) {
//             setErrors(newErrors);
//             setIsLoading(false);
//             return;
//         }

//         try {
//             const response = await axios.post("http://localhost:5000/login", formData);

//             if (response.data.success) {

                
//                 const { token, userType, userId } = response.data;



// if (token) {
//     localStorage.removeItem("user");
//     localStorage.setItem("token", token); // ✅ Save token
//     localStorage.setItem("user", JSON.stringify({ id: userId, role: userType.toLowerCase() })); // ✅ Save role + id

// }
//                 toast.success("login successful");


//                 // Navigate based on user type
//                 if (response.data.userType === "organizer"){
//                     navigate("/Organiser");
//                 }
//                 else if(response.data.userType === "customer"){
//                     navigate("/customer");
//                 }
//             } else {
//                 toast.warning(response.data.message || "Invalid credentials.");
//             }
//         } catch (error) {
//             console.error("Login error:", error);
//             toast.error(error.response?.data?.message || "Something went wrong.");
//         } finally {
//             setIsLoading(false);
//         }
//     };

//     return (
//         <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-50 p-4">
//             <div className="w-full max-w-md">
//                 <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] p-8 transition-all duration-300 hover:shadow-[0_8px_30px_rgb(0,0,0,0.16)]">
//                     <div className="text-center mb-8 space-y-2">
//                         <div className="inline-block p-2 bg-blue-50 rounded-lg mb-2">
//                             <img
//                                 src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/1b/The_Event_logo_Black.svg/1200px-The_Event_logo_Black.svg.png"
//                                 alt="Event.io"
//                                 className="w-12 h-12 mx-auto object-contain"
//                             />
//                         </div>
//                         <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
//                             Welcome Back
//                         </h1>
//                         <p className="text-gray-500">Sign in to continue to your account</p>
//                     </div>

//                     <form onSubmit={handleSubmit} className="space-y-6">
//                         <div className="space-y-4">
//                             <div>
//                                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                                     Email Address
//                                 </label>
//                                 <div className="relative group">
//                                     <input
//                                         type="email"
//                                         name="email"
//                                         value={formData.email}
//                                         onChange={handleChange}
//                                         className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent pl-10 bg-white/50 backdrop-blur-sm transition-all duration-300 group-hover:border-blue-500"
//                                         placeholder="Enter your email"
//                                         required
//                                     />
//                                     <FaEnvelope className="absolute left-3 top-3.5 h-5 w-5 text-gray-400 group-hover:text-blue-500 transition-colors duration-300" />
//                                 </div>
//                                 {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email}</p>}
//                             </div>

//                             <div>
//                                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                                     Password
//                                 </label>
//                                 <div className="relative group">
//                                     <input
//                                         type={showPassword ? "text" : "password"}
//                                         name="password"
//                                         value={formData.password}
//                                         onChange={handleChange}
//                                         className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent pl-10 bg-white/50 backdrop-blur-sm transition-all duration-300 group-hover:border-blue-500"
//                                         placeholder="Enter your password"
//                                         required
//                                     />
//                                     <FaLock className="absolute left-3 top-3.5 h-5 w-5 text-gray-400 group-hover:text-blue-500 transition-colors duration-300" />
//                                     <button
//                                         type="button"
//                                         onClick={() => setShowPassword(!showPassword)}
//                                         className="absolute inset-y-0 right-0 pr-3 flex items-center"
//                                     >
//                                         {showPassword ? 
//                                             <FaEyeSlash className="h-5 w-5 text-gray-400 hover:text-blue-500 transition-colors duration-300" /> : 
//                                             <FaEye className="h-5 w-5 text-gray-400 hover:text-blue-500 transition-colors duration-300" />
//                                         }
//                                     </button>
//                                 </div>
//                                 {errors.password && <p className="mt-1 text-sm text-red-500">{errors.password}</p>}
//                             </div>
//                         </div>

//                         <button
//                             type="submit"
//                             disabled={isLoading || Object.keys(errors).some((key) => errors[key])}
//                             className="w-full flex items-center justify-center px-4 py-3 border border-transparent rounded-xl shadow-sm text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-300 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
//                         >
//                             {isLoading ? (
//                                 <div className="flex items-center">
//                                     <div className="w-5 h-5 border-t-2 border-b-2 border-white rounded-full animate-spin mr-2"></div>
//                                     Signing in...
//                                 </div>
//                             ) : (
//                                 <>
//                                     Sign In
//                                     <ArrowRight className="ml-2 h-5 w-5 animate-pulse" />
//                                 </>
//                             )}
//                         </button>

//                         <div className="relative my-6">
//                             <div className="absolute inset-0 flex items-center">
//                                 <div className="w-full border-t border-gray-200"></div>
//                             </div>
//                             <div className="relative flex justify-center text-sm">
//                                 <span className="px-2 bg-white text-gray-500">or</span>
//                             </div>
//                         </div>

//                         <div className="mt-6 text-center">
//                             <p className="text-sm text-gray-600">
//                                 Don't have an account?{' '}
//                                 <Link 
//                                     to="/signup" 
//                                     className="font-medium text-blue-600 hover:text-blue-500 transition-colors duration-300"
//                                 >
//                                     Sign Up
//                                 </Link>
//                             </p>
//                         </div>

//                         <div className="mt-8 pt-8 border-t border-gray-200">
//                             <p className="text-xs text-center text-gray-500 leading-relaxed">
//                                 By continuing, you agree to Event.io's{' '}
//                                 <a href="#" className="text-blue-600 hover:text-blue-500 transition-colors duration-300">Terms of Service</a>
//                                 {' '}and{' '}
//                                 <a href="#" className="text-blue-600 hover:text-blue-500 transition-colors duration-300">Privacy Policy</a>
//                             </p>
//                         </div>
//                     </form>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default LoginForm;
