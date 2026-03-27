/**
 * Skeleton loader component for loading states
 */
interface SkeletonProps {
  className?: string;
  width?: string | number;
  height?: string | number;
}

/**
 * Renders an animated skeleton placeholder for loading states
 * @param props - Skeleton styling properties
 */
export function Skeleton({ className = '', width, height }: SkeletonProps) {
  const style: React.CSSProperties = {
    ...(width && { width: typeof width === 'number' ? `${width}px` : width }),
    ...(height && { height: typeof height === 'number' ? `${height}px` : height }),
  };

  return (
    <div
      className={`animate-pulse rounded bg-gray-200 dark:bg-gray-700 ${className}`}
      style={style}
    />
  );
}

/**
 * Skeleton loader for platform cards during loading
 */
export function PlatformCardSkeleton() {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6 border border-gray-100 dark:border-gray-700">
      <div className="flex items-center gap-4 mb-4">
        <Skeleton width={48} height={48} className="rounded-lg" />
        <div className="flex-1">
          <Skeleton width="60%" height={24} className="mb-2" />
          <Skeleton width="40%" height={16} />
        </div>
      </div>
      <Skeleton width="100%" height={40} className="mb-4" />
      <div className="flex justify-between">
        <Skeleton width="30%" height={32} />
        <Skeleton width="30%" height={32} />
        <Skeleton width="30%" height={32} />
      </div>
    </div>
  );
}

/**
 * Skeleton loader for comparison table during loading
 */
export function ComparisonTableSkeleton() {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md border border-gray-100 dark:border-gray-700 p-6">
      <Skeleton width="40%" height={32} className="mb-6" />
      {[1, 2, 3, 4, 5].map((i) => (
        <div key={i} className="flex gap-4 mb-4">
          <Skeleton width="33%" height={24} />
          <Skeleton width="33%" height={24} />
          <Skeleton width="33%" height={24} />
        </div>
      ))}
    </div>
  );
}
