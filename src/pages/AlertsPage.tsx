/**
 * Alerts page component for managing platform threshold alerts
 */
import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { useAuth } from '../context/AuthContext';

const API_BASE_URL = 'http://localhost:3001/api';

/** Alert type */
interface Alert {
  id: string;
  platformId: string;
  metric: string;
  condition: 'above' | 'below' | 'equals';
  threshold: number;
  isActive: boolean;
  createdAt: string;
}

/**
 * Renders the alerts management page
 */
export function AlertsPage() {
  const { token, isAuthenticated } = useAuth();
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showCreateModal, setShowCreateModal] = useState(false);

  // Form states
  const [platformId, setPlatformId] = useState('');
  const [metric, setMetric] = useState('');
  const [condition, setCondition] = useState<'above' | 'below' | 'equals'>('above');
  const [threshold, setThreshold] = useState('');

  useEffect(() => {
    if (isAuthenticated && token) {
      fetchAlerts();
    }
  }, [isAuthenticated, token]);

  /**
   * Fetch alerts from backend
   */
  const fetchAlerts = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/alerts`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch alerts');
      }

      const data = await response.json();
      setAlerts(data.alerts);
    } catch (error) {
      toast.error('Failed to load alerts');
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Create a new alert
   */
  const handleCreate = async () => {
    if (!platformId || !metric || !threshold) {
      toast.error('Please fill in all fields');
      return;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/alerts`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          platformId,
          metric,
          condition,
          threshold: parseFloat(threshold),
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to create alert');
      }

      const data = await response.json();
      setAlerts((prev) => [data.alert, ...prev]);
      toast.success('Alert created successfully');
      setShowCreateModal(false);
      setPlatformId('');
      setMetric('');
      setThreshold('');
    } catch (error) {
      toast.error('Failed to create alert');
    }
  };

  /**
   * Toggle alert active status
   */
  const handleToggle = async (id: string) => {
    const alert = alerts.find((a) => a.id === id);
    if (!alert) return;

    try {
      const response = await fetch(`${API_BASE_URL}/alerts/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ isActive: !alert.isActive }),
      });

      if (!response.ok) {
        throw new Error('Failed to update alert');
      }

      setAlerts((prev) =>
        prev.map((a) => (a.id === id ? { ...a, isActive: !a.isActive } : a))
      );
      toast.success('Alert updated');
    } catch (error) {
      toast.error('Failed to update alert');
    }
  };

  /**
   * Delete an alert
   */
  const handleDelete = async (id: string) => {
    try {
      const response = await fetch(`${API_BASE_URL}/alerts/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to delete alert');
      }

      setAlerts((prev) => prev.filter((a) => a.id !== id));
      toast.success('Alert deleted');
    } catch (error) {
      toast.error('Failed to delete alert');
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-10 text-center">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          Please log in to manage alerts
        </h1>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">My Alerts</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Get notified when platforms reach your specified thresholds
          </p>
        </div>
        <button
          onClick={() => setShowCreateModal(true)}
          className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
        >
          Create Alert
        </button>
      </div>

      {/* Create Alert Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 w-full max-w-md mx-4">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Create New Alert</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Platform ID
                </label>
                <select
                  value={platformId}
                  onChange={(e) => setPlatformId(e.target.value)}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                >
                  <option value="">Select Platform</option>
                  <option value="facebook">Facebook</option>
                  <option value="instagram">Instagram</option>
                  <option value="tiktok">TikTok</option>
                  <option value="youtube">YouTube</option>
                  <option value="twitter">X (Twitter)</option>
                  <option value="linkedin">LinkedIn</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Metric
                </label>
                <select
                  value={metric}
                  onChange={(e) => setMetric(e.target.value)}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                >
                  <option value="">Select Metric</option>
                  <option value="monthlyUsers">Monthly Users</option>
                  <option value="fameScore">Fame Score</option>
                  <option value="peakUsers">Peak Users</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Condition
                </label>
                <select
                  value={condition}
                  onChange={(e) => setCondition(e.target.value as 'above' | 'below' | 'equals')}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                >
                  <option value="above">Above</option>
                  <option value="below">Below</option>
                  <option value="equals">Equals</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Threshold
                </label>
                <input
                  type="number"
                  value={threshold}
                  onChange={(e) => setThreshold(e.target.value)}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  placeholder="e.g., 2000"
                />
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button
                onClick={handleCreate}
                className="flex-1 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-all duration-200"
              >
                Create Alert
              </button>
              <button
                onClick={() => setShowCreateModal(false)}
                className="px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-all duration-200"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Alerts List */}
      {alerts.length === 0 ? (
        <div className="text-center py-16">
          <div className="text-6xl mb-4">🔔</div>
          <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-2">
            No alerts set up yet
          </h3>
          <p className="text-gray-500 dark:text-gray-400">
            Create alerts to get notified when platforms reach specific thresholds
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {alerts.map((alert) => (
            <div
              key={alert.id}
              className={`bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6 border transition-all duration-200 ${
                alert.isActive
                  ? 'border-gray-100 dark:border-gray-700'
                  : 'border-gray-200 dark:border-gray-600 opacity-60'
              }`}
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                    {alert.platformId} • {alert.metric}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    When {alert.metric} is {alert.condition} {alert.threshold}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-500 mt-2">
                    Created: {new Date(alert.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleToggle(alert.id)}
                    className={`px-3 py-1 rounded-lg text-sm transition-all duration-200 ${
                      alert.isActive
                        ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300'
                        : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                    }`}
                  >
                    {alert.isActive ? 'Active' : 'Inactive'}
                  </button>
                  <button
                    onClick={() => handleDelete(alert.id)}
                    className="px-3 py-1 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-lg transition-all duration-200"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
