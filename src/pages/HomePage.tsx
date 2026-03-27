/**
 * Home page component displaying all social media platforms
 * with search, filter, and sorting functionality
 */
import { useState, useMemo } from 'react';
import { platforms } from '../data/platforms';
import { PlatformCard } from '../components/PlatformCard';

/** Sort options for platform list */
type SortOption = 'name' | 'monthlyUsers' | 'founded' | 'fameScore';

/** Sort direction */
type SortDirection = 'asc' | 'desc';

/**
 * Renders the home page with platform cards grid, search, and sort functionality
 */
export function HomePage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<SortOption>('monthlyUsers');
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc');

  /** Filter and sort platforms based on current state */
  const filteredAndSortedPlatforms = useMemo(() => {
    // Filter by search query
    let result = platforms.filter((platform) => {
      const query = searchQuery.toLowerCase();
      return (
        platform.name.toLowerCase().includes(query) ||
        platform.company.toLowerCase().includes(query) ||
        platform.purpose.toLowerCase().includes(query) ||
        platform.targetAge.includes(query)
      );
    });

    // Sort platforms
    result.sort((a, b) => {
      let comparison = 0;
      switch (sortBy) {
        case 'name':
          comparison = a.name.localeCompare(b.name);
          break;
        case 'monthlyUsers':
          comparison = a.monthlyUsers - b.monthlyUsers;
          break;
        case 'founded':
          comparison = a.founded - b.founded;
          break;
        case 'fameScore':
          comparison = a.fameScore - b.fameScore;
          break;
      }
      return sortDirection === 'asc' ? comparison : -comparison;
    });

    return result;
  }, [searchQuery, sortBy, sortDirection]);

  /** Toggle sort direction */
  const toggleSortDirection = () => {
    setSortDirection((prev) => (prev === 'asc' ? 'desc' : 'asc'));
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-3">
          Social Pair
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          Compare social media platforms. Explore user statistics, fame potential,
          pros and cons, and find the best platform for your goals.
        </p>
      </div>

      {/* Search and Sort Controls */}
      <div className="flex flex-col md:flex-row gap-4 mb-8 items-center justify-between">
        {/* Search Input */}
        <div className="relative w-full md:w-96">
          <input
            type="text"
            placeholder="Search platforms by name, company, or purpose..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-200"
          />
          <svg
            className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>

        {/* Sort Controls */}
        <div className="flex items-center gap-3">
          <span className="text-sm text-gray-600 dark:text-gray-400">Sort by:</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as SortOption)}
            className="px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-200"
          >
            <option value="monthlyUsers">Monthly Users</option>
            <option value="founded">Founded Year</option>
            <option value="fameScore">Fame Score</option>
            <option value="name">Name</option>
          </select>
          <button
            onClick={toggleSortDirection}
            className="p-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            title={sortDirection === 'asc' ? 'Ascending' : 'Descending'}
          >
            {sortDirection === 'asc' ? (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12" />
              </svg>
            ) : (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4h13M3 8h9m-9 4h9m5-4v12m0 0l-4-4m4 4l4-4" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Results Count */}
      <div className="mb-6">
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Showing {filteredAndSortedPlatforms.length} of {platforms.length} platforms
        </p>
      </div>

      {/* Platform Grid */}
      {filteredAndSortedPlatforms.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAndSortedPlatforms.map((platform) => (
            <PlatformCard key={platform.id} platform={platform} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <div className="text-6xl mb-4">🔍</div>
          <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-2">
            No platforms found
          </h3>
          <p className="text-gray-500 dark:text-gray-400">
            Try adjusting your search query or filters
          </p>
        </div>
      )}
    </div>
  );
}
