/**
 * Platform card component displaying a social media platform summary
 */
import { Link } from 'react-router-dom';
import type { Platform } from '../types/platform';

/** Props for the PlatformCard component */
interface PlatformCardProps {
  platform: Platform;
}

/**
 * Renders a card with platform summary information
 * @param props - The platform data to display
 */
export function PlatformCard({ platform }: PlatformCardProps) {
  return (
    <Link
      to={`/platform/${platform.id}`}
      className="block bg-white rounded-2xl shadow-md hover:shadow-xl transition-shadow p-6 border border-gray-100"
    >
      <div className="flex items-center gap-4 mb-4">
        <span className="text-4xl">{platform.logo}</span>
        <div>
          <h2 className="text-xl font-bold text-gray-900">{platform.name}</h2>
          <p className="text-sm text-gray-500">Founded {platform.founded}</p>
        </div>
      </div>
      <p className="text-gray-600 text-sm mb-4 line-clamp-2">{platform.description}</p>
      <div className="flex justify-between text-sm">
        <div>
          <p className="text-gray-400">Monthly Users</p>
          <p className="font-semibold text-gray-900">
            {platform.monthlyUsers.toLocaleString()}M
          </p>
        </div>
        <div>
          <p className="text-gray-400">Target Age</p>
          <p className="font-semibold text-gray-900">{platform.targetAge}</p>
        </div>
        <div>
          <p className="text-gray-400">Fame Score</p>
          <p className="font-semibold text-indigo-600">{platform.fameScore}/100</p>
        </div>
      </div>
    </Link>
  );
}
