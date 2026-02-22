import { AlertTriangle, TrendingUp, Clock } from 'lucide-react';

// Metric card component for displaying KPIs
export const MetricCard = ({ title, value, suffix = '', type = 'default', icon: Icon }) => {
  // Determine text color based on type
  const getValueColor = () => {
    switch (type) {
      case 'danger':
        return 'text-pink-400';
      case 'success':
        return 'text-emerald-400';
      case 'warning':
        return 'text-amber-400';
      default:
        return 'text-white';
    }
  };

  // Get default icon based on title
  const getIcon = () => {
    if (Icon) return Icon;
    if (title.toLowerCase().includes('alert')) return AlertTriangle;
    if (title.toLowerCase().includes('rate')) return TrendingUp;
    if (title.toLowerCase().includes('oldest')) return Clock;
    return AlertTriangle;
  };

  const IconComponent = getIcon();

  return (
    <div
      data-testid={`metric-card-${title.toLowerCase().replace(/\s+/g, '-')}`}
      className="bg-[#1e1432]/80 border border-purple-800/30 rounded-2xl p-6 flex flex-col justify-between h-32 relative overflow-hidden group hover:border-purple-600/50 transition-all hover:shadow-[0_0_30px_rgba(147,51,234,0.15)]"
    >
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-purple-600/5 rounded-full -translate-y-1/2 translate-x-1/2 group-hover:bg-purple-600/10 transition-all" />

      {/* Header with icon */}
      <div className="flex items-center gap-2 relative z-10">
        <IconComponent className="h-4 w-4 text-purple-400/70" />
        <span className="text-xs font-medium uppercase tracking-wider text-purple-300/70">
          {title}
        </span>
      </div>

      {/* Value */}
      <div className="relative z-10">
        <span className={`text-4xl font-bold tracking-tighter ${getValueColor()}`}>
          {value}
        </span>
        {suffix && (
          <span className={`text-2xl font-medium ml-1 ${getValueColor()}`}>
            {suffix}
          </span>
        )}
      </div>
    </div>
  );
};

export default MetricCard;
