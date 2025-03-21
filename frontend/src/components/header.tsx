import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Menu as MenuIcon, X as CloseIcon, User } from "lucide-react";

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Handle header background change on scroll
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Simulate authentication state (replace with real auth logic if available)
  const isAuthenticated = false;

  // Navigation links array for easy maintenance and mapping
  const navigationLinks = [
    { name: "Home", path: "/" },
    { name: "Templates", path: "/templates" },
    { name: "Dashboard", path: "/dashboard" },
    { name: "Resources", path: "/resources" },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ${
          isScrolled ? "bg-white shadow-md" : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-8 h-16 flex items-center justify-between">
          {/* Logo Section */}
          <Link to="/" className="flex items-center">
            <span className="font-arial text-2xl text-[#34495e]">
              Creative Tool
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-6">
            {navigationLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className="font-helvetica text-base text-[#34495e] hover:text-[#3498db] transition-colors duration-300"
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Right Controls */}
          <div className="flex items-center space-x-4">
            {/* Create Project Button (visible on desktop) */}
            <Link to="/create-project" className="hidden md:inline-block">
              <button className="bg-[#3498db] text-white font-semibold py-2 px-4 rounded transition-colors duration-300 hover:bg-opacity-90">
                Create Project
              </button>
            </Link>
            {/* Authentication Controls (desktop view) */}
            {isAuthenticated ? (
              <button className="hidden md:inline-flex items-center p-2 rounded-full hover:bg-gray-100 transition-colors duration-300">
                <User className="w-6 h-6 text-[#34495e]" />
              </button>
            ) : (
              <div className="hidden md:flex space-x-2">
                <Link to="/login">
                  <button className="font-semibold text-[#3498db] hover:underline transition-colors duration-300">
                    Login
                  </button>
                </Link>
                <Link to="/signup">
                  <button className="font-semibold text-[#3498db] hover:underline transition-colors duration-300">
                    Sign Up
                  </button>
                </Link>
              </div>
            )}
            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-inset focus:ring-[#3498db]"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? (
                <CloseIcon className="w-6 h-6 text-[#34495e]" />
              ) : (
                <MenuIcon className="w-6 h-6 text-[#34495e]" />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-0 bg-white z-40 flex flex-col p-4 transition-all duration-300 overflow-auto">
          <div className="flex items-center justify-between mb-6">
            <Link
              to="/"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center"
            >
              <span className="font-arial text-2xl text-[#34495e]">
                Creative Tool
              </span>
            </Link>
            <button
              className="p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-inset focus:ring-[#3498db]"
              onClick={() => setMobileMenuOpen(false)}
              aria-label="Close navigation menu"
            >
              <CloseIcon className="w-6 h-6 text-[#34495e]" />
            </button>
          </div>
          <nav className="flex flex-col space-y-4 mb-6">
            {navigationLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className="font-helvetica text-lg text-[#34495e] hover:text-[#3498db] transition-colors duration-300"
              >
                {link.name}
              </Link>
            ))}
          </nav>
          <div className="flex flex-col space-y-4">
            <Link to="/create-project" onClick={() => setMobileMenuOpen(false)}>
              <button className="w-full bg-[#3498db] text-white font-semibold py-2 px-4 rounded transition-colors duration-300 hover:bg-opacity-90">
                Create Project
              </button>
            </Link>
            {isAuthenticated ? (
              <button className="w-full flex items-center justify-center p-2 rounded-md border border-gray-300 hover:bg-gray-100 transition-colors duration-300">
                <User className="w-6 h-6 mr-2 text-[#34495e]" />
                Profile
              </button>
            ) : (
              <div className="flex flex-col space-y-2">
                <Link to="/login" onClick={() => setMobileMenuOpen(false)}>
                  <button className="w-full font-semibold text-[#3498db] text-left hover:underline transition-colors duration-300">
                    Login
                  </button>
                </Link>
                <Link to="/signup" onClick={() => setMobileMenuOpen(false)}>
                  <button className="w-full font-semibold text-[#3498db] text-left hover:underline transition-colors duration-300">
                    Sign Up
                  </button>
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Header;