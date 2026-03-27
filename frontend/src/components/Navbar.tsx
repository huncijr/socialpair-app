/**
 * Navigation bar component for the SocialPair application
 */
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { toast } from 'sonner';
import { DarkModeToggle } from './DarkModeToggle';
import { useAuth } from '../context/AuthContext';

/** Main navigation component with links to all pages */
export function Navbar() {
  const location = useLocation();
  const { user, isAuthenticated, logout } = useAuth();
  const [showUserMenu, setShowUserMenu] = useState(false);

  /** Check if a route is currently active */
  const isActive = (path: string): boolean => location.pathname === path;

  /** Handle user logout */
  const handleLogout = () => {
    logout();
    setShowUserMenu(false);
    toast.success('Logged out successfully');
  };

  return (
    <nav className="bg-white dark:bg-gray-900 shadow-md sticky top-0 z-50 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center gap-6">
            <Link
              to="/"
              className="text-2xl font-bold text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 rounded-lg px-2"
            >
              SocialPair
            </Link>
            <div className="hidden md:flex items-center gap-4">
              <Link
                to="/"
                className={`font-medium transition-all duration-200 px-3 py-2 rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 ${
                  isActive('/')
                    ? 'text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-900/30'
                    : 'text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-gray-100 dark:hover:bg-gray-800'
                }`}
              >
                Home
              </Link>
              <Link
                to="/compare"
                className={`font-medium transition-all duration-200 px-3 py-2 rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 ${
                  isActive('/compare')
                    ? 'text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-900/30'
                    : 'text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-gray-100 dark:hover:bg-gray-800'
                }`}
              >
                Compare
              </Link>
            </div>
          </div>

          <div className="flex items-center gap-4">
            {isAuthenticated && (
              <div className="hidden md:flex items-center gap-4">
                <Link
                  to="/saved"
                  className={`font-medium transition-all duration-200 px-3 py-2 rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 ${
                    isActive('/saved')
                      ? 'text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-900/30'
                      : 'text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-gray-100 dark:hover:bg-gray-800'
                  }`}
                >
                  Saved
                </Link>
                <Link
                  to="/alerts"
                  className={`font-medium transition-all duration-200 px-3 py-2 rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 ${
                    isActive('/alerts')
                      ? 'text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-900/30'
                      : 'text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-gray-100 dark:hover:bg-gray-800'
                  }`}
                >
                  Alerts
                </Link>
                <Link
                  to="/notes"
                  className={`font-medium transition-all duration-200 px-3 py-2 rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 ${
                    isActive('/notes')
                      ? 'text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-900/30'
                      : 'text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-gray-100 dark:hover:bg-gray-800'
                  }`}
                >
                  Notes
                </Link>
                <Link
                  to="/templates"
                  className={`font-medium transition-all duration-200 px-3 py-2 rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 ${
                    isActive('/templates')
                      ? 'text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-900/30'
                      : 'text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-gray-100 dark:hover:bg-gray-800'
                  }`}
                >
                  Templates
                </Link>
              </div>
            )}

            {isAuthenticated ? (
              <div className="relative">
                <button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
                >
                  <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center text-white text-sm font-bold">
                    {user?.name?.charAt(0).toUpperCase()}
                  </div>
                  <span className="hidden sm:block text-sm font-medium text-gray-700 dark:text-gray-300">
                    {user?.name}
                  </span>
                  <svg
                    className="w-4 h-4 text-gray-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {showUserMenu && (
                  <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700 py-1 z-50">
                    <Link
                      to="/profile"
                      onClick={() => setShowUserMenu(false)}
                      className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-200"
                    >
                      My Profile
                    </Link>
                    <hr className="border-gray-100 dark:border-gray-700 my-1" />
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-all duration-200"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link
                  to="/login"
                  className={`px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 ${
                    isActive('/login')
                      ? 'text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-900/30'
                      : 'text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-gray-100 dark:hover:bg-gray-800'
                  }`}
                >
                  Sign In
                </Link>
                <Link
                  to="/register"
                  className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-gray-900"
                >
                  Sign Up
                </Link>
              </div>
            )}

            <DarkModeToggle />
          </div>
        </div>
      </div>
    </nav>
  );
}
