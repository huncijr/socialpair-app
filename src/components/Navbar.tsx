/**
 * Navigation bar component for the SocialPair application
 */
import { Link, useLocation } from 'react-router-dom';
import { DarkModeToggle } from './DarkModeToggle';

/** Main navigation component with links to all pages */
export function Navbar() {
  const location = useLocation();

  /** Check if a route is currently active */
  const isActive = (path: string): boolean => location.pathname === path;

  return (
    <nav className="bg-white dark:bg-gray-900 shadow-md sticky top-0 z-50 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <Link
            to="/"
            className="text-2xl font-bold text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 rounded-lg px-2"
          >
            SocialPair
          </Link>
          <div className="flex items-center gap-6">
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
            <DarkModeToggle />
          </div>
        </div>
      </div>
    </nav>
  );
}
