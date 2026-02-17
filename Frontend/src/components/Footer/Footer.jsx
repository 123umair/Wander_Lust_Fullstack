import React from 'react';
import { Globe, Facebook, Twitter, Instagram } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-[#f7f7f7] border-t border-gray-200 pt-12 pb-8 px-4 sm:px-8 lg:px-20">
      <div className="max-w-7xl mx-auto">
        
        {/* Bottom Section: Links & Settings */}
        <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0 text-sm text-gray-800">
          
          {/* Left Side: Copy & Links */}
          <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-2">
            <span>© 2026 Airbnb, Inc.</span>
            <span className="hidden md:inline">·</span>
            <div className="flex space-x-2">
              <a href="#" className="hover:underline">Privacy</a>
              <span>·</span>
              <a href="#" className="hover:underline">Terms</a>
              <span>·</span>
              <a href="#" className="hover:underline">Sitemap</a>
              <span>·</span>
              <a href="#" className="hover:underline">Company details</a>
            </div>
          </div>

          {/* Right Side: Language, Currency & Socials */}
          <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-6">
            
            {/* Lang & Currency */}
            <div className="flex items-center space-x-4 font-semibold">
              <button className="flex items-center hover:underline">
                <Globe className="w-4 h-4 mr-2" />
                English (IN)
              </button>
              <button className="flex items-center hover:underline">
                ₹ INR
              </button>
            </div>

            {/* Social Icons */}
            <div className="flex items-center space-x-4">
              <a href="#" className="hover:text-black transition-colors">
                <Facebook className="w-5 h-5 fill-current" />
              </a>
              <a href="#" className="hover:text-black transition-colors">
                <Twitter className="w-5 h-5 fill-current" />
              </a>
              <a href="#" className="hover:text-black transition-colors">
                <Instagram className="w-5 h-5 fill-current" />
              </a>
            </div>
          </div>

        </div>
      </div>
    </footer>
  );
};

export default Footer;