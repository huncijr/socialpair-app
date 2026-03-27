/**
 * Comparison tool component for side-by-side platform comparison
 */
import type { Platform } from '../types/platform';

/** Props for the ComparisonTable component */
interface ComparisonTableProps {
  platforms: Platform[];
}

/**
 * Renders a comparison table between selected platforms
 * @param props - Array of platforms to compare (2 platforms)
 */
export function ComparisonTable({ platforms }: ComparisonTableProps) {
  if (platforms.length < 2) return null;

  const [a, b] = platforms;

  /** Determine which platform is better for a given metric (higher is better) */
  const better = (valA: number, valB: number): 'a' | 'b' | 'tie' => {
    if (valA > valB) return 'a';
    if (valB > valA) return 'b';
    return 'tie';
  };

  const rows = [
    { label: 'Founded', valA: a.founded, valB: b.founded, compare: false },
    { label: 'Monthly Users (M)', valA: a.monthlyUsers, valB: b.monthlyUsers, compare: true },
    { label: 'Peak Users (M)', valA: a.peakUsers, valB: b.peakUsers, compare: true },
    { label: 'Peak Year', valA: a.peakYear, valB: b.peakYear, compare: false },
    { label: 'Fame Score', valA: a.fameScore, valB: b.fameScore, compare: true },
  ];

  return (
    <div className="bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden">
      <table className="w-full">
        <thead>
          <tr className="bg-gray-50">
            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
              Metric
            </th>
            <th className="px-6 py-4 text-center text-sm font-semibold text-indigo-600">
              {a.logo} {a.name}
            </th>
            <th className="px-6 py-4 text-center text-sm font-semibold text-pink-600">
              {b.logo} {b.name}
            </th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => {
            const winner = row.compare ? better(row.valA, row.valB) : 'tie';
            return (
              <tr key={row.label} className="border-t border-gray-100">
                <td className="px-6 py-3 text-sm text-gray-600">{row.label}</td>
                <td
                  className={`px-6 py-3 text-center text-sm font-medium ${
                    winner === 'a' ? 'text-indigo-600 font-bold' : 'text-gray-900'
                  }`}
                >
                  {row.valA.toLocaleString()}
                </td>
                <td
                  className={`px-6 py-3 text-center text-sm font-medium ${
                    winner === 'b' ? 'text-pink-600 font-bold' : 'text-gray-900'
                  }`}
                >
                  {row.valB.toLocaleString()}
                </td>
              </tr>
            );
          })}
          <tr className="border-t border-gray-100">
            <td className="px-6 py-3 text-sm text-gray-600">Target Age</td>
            <td className="px-6 py-3 text-center text-sm text-gray-900">{a.targetAge}</td>
            <td className="px-6 py-3 text-center text-sm text-gray-900">{b.targetAge}</td>
          </tr>
          <tr className="border-t border-gray-100">
            <td className="px-6 py-3 text-sm text-gray-600">Purpose</td>
            <td className="px-6 py-3 text-center text-sm text-gray-900">{a.purpose}</td>
            <td className="px-6 py-3 text-center text-sm text-gray-900">{b.purpose}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
