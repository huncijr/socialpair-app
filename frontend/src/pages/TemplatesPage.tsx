/**
 * Templates page component for managing comparison templates
 */
import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { useAuth } from '../context/AuthContext';

const API_BASE_URL = 'http://localhost:3001/api';

/** Template type */
interface Template {
  id: string;
  name: string;
  platforms: string[];
  createdAt: string;
}

/**
 * Renders the templates management page
 */
export function TemplatesPage() {
  const { token, isAuthenticated } = useAuth();
  const [templates, setTemplates] = useState<Template[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showCreateModal, setShowCreateModal] = useState(false);

  // Form states
  const [name, setName] = useState('');
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([]);

  useEffect(() => {
    if (isAuthenticated && token) {
      fetchTemplates();
    }
  }, [isAuthenticated, token]);

  /**
   * Fetch templates from backend
   */
  const fetchTemplates = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/templates`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch templates');
      }

      const data = await response.json();
      setTemplates(data.templates);
    } catch (error) {
      toast.error('Failed to load templates');
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Create a new template
   */
  const handleCreate = async () => {
    if (!name || selectedPlatforms.length < 2) {
      toast.error('Please provide a name and select at least 2 platforms');
      return;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/templates`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ name, platforms: selectedPlatforms }),
      });

      if (!response.ok) {
        throw new Error('Failed to create template');
      }

      const data = await response.json();
      setTemplates((prev) => [data.template, ...prev]);
      toast.success('Template created successfully');
      setShowCreateModal(false);
      setName('');
      setSelectedPlatforms([]);
    } catch (error) {
      toast.error('Failed to create template');
    }
  };

  /**
   * Delete a template
   */
  const handleDelete = async (id: string) => {
    try {
      const response = await fetch(`${API_BASE_URL}/templates/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to delete template');
      }

      setTemplates((prev) => prev.filter((t) => t.id !== id));
      toast.success('Template deleted');
    } catch (error) {
      toast.error('Failed to delete template');
    }
  };

  /**
   * Toggle platform selection
   */
  const togglePlatform = (platform: string) => {
    setSelectedPlatforms((prev) =>
      prev.includes(platform)
        ? prev.filter((p) => p !== platform)
        : [...prev, platform]
    );
  };

  const availablePlatforms = [
    { id: 'facebook', name: 'Facebook' },
    { id: 'instagram', name: 'Instagram' },
    { id: 'tiktok', name: 'TikTok' },
    { id: 'youtube', name: 'YouTube' },
    { id: 'twitter', name: 'X (Twitter)' },
    { id: 'linkedin', name: 'LinkedIn' },
  ];

  if (!isAuthenticated) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-10 text-center">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          Please log in to manage templates
        </h1>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Comparison Templates</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Save frequently used platform comparisons as templates
          </p>
        </div>
        <button
          onClick={() => setShowCreateModal(true)}
          className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
        >
          Create Template
        </button>
      </div>

      {/* Create Template Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 w-full max-w-lg mx-4">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Create New Template</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Template Name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  placeholder="e.g., Video Platforms"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Select Platforms (at least 2)
                </label>
                <div className="flex flex-wrap gap-2">
                  {availablePlatforms.map((platform) => (
                    <button
                      key={platform.id}
                      onClick={() => togglePlatform(platform.id)}
                      className={`px-3 py-2 rounded-lg text-sm transition-all duration-200 ${
                        selectedPlatforms.includes(platform.id)
                          ? 'bg-indigo-600 text-white'
                          : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                      }`}
                    >
                      {platform.name}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button
                onClick={handleCreate}
                className="flex-1 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-all duration-200"
              >
                Create Template
              </button>
              <button
                onClick={() => {
                  setShowCreateModal(false);
                  setName('');
                  setSelectedPlatforms([]);
                }}
                className="px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-all duration-200"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Templates List */}
      {templates.length === 0 ? (
        <div className="text-center py-16">
          <div className="text-6xl mb-4">📋</div>
          <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-2">
            No templates yet
          </h3>
          <p className="text-gray-500 dark:text-gray-400">
            Create templates for frequently used platform comparisons
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {templates.map((template) => (
            <div
              key={template.id}
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6 border border-gray-100 dark:border-gray-700 transition-all duration-200 hover:shadow-lg"
            >
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                  {template.name}
                </h3>
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  {new Date(template.createdAt).toLocaleDateString()}
                </span>
              </div>
              <div className="flex flex-wrap gap-2 mb-4">
                {template.platforms.map((platform) => (
                  <span
                    key={platform}
                    className="px-2 py-1 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 rounded-lg text-sm"
                  >
                    {platform}
                  </span>
                ))}
              </div>
              <div className="flex gap-2">
                <a
                  href={`/compare?platforms=${template.platforms.join(',')}`}
                  className="flex-1 px-3 py-1 text-center text-indigo-600 dark:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-900/30 rounded-lg transition-all duration-200 border border-indigo-200 dark:border-indigo-800"
                >
                  Use Template
                </a>
                <button
                  onClick={() => handleDelete(template.id)}
                  className="px-3 py-1 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-lg transition-all duration-200"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
