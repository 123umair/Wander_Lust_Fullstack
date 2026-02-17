import { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
// Assets folder se logo import karein
import logo from '../../assets/logo.png'; 

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  // Airbnb theme color: #FF5A5F
  const activeStyle = "text-[#FF5A5F] font-bold border-b-2 border-[#FF5A5F] pb-1 transition-all duration-300";
  const normalStyle = "text-gray-600 hover:text-[#FF5A5F] font-medium transition-all duration-300";

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          
          {/* Logo and Nav Links Left Side */}
          <div className="flex items-center space-x-8">
            <Link to="/" className="flex items-center group">
              {/* Logo from assets */}
              <img src={logo} alt="Logo" className="h-10 w-auto transition-transform group-hover:scale-110" />
            </Link>

            {/* Desktop Menu (Logo ke bilkul sath) */}
            <div className="hidden md:flex items-center space-x-6">
              <NavLink 
                to="/" 
                className={({ isActive }) => isActive ? activeStyle : normalStyle}
              >
                All Listings
              </NavLink>
              
              <NavLink 
                to="/listings/create_listing" 
                className={({ isActive }) => isActive ? activeStyle : normalStyle}
              >
                + New Listing
              </NavLink>
            </div>
          </div>

          {/* Hamburger Button (Mobile Only) */}
          <div className="flex md:hidden items-center">
            <button 
              onClick={() => setIsOpen(!isOpen)}
              className={`inline-flex items-center justify-center p-2 rounded-md transition-all duration-300 ${isOpen ? 'bg-red-50 text-[#FF5A5F]' : 'text-gray-700'}`}
            >
              <svg className={`h-6 w-6 transform transition-transform duration-300 ${isOpen ? 'rotate-180' : 'rotate-0'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Animated Mobile Menu */}
      <div 
        className={`md:hidden overflow-hidden transition-all duration-500 ease-in-out ${
          isOpen ? 'max-h-60 opacity-100 border-t' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="px-4 py-4 space-y-2 bg-gray-50">
          <NavLink 
            to="/" 
            onClick={() => setIsOpen(false)}
            className={({ isActive }) => `block px-4 py-3 rounded-xl text-base font-semibold transition-all ${
              isActive ? 'bg-[#FF5A5F] text-white shadow-md' : 'text-gray-700 hover:bg-white hover:text-[#FF5A5F]'
            }`}
          >
            All Listings
          </NavLink>
          <NavLink 
            to="/listings/create_listing" 
            onClick={() => setIsOpen(false)}
            className={({ isActive }) => `block px-4 py-3 rounded-xl text-base font-semibold transition-all ${
              isActive ? 'bg-[#FF5A5F] text-white shadow-md' : 'text-gray-700 hover:bg-white hover:text-[#FF5A5F]'
            }`}
          >
            Add New Listing
          </NavLink>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;