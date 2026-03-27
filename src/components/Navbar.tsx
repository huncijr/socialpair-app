/**
 * Navigation bar component for the SocialPair application
 */
import { Link, useLocation } from 'react-router-dom';

/** Main navigation component with links to all pages */
export function Navbar() {
  const location = useLocation();

  /** Check if a route is currently active */
  const isActive = (path: string): boolean => location.pathname === path;

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <Link to="/" className="text-2xl font-bold text-indigo-600">
            SocialPair
          </Link>
          <div className="flex gap-6">
            <Link
              to="/"
              className={`font-medium transition-colors ${
                isActive('/') ? 'text-indigo-600' : 'text-gray-600 hover:text-indigo-600'
              }`}
            >
              Home
            </Link>
            <Link
              to="/compare"
              className={`font-medium transition-colors ${
                isActive('/compare') ? 'text-indigo-600' : 'text-gray-600 hover:text-indigo-600'
              }`}
            >
              Compare
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
