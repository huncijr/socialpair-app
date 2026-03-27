/**
 * Compare page for side-by-side platform comparison
 */
import { useState } from 'react';
import { platforms } from '../data/platforms';
import { ComparisonTable } from '../components/ComparisonTable';
import { StatisticsChart } from '../components/StatisticsChart';

/**
 * Renders a comparison view where user selects two platforms to compare
 */
export function ComparePage() {
  const [selectedA, setSelectedA] = useState<string>('facebook');
  const [selectedB, setSelectedB] = useState<string>('instagram');

  const platformA = platforms.find((p) => p.id === selectedA);
  const platformB = platforms.find((p) => p.id === selectedB);

  const comparedPlatforms = [platformA, platformB].filter(
    (p): p is NonNullable<typeof p> => p !== undefined
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold text-gray-900 mb-3">Compare Platforms</h1>
        <p className="text-lg text-gray-600">
          Select two social media platforms to compare side-by-side
        </p>
      </div>

      {/* Selectors */}
      <div className="flex flex-col md:flex-row gap-4 justify-center mb-10">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Platform A
          </label>
          <select
            value={selectedA}
            onChange={(e) => setSelectedA(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg bg-white text-gray-900 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          >
            {platforms.map((p) => (
              <option key={p.id} value={p.id}>
                {p.logo} {p.name}
              </option>
            ))}
          </select>
        </div>
        <div className="flex items-end">
          <span className="text-2xl font-bold text-gray-400 pb-1">VS</span>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Platform B
          </label>
          <select
            value={selectedB}
            onChange={(e) => setSelectedB(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg bg-white text-gray-900 focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
          >
            {platforms.map((p) => (
              <option key={p.id} value={p.id}>
                {p.logo} {p.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Comparison */}
      {comparedPlatforms.length === 2 && (
        <>
          <ComparisonTable platforms={comparedPlatforms} />
          <div className="mt-8">
            <StatisticsChart platforms={comparedPlatforms} />
          </div>
        </>
      )}
    </div>
  );
}
