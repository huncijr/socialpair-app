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
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Platform not found</h1>
        <Link to="/" className="text-indigo-600 hover:underline">
          Back to Home
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <Link to="/" className="text-indigo-600 hover:underline text-sm mb-6 inline-block">
        &larr; Back to all platforms
      </Link>

      {/* Header */}
      <div className="bg-white rounded-2xl shadow-md p-8 border border-gray-100 mb-8">
        <div className="flex items-center gap-6 mb-6">
          <span className="text-6xl">{platform.logo}</span>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{platform.name}</h1>
            <p className="text-gray-500">
              Founded {platform.founded} by {platform.founder}
            </p>
            <p className="text-gray-400 text-sm">Owned by {platform.company}</p>
          </div>
        </div>
        <p className="text-gray-700">{platform.description}</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-white rounded-xl shadow-sm p-5 border border-gray-100 text-center">
          <p className="text-gray-400 text-sm">Monthly Users</p>
          <p className="text-2xl font-bold text-gray-900">{platform.monthlyUsers.toLocaleString()}M</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-5 border border-gray-100 text-center">
          <p className="text-gray-400 text-sm">Peak Users</p>
          <p className="text-2xl font-bold text-gray-900">{platform.peakUsers.toLocaleString()}M</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-5 border border-gray-100 text-center">
          <p className="text-gray-400 text-sm">Peak Year</p>
          <p className="text-2xl font-bold text-gray-900">{platform.peakYear}</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-5 border border-gray-100 text-center">
          <p className="text-gray-400 text-sm">Fame Score</p>
          <p className="text-2xl font-bold text-indigo-600">{platform.fameScore}/100</p>
        </div>
      </div>

      {/* Purpose & Target */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-white rounded-2xl shadow-md p-6 border border-gray-100">
          <h3 className="text-lg font-bold text-gray-900 mb-2">Purpose</h3>
          <p className="text-gray-600">{platform.purpose}</p>
        </div>
        <div className="bg-white rounded-2xl shadow-md p-6 border border-gray-100">
          <h3 className="text-lg font-bold text-gray-900 mb-2">Target Age Group</h3>
          <p className="text-gray-600">{platform.targetAge} years old</p>
        </div>
      </div>

      {/* Pros & Cons */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-green-50 rounded-2xl p-6 border border-green-100">
          <h3 className="text-lg font-bold text-green-800 mb-4">Pros</h3>
          <ul className="space-y-2">
            {platform.pros.map((pro, index) => (
              <li key={index} className="flex items-start gap-2 text-green-700">
                <span className="text-green-500 mt-0.5">+</span>
                {pro.text}
              </li>
            ))}
          </ul>
        </div>
        <div className="bg-red-50 rounded-2xl p-6 border border-red-100">
          <h3 className="text-lg font-bold text-red-800 mb-4">Cons</h3>
          <ul className="space-y-2">
            {platform.cons.map((con, index) => (
              <li key={index} className="flex items-start gap-2 text-red-700">
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
