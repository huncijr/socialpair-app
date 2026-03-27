/**
 * Home page component displaying all social media platforms
 */
import { platforms } from '../data/platforms';
import { PlatformCard } from '../components/PlatformCard';

/**
 * Renders the home page with platform cards grid
 */
export function HomePage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold text-gray-900 mb-3">
          Social Pair
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Compare social media platforms. Explore user statistics, fame potential,
          pros and cons, and find the best platform for your goals.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {platforms.map((platform) => (
          <PlatformCard key={platform.id} platform={platform} />
        ))}
      </div>
    </div>
  );
}
