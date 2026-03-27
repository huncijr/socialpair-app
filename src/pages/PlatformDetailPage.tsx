/**
 * Platform detail page showing full information about a single platform
 */
import { useParams, Link } from 'react-router-dom';
import { platforms } from '../data/platforms';
import { StatisticsChart } from '../components/StatisticsChart';

/**
 * Renders detailed view of a single social media platform
 */
export function PlatformDetailPage() {
  const { id } = useParams<{ id: string }>();
  const platform = platforms.find((p) => p.id === id);

  if (!platform) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-10 text-center">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Platform not found</h1>
        <Link to="/" className="text-indigo-600 dark:text-indigo-400 hover:underline">
          Back to Home
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <Link
        to="/"
        className="text-indigo-600 dark:text-indigo-400 hover:underline text-sm mb-6 inline-block focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 rounded"
      >
        &larr; Back to all platforms
      </Link>

      {/* Header */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-8 border border-gray-100 dark:border-gray-700 mb-8 transition-colors duration-200">
        <div className="flex items-center gap-6 mb-6">
          <span className="text-6xl transition-transform duration-200 hover:scale-110">
            {platform.logo}
          </span>
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              {platform.name}
            </h1>
            <p className="text-gray-500 dark:text-gray-400">
              Founded {platform.founded} by {platform.founder}
            </p>
            <p className="text-gray-400 dark:text-gray-500 text-sm">
              Owned by {platform.company}
            </p>
          </div>
        </div>
        <p className="text-gray-700 dark:text-gray-300">{platform.description}</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-5 border border-gray-100 dark:border-gray-700 text-center transition-colors duration-200">
          <p className="text-gray-400 dark:text-gray-500 text-sm">Monthly Users</p>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">
            {platform.monthlyUsers.toLocaleString()}M
          </p>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-5 border border-gray-100 dark:border-gray-700 text-center transition-colors duration-200">
          <p className="text-gray-400 dark:text-gray-500 text-sm">Peak Users</p>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">
            {platform.peakUsers.toLocaleString()}M
          </p>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-5 border border-gray-100 dark:border-gray-700 text-center transition-colors duration-200">
          <p className="text-gray-400 dark:text-gray-500 text-sm">Peak Year</p>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">
            {platform.peakYear}
          </p>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-5 border border-gray-100 dark:border-gray-700 text-center transition-colors duration-200">
          <p className="text-gray-400 dark:text-gray-500 text-sm">Fame Score</p>
          <p className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">
            {platform.fameScore}/100
          </p>
        </div>
      </div>

      {/* Purpose & Target */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6 border border-gray-100 dark:border-gray-700 transition-colors duration-200">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Purpose</h3>
          <p className="text-gray-600 dark:text-gray-300">{platform.purpose}</p>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6 border border-gray-100 dark:border-gray-700 transition-colors duration-200">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Target Age Group</h3>
          <p className="text-gray-600 dark:text-gray-300">{platform.targetAge} years old</p>
        </div>
      </div>

      {/* Pros & Cons */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-green-50 dark:bg-green-900/20 rounded-2xl p-6 border border-green-100 dark:border-green-800 transition-colors duration-200">
          <h3 className="text-lg font-bold text-green-800 dark:text-green-400 mb-4">Pros</h3>
          <ul className="space-y-2">
            {platform.pros.map((pro, index) => (
              <li key={index} className="flex items-start gap-2 text-green-700 dark:text-green-300">
                <span className="text-green-500 mt-0.5">+</span>
                {pro.text}
              </li>
            ))}
          </ul>
        </div>
        <div className="bg-red-50 dark:bg-red-900/20 rounded-2xl p-6 border border-red-100 dark:border-red-800 transition-colors duration-200">
          <h3 className="text-lg font-bold text-red-800 dark:text-red-400 mb-4">Cons</h3>
          <ul className="space-y-2">
            {platform.cons.map((con, index) => (
              <li key={index} className="flex items-start gap-2 text-red-700 dark:text-red-300">
                <span className="text-red-500 mt-0.5">-</span>
                {con.text}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Chart */}
      <StatisticsChart platforms={[platform]} />
    </div>
  );
}
