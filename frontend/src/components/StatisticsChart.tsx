/**
 * Statistics chart component using Recharts to display monthly usage data
 */
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';
import type { Platform } from '../types/platform';

/** Props for the StatisticsChart component */
interface StatisticsChartProps {
  platforms: Platform[];
}

/**
 * Renders a line chart of monthly user statistics for one or more platforms
 * @param props - Array of platforms to display in the chart
 */
export function StatisticsChart({ platforms }: StatisticsChartProps) {
  const colors = ['#6366f1', '#ec4899', '#f59e0b', '#10b981', '#3b82f6', '#8b5cf6'];

  const chartData = platforms[0].monthlyStats.map((stat, index) => {
    const entry: Record<string, string | number> = { month: stat.month };
    platforms.forEach((p) => {
      entry[p.name] = p.monthlyStats[index]?.users ?? 0;
    });
    return entry;
  });

  return (
    <div className="bg-white rounded-2xl shadow-md p-6 border border-gray-100">
      <h3 className="text-lg font-bold text-gray-900 mb-4">
        Monthly Active Users (Millions)
      </h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis dataKey="month" stroke="#9ca3af" fontSize={12} />
          <YAxis stroke="#9ca3af" fontSize={12} />
          <Tooltip
            contentStyle={{
              backgroundColor: '#fff',
              border: '1px solid #e5e7eb',
              borderRadius: '8px',
            }}
          />
          <Legend />
          {platforms.map((platform, index) => (
            <Line
              key={platform.id}
              type="monotone"
              dataKey={platform.name}
              stroke={colors[index % colors.length]}
              strokeWidth={2}
              dot={{ r: 4 }}
              activeDot={{ r: 6 }}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
