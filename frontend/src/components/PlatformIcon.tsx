/**
 * PlatformIcon component displaying styled platform icons
 * Uses colored letters based on platform name for visual recognition
 */

/** Platform icon colors mapped by platform ID */
const platformColors: Record<string, { bg: string; text: string; border: string }> = {
  facebook: { bg: 'bg-blue-600', text: 'text-white', border: 'border-blue-500' },
  instagram: { bg: 'bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400', text: 'text-white', border: 'border-pink-500' },
  tiktok: { bg: 'bg-black', text: 'text-white', border: 'border-gray-700' },
  youtube: { bg: 'bg-red-600', text: 'text-white', border: 'border-red-500' },
  twitter: { bg: 'bg-gray-900 dark:bg-white', text: 'text-white dark:text-black', border: 'border-gray-700' },
  linkedin: { bg: 'bg-blue-700', text: 'text-white', border: 'border-blue-600' },
};

/** Props for the PlatformIcon component */
interface PlatformIconProps {
  platformId: string;
  platformName: string;
  size?: 'sm' | 'md' | 'lg';
}

/**
 * Renders a styled platform icon with the first letter of the platform name
 * @param props - Platform ID, name, and optional size
 */
export function PlatformIcon({ platformId, platformName, size = 'md' }: PlatformIconProps) {
  const colors = platformColors[platformId] || { bg: 'bg-gray-500', text: 'text-white', border: 'border-gray-400' };
  const firstLetter = platformName.charAt(0).toUpperCase();

  const sizeClasses = {
    sm: 'w-8 h-8 text-sm',
    md: 'w-12 h-12 text-xl',
    lg: 'w-16 h-16 text-2xl',
  };

  return (
    <div
      className={`${sizeClasses[size]} ${colors.bg} ${colors.text} ${colors.border} rounded-xl flex items-center justify-center font-bold shadow-md border-2 transition-transform duration-200 hover:scale-110`}
      title={platformName}
    >
      {firstLetter}
    </div>
  );
}
