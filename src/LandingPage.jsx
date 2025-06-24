import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import React from 'react';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const LandingPage = () => {


  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const user = JSON.parse(localStorage.getItem('user')); 
    if (token && user) {
      if (user.role === 'customer') {
        navigate('/customer'); // Redirect customer
      } else if (user.role === 'organizer') {
        navigate('/Organiser'); // Redirect organizer
      }
    }
  }, [navigate]);


  const [featuresRef, featuresInView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  const [testimonialsRef, testimonialsInView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  return (
    <div className="min-h-screen flex flex-col">

<nav className="bg-gradient-to-r shadow-md">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="flex justify-between items-center h-16">
      <div className="flex items-center">
        <h1 className="text-2xl font-bold text-blue-500">Event.io</h1>
      </div>
      <div>
      <Link to="/login" className="bg-[#1A73E8] text-white px-4 py-2 rounded-full font-semibold hover:bg-[#1557B0] hover:scale-105 transform transition-all duration-300 shadow-md">
  Login
</Link>

      </div>
    </div>
  </div>
</nav>






      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-[#1557B0] via-[#1A73E8] to-[#4285f4] overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.pexels.com/photos/2774556/pexels-photo-2774556.jpeg"
            alt="Event Background"
            className="w-full h-full object-cover opacity-20"
          />
        </div>
        <div className="container mx-auto px-4 py-24 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl mx-auto text-center"
          >
            <h1 className="text-5xl md:text-7xl font-bold mb-6 text-white">Book Your Next Event With Ease</h1>
            <p className="text-xl md:text-2xl mb-8 text-white opacity-90">Streamline your event planning process with our powerful booking system</p>
            <Link to="/signup">
  <motion.button
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    className="bg-white text-[#1A73E8] px-8 py-4 rounded-full font-semibold text-lg hover:bg-opacity-90 transition-colors shadow-lg"
  >
    Get Started
  </motion.button>
</Link>

          </motion.div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-20 bg-white" ref={featuresRef}>
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-16 text-gray-800">Why Choose Us</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={featuresInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="p-8 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className="w-16 h-16 bg-[#1A73E8] rounded-full flex items-center justify-center mb-6 mx-auto">
                <span className="text-white text-2xl">📅</span>
              </div>
              <h3 className="text-2xl font-semibold mb-4 text-gray-800 text-center">Easy Booking</h3>
              <p className="text-gray-600 text-center">Book your events in minutes with our intuitive interface</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={featuresInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="p-8 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className="w-16 h-16 bg-[#1A73E8] rounded-full flex items-center justify-center mb-6 mx-auto">
                <span className="text-white text-2xl">🔔</span>
              </div>
              <h3 className="text-2xl font-semibold mb-4 text-gray-800 text-center">Real-time Updates</h3>
              <p className="text-gray-600 text-center">Get instant confirmations and updates about your events</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={featuresInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="p-8 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className="w-16 h-16 bg-[#1A73E8] rounded-full flex items-center justify-center mb-6 mx-auto">
                <span className="text-white text-2xl">🔒</span>
              </div>
              <h3 className="text-2xl font-semibold mb-4 text-gray-800 text-center">Secure Payments</h3>
              <p className="text-gray-600 text-center">Safe and secure payment processing for all bookings</p>
            </motion.div>
          </div>
        </div>
      </div>


      <footer className="bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            <div className="col-span-1">
              <h2 className="text-2xl font-bold text-white mb-6">Event.io</h2>
              <p className="text-gray-400">Your premier destination for discovering and booking amazing events.</p>
            </div>
            <div className="col-span-1">
              <h3 className="text-lg font-semibold text-white mb-6">Quick Links</h3>
              <ul className="space-y-3">
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">About Us</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Contact</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">FAQ</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Privacy Policy</a></li>
              </ul>
            </div>
            <div className="col-span-1">
              <h3 className="text-lg font-semibold text-white mb-6">Categories</h3>
              <ul className="space-y-3">
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Business</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Sports</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Cultural</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Entertainment</a></li>
              </ul>
            </div>
            <div className="col-span-1">
              <h3 className="text-lg font-semibold text-white mb-6">Connect With Us</h3>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-white transition-colors"><FaFacebook size={24} /></a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors"><FaTwitter size={24} /></a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors"><FaInstagram size={24} /></a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors"><FaLinkedin size={24} /></a>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-12 pt-8 text-center">
            <p className="text-gray-400">&copy; 2024 Event.io. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;