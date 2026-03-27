/**
 * Saved comparisons page component
 */
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'sonner';
import { useAuth } from '../context/AuthContext';

const API_BASE_URL = 'http://localhost:3001/api';

/** Saved comparison type */
interface SavedComparison {
  id: string;
  name: string;
  platforms: string[];
  notes: string | null;
  data: Record<string, unknown>;
  createdAt: string;
  updatedAt: string;
}

/**
 * Renders the saved comparisons page
 */
export function SavedComparisonsPage() {
  const { token, isAuthenticated } = useAuth();
  const [comparisons, setComparisons] = useState<SavedComparison[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  useEffect(() => {
    if (isAuthenticated && token) {
      fetchComparisons();
    }
  }, [isAuthenticated, token]);

  /**
   * Fetch saved comparisons from backend
   */
  const fetchComparisons = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/comparisons`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch comparisons');
      }

      const data = await response.json();
      setComparisons(data.comparisons);
    } catch (error) {
      toast.error('Failed to load saved comparisons');
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Delete a saved comparison
   */
  const handleDelete = async (id: string) => {
    try {
      const response = await fetch(`${API_BASE_URL}/comparisons/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to delete comparison');
      }

      setComparisons((prev) => prev.filter((c) => c.id !== id));
      toast.success('Comparison deleted successfully');
    } catch (error) {
      toast.error('Failed to delete comparison');
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-10 text-center">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          Please log in to view saved comparisons
        </h1>
        <Link
          to="/login"
          className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-all duration-200"
        >
          Sign In
        </Link>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-10">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Saved Comparisons</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6 border border-gray-100 dark:border-gray-700 animate-pulse">
              <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded mb-4"></div>
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded mb-2"></div>
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Saved Comparisons</h1>
        <Link
          to="/compare"
          className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
        >
          New Comparison
        </Link>
      </div>

      {comparisons.length === 0 ? (
        <div className="text-center py-16">
          <div className="text-6xl mb-4">💾</div>
          <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-2">
            No saved comparisons yet
          </h3>
          <p className="text-gray-500 dark:text-gray-400 mb-6">
            Start comparing platforms and save your favorite comparisons
          </p>
          <Link
            to="/compare"
            className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-all duration-200"
          >
            Start Comparing
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {comparisons.map((comparison) => (
            <div
              key={comparison.id}
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6 border border-gray-100 dark:border-gray-700 transition-all duration-200 hover:shadow-lg"
            >
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                  {comparison.name}
                </h3>
                <button
                  onClick={() => setSelectedId(selectedId === comparison.id ? null : comparison.id)}
                  className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                >
                  ⋮
                </button>
              </div>

              <div className="flex flex-wrap gap-2 mb-4">
                {comparison.platforms.map((platform) => (
                  <span
                    key={platform}
                    className="px-2 py-1 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 rounded-lg text-sm"
                  >
                    {platform}
                  </span>
                ))}
              </div>

              {comparison.notes && (
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-2">
                  {comparison.notes}
                </p>
              )}

              <div className="flex justify-between items-center text-sm text-gray-500 dark:text-gray-400">
                <span>
                  {new Date(comparison.createdAt).toLocaleDateString()}
                </span>
                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(JSON.stringify(comparison.data));
                      toast.success('Comparison data copied to clipboard');
                    }}
                    className="px-3 py-1 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-900/30 rounded-lg transition-all duration-200"
                  >
                    Copy
                  </button>
                  <button
                    onClick={() => handleDelete(comparison.id)}
                    className="px-3 py-1 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-lg transition-all duration-200"
                  >
                    Delete
                  </button>
                </div>
              </div>

              {selectedId === comparison.id && (
                <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    {comparison.notes || 'No additional notes'}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
