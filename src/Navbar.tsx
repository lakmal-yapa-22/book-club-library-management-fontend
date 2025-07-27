import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { UseAuth } from "./context/UseAuth.ts";
import toast from "react-hot-toast";
import axios from "axios";
import { BookOpen, Menu, X } from "lucide-react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const { isLoggedIn, logout } = UseAuth();

  // Hide buttons on these routes
  const hideButtonsOn = ["/login", "/signup"];
  const isAuthPage = hideButtonsOn.includes(location.pathname);

  const handleLogin = () => {
    navigate("/login");
  };

  const handleLogout = async () => {
    try {
      toast.success("Logout successful!");
      logout();
      navigate("/login");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(error.message);
      } else {
        toast.error("Something went wrong");
      }
    }
  };

  const handleDashboard = () => {
    navigate("/dashboard");
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
      <nav className="bg-white shadow-lg border-b border-emerald-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo Section */}
            <div className="flex items-center">
              <div className="flex-shrink-0 flex items-center space-x-2">
                <BookOpen className="h-8 w-8 text-emerald-600" />
                <h1 className="text-xl font-bold text-emerald-600">
                  Library Management
                </h1>
              </div>
            </div>

            {/* Desktop Navigation */}
            {!isAuthPage && (
                <div className="hidden md:flex items-center space-x-3">
                  {!isLoggedIn ? (
                      <button
                          onClick={handleLogin}
                          className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-md text-sm font-medium transition duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 bg-cyan-600 hover:bg-cyan-700 focus:ring-cyan-500"
                      >
                        Login
                      </button>
                  ) : (
                      <button
                          onClick={handleLogout}
                          className="bg-cyan-600 hover:bg-cyan-700 text-white px-4 py-2 rounded-md text-sm font-medium transition duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 bg-emerald-600 hover:bg-emerald-700 focus:ring-emerald-500
"
                      >
                        Logout
                      </button>
                  )}
                </div>
            )}

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                  onClick={toggleMenu}
                  className="text-emerald-500 hover:text-emerald-600 focus:outline-none p-2 rounded-md transition-colors duration-150"
                  aria-label={isMenuOpen ? "Close menu" : "Open menu"}
              >
                {isMenuOpen ? (
                    <X className="h-6 w-6" />
                ) : (
                    <Menu className="h-6 w-6" />
                )}
              </button>
            </div>
          </div>

          {/* Mobile Navigation Menu */}
          {isMenuOpen && !isAuthPage && (
              <div className="md:hidden">
                <div className="px-2 pt-2 pb-3 space-y-2 sm:px-3 border-t border-emerald-200 bg-emerald-50">
                  {!isLoggedIn ? (
                      <button
                          onClick={handleLogin}
                          className="block w-full text-left bg-emerald-600 hover:bg-emerald-700 text-white px-3 py-2 rounded-md text-base font-medium transition duration-150"
                      >
                        Login
                      </button>
                  ) : (
                      <div className="space-y-2">
                        <button
                            onClick={handleDashboard}
                            className="block w-full text-left bg-teal-600 hover:bg-teal-700 text-white px-3 py-2 rounded-md text-base font-medium transition duration-150"
                        >
                          Dashboard
                        </button>
                        <button
                            onClick={handleLogout}
                            className="block w-full text-left bg-cyan-600 hover:bg-cyan-700 text-white px-3 py-2 rounded-md text-base font-medium transition duration-150"
                        >
                          Logout
                        </button>
                      </div>
                  )}
                </div>
              </div>
          )}
        </div>
      </nav>
  );
};

export default Navbar;
