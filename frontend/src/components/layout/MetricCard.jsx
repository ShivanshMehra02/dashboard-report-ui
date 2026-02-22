import { AlertTriangle, TrendingUp, Clock } from 'lucide-react';

// Metric card component for displaying KPIs
export const MetricCard = ({ title, value, suffix = '', type = 'default', icon: Icon }) => {
  // Determine text color based on type
  const getValueColor = () => {
    switch (type) {
      case 'danger':
        return 'text-[#e06a8a]';
      case 'success':
        return 'text-[#80e0ff]';
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
      className="bg-[#2e2e4a]/60 rounded-[10px] p-5 flex flex-col justify-between h-[120px] relative overflow-hidden group hover:bg-[#3e3e6a]/60 transition-all"
    >
      {/* Header with icon */}
      <div className="flex items-center gap-2 relative z-10">
        <IconComponent className="h-4 w-4 text-[#a0a0c0]" />
        <span className="text-xs font-medium uppercase tracking-wider text-[#a0a0c0]">
          {title}
        </span>
      </div>

      {/* Value */}
      <div className="relative z-10">
        <span className={`text-4xl font-bold tracking-tight ${getValueColor()}`}>
          {value}
        </span>
        {suffix && (
          <span className={`text-xl font-medium ml-1 ${getValueColor()}`}>
            {suffix}
          </span>
        )}
      </div>
    </div>
  );
};

export default MetricCard;
