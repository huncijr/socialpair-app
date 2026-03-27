/**
 * Compare page for side-by-side platform comparison
 */
import { useState } from 'react';
import { toast } from 'sonner';
import { platforms } from '../data/platforms';
import { ComparisonTable } from '../components/ComparisonTable';
import { StatisticsChart } from '../components/StatisticsChart';
import { useAuth } from '../context/AuthContext';

/**
 * Renders a comparison view where user selects two platforms to compare
 */
export function ComparePage() {
  const [selectedA, setSelectedA] = useState<string>('facebook');
  const [selectedB, setSelectedB] = useState<string>('instagram');
  const { isAuthenticated } = useAuth();

  const platformA = platforms.find((p) => p.id === selectedA);
  const platformB = platforms.find((p) => p.id === selectedB);

  const comparedPlatforms = [platformA, platformB].filter(
    (p): p is NonNullable<typeof p> => p !== undefined
  );

  /** Save comparison */
  const handleSave = () => {
    if (!isAuthenticated) {
      toast.error('Please log in to save comparisons');
      return;
    }
    toast.success('Comparison saved to your favorites!');
  };

  /** Export comparison to CSV */
  const handleExport = () => {
    if (!isAuthenticated) {
      toast.error('Please log in to export data');
      return;
    }

    if (!platformA || !platformB) return;

    const csvContent = [
      ['Metric', platformA.name, platformB.name],
      ['Founded', platformA.founded.toString(), platformB.founded.toString()],
      ['Monthly Users (M)', platformA.monthlyUsers.toString(), platformB.monthlyUsers.toString()],
      ['Peak Users (M)', platformA.peakUsers.toString(), platformB.peakUsers.toString()],
      ['Peak Year', platformA.peakYear.toString(), platformB.peakYear.toString()],
      ['Target Age', platformA.targetAge, platformB.targetAge],
      ['Purpose', platformA.purpose, platformB.purpose],
      ['Fame Score', platformA.fameScore.toString(), platformB.fameScore.toString()],
    ]
      .map((row) => row.map((cell) => `"${cell}"`).join(','))
      .join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `comparison-${platformA.id}-vs-${platformB.id}.csv`;
    a.click();
    URL.revokeObjectURL(url);
    toast.success('Comparison exported successfully!');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-3">Compare Platforms</h1>
        <p className="text-lg text-gray-600 dark:text-gray-300">
          Select two social media platforms to compare side-by-side
        </p>
      </div>

      {/* Selectors */}
      <div className="flex flex-col md:flex-row gap-4 justify-center mb-10">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Platform A
          </label>
          <select
            value={selectedA}
            onChange={(e) => setSelectedA(e.target.value)}
            className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
          >
            {platforms.map((p) => (
              <option key={p.id} value={p.id}>
                {p.name}
              </option>
            ))}
          </select>
        </div>
        <div className="flex items-end">
          <span className="text-2xl font-bold text-gray-400 pb-1">VS</span>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Platform B
          </label>
          <select
            value={selectedB}
            onChange={(e) => setSelectedB(e.target.value)}
            className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-pink-500 focus:border-pink-500 transition-all duration-200"
          >
            {platforms.map((p) => (
              <option key={p.id} value={p.id}>
                {p.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Action Buttons */}
      {comparedPlatforms.length === 2 && (
        <div className="flex justify-center gap-4 mb-10">
          <button
            onClick={handleSave}
            className="px-6 py-3 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-gray-900"
          >
            Save Comparison
          </button>
          <button
            onClick={handleExport}
            className="px-6 py-3 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg font-medium hover:bg-gray-200 dark:hover:bg-gray-600 transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-gray-900"
          >
            Export to CSV
          </button>
        </div>
      )}

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
