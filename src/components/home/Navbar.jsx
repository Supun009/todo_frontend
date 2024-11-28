import React, { useState } from "react";
import Hamburger from "hamburger-react";
import { logout } from "../../services/AuthService";
import { useNavigate } from "react-router-dom";

export default function Navbar({ theme }) {
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleLogout = () => {
    logout();
    navigate("/login", { replace: true });
  };

  const NavButton = ({ children, onClick, className = "" }) => (
    <button
      onClick={onClick}
      className={`
        px-4 py-2 
        ${theme === true
          ? "bg-gradient-to-r from-gray-700 to-gray-800 hover:from-gray-600 hover:to-gray-700 text-white"
          : "bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white"
        }
        rounded-lg 
        shadow-md 
        transition-all 
        duration-300 
        ease-in-out 
        transform 
        hover:scale-105 
        focus:outline-none 
        focus:ring-2 
        ${theme === true ? "focus:ring-gray-400" : "focus:ring-blue-400"} 
        focus:ring-opacity-75
        ${className}
      `}
    >
      {children}
    </button>
  );

  return (
    <nav className={`${theme === true ? "bg-gray-800 text-white" : "bg-white text-gray-800"} shadow-md`}>
      {/* Full-width container for consistent padding */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo or App Name */}
          <div className="flex items-center">
            <span className="text-2xl font-bold">
              To Do
            </span>
          </div>

          {/* Desktop Navigation - Visible on medium and larger screens */}
          <div className="hidden md:flex items-center space-x-4">
            <NavButton>Home</NavButton>
            <NavButton>Profile</NavButton>
            <NavButton onClick={handleLogout}>Log out</NavButton>
          </div>

          {/* Mobile Menu Toggle - Visible only on smaller screens */}
          <div className="md:hidden">
            <Hamburger
              toggle={setIsSidebarOpen}
              toggled={isSidebarOpen}
              direction="right"
              color={theme === true ? "#FFFFFF" : "#2563eb"}
            />
          </div>
        </div>

        {/* Mobile Sidebar - Slide-out menu */}
        <div
          className={`
            fixed 
            top-0 
            right-0 
            h-full 
            w-64 
            ${theme === true ? "bg-gray-900 text-white" : "bg-white text-gray-800"} 
            shadow-2xl 
            transform 
            transition-transform 
            duration-300 
            ease-in-out 
            md:hidden 
            z-40 
            ${isSidebarOpen ? "translate-x-0" : "translate-x-full"}
          `}
        >
          <div className="pt-16 px-4">
            <div className="space-y-2">
              <NavButton
                className="w-full"
                onClick={() => {
                  /* Handle Home Navigation */
                }}
              >
                Home
              </NavButton>
              <NavButton
                className="w-full"
                onClick={() => {
                  /* Handle Profile Navigation */
                }}
              >
                Profile
              </NavButton>
              <NavButton className="w-full" onClick={handleLogout}>
                Log out
              </NavButton>
            </div>
          </div>
        </div>

        {/* Mobile Overlay */}
        {isSidebarOpen && (
          <div
            onClick={toggleSidebar}
            className={`fixed inset-0 ${theme === true ? "bg-gray-900 opacity-75" : "bg-black opacity-50"} z-30 backdrop-blur-sm md:hidden`}
          />
        )}
      </div>
    </nav>
  );
}
