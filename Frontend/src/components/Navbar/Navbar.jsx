import { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
// Assets folder se logo import karein
import logo from '../../assets/logo.png';
import axios from 'axios'


const Navbar = ({ user, setUser, searchQuery, setSearchQuery }) => {
  const [isOpen, setIsOpen] = useState(false);

  const API = import.meta.env.VITE_API_URL

  const logedOut = async () => {
    try {
      const res = await axios.post(`${API}/logedout`, {}, { withCredentials: true })
      setUser(null)
      console.log(res.data.message)
    } catch (error) {
      console.log("error", error.message)
    }
  }


  // Airbnb theme color: #FF5A5F
  const activeStyle = "text-[#FF5A5F] font-bold border-b-2 border-[#FF5A5F] pb-1 transition-all duration-100";
  const normalStyle = "text-gray-600 hover:text-[#FF5A5F] font-medium transition-all duration-300";
  return (
    <nav className="bg-white shadow-md sticky top-0 z-50 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className=" flex justify-between   h-16">

          {/* Logo and Nav Links Left Side */}
          <div className="flex  items-center justify-between w-full space-x-8 ">
            <div className='flex space-x-8'>
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
            {/* Center Side Grid Area */}
            <div className="hidden md:flex justify-center items-center">
              <div className="flex items-center border border-gray-200 rounded-full py-1.5 pl-4 pr-2 shadow-sm hover:shadow-md transition-all duration-200 bg-white w-full max-w-[320px] lg:max-w-[380px]">

                {/* The Magical Native Input element connected to state */}
                <input
                  type="text"
                  placeholder="Search country (e.g. Pakistan, Italy)..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)} // Catch real-time characters
                  className="w-full text-xs font-semibold text-gray-800 bg-transparent border-none outline-none placeholder-gray-400 pl-2 pr-2"
                />

                <div className="bg-[#FF5A5F] p-2 rounded-full text-white hover:bg-[#e04f54] transition-all duration-200 shadow-sm flex-shrink-0 cursor-pointer">
                  {/* Search Glass Icon Vector Here */}
                  <svg className="h-3.5 w-3.5 stroke-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>

              </div>
            </div>
            <div className=' hidden md:flex  items-center justify-center space-x-8'>
              {
                user ? (
                  // FIXED: NavLink ko poora hata diya, simple button lagaya hai
                  <button
                    onClick={logedOut}
                    className="text-gray-600 hover:text-[#FF5A5F] font-medium transition-all duration-300 cursor-pointer"
                  >
                    logout
                  </button>
                ) :
                  (<>
                    <NavLink
                      to="/"
                      className={({ isActive }) => isActive ? `text-[#FF5A5F] border-b border-[#FF5A5F] pb-1 transition-all duration-100` : normalStyle}
                    >
                      Airbnb your home
                    </NavLink>
                    <NavLink
                      to="/signup"
                      className={({ isActive }) => isActive ? activeStyle : normalStyle}
                    >
                      Signup
                    </NavLink>
                    <NavLink
                      to="/login"
                      className={({ isActive }) => isActive ? activeStyle : normalStyle}
                    >
                      Login
                    </NavLink>
                  </>)


              }
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
        className={`md:hidden overflow-hidden transition-all duration-500 ease-in-out ${isOpen ? 'max-h-60 opacity-100 border-t' : 'max-h-0 opacity-0'
          }`}
      >
        <div className="px-4 py-4 space-y-2 bg-gray-50">

          <div className="flex items-center border border-gray-200 rounded-xl py-2 px-3 shadow-xs bg-white focus-within:border-[#FF5A5F] transition-all">
            <svg className="h-4 w-4 text-[#FF5A5F] flex-shrink-0 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              placeholder="Where to? Search country..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full text-sm font-medium text-gray-800 bg-transparent border-none outline-none placeholder-gray-400"
            />
          </div>



          <NavLink
            to="/"
            onClick={() => setIsOpen(false)}
            className={({ isActive }) => `block px-4 py-3 rounded-xl text-base font-semibold transition-all ${isActive ? 'bg-[#FF5A5F] text-white shadow-md' : 'text-gray-700 hover:bg-white hover:text-[#FF5A5F]'
              }`}
          >
            All Listings
          </NavLink>
          <NavLink
            to="/listings/create_listing"
            onClick={() => setIsOpen(false)}
            className={({ isActive }) => `block px-4 py-3 rounded-xl text-base font-semibold transition-all ${isActive ? 'bg-[#FF5A5F] text-white shadow-md' : 'text-gray-700 hover:bg-white hover:text-[#FF5A5F]'
              }`}
          >
            Add New Listing
          </NavLink>
          {
            user ? (
              // FIXED: NavLink ko poora hata diya, simple button lagaya hai
              <button
                onClick={logedOut}
                className="px-4 py-3 text-gray-600 hover:text-[#FF5A5F] font-medium transition-all duration-300 cursor-pointer"
              >
                Logout
              </button>
            ) :
              <>
                <NavLink
                  to="/signup"
                  onClick={() => setIsOpen(false)}
                  className={({ isActive }) => `block px-4 py-3 rounded-xl text-base font-semibold transition-all ${isActive ? 'bg-[#FF5A5F] text-white shadow-md' : 'text-gray-700 hover:bg-white hover:text-[#FF5A5F]'}`}
                >
                  Sign up
                </NavLink>
                <NavLink
                  to="/login"
                  onClick={() => setIsOpen(false)}
                  className={({ isActive }) => `block px-4 py-3 rounded-xl text-base font-semibold transition-all ${isActive ? 'bg-[#FF5A5F] text-white shadow-md' : 'text-gray-700 hover:bg-white hover:text-[#FF5A5F]'}`}
                >
                  Login
                </NavLink>
              </>


          }
        </div>
      </div>
    </nav>
  );
};

export default Navbar;