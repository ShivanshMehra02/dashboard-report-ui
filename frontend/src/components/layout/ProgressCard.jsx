import { Calendar } from 'lucide-react';
import { Progress } from '../ui/progress';

// Progress card component for "Last 7 Days" display
export const ProgressCard = ({ progress = 65 }) => {
  return (
    <div
      data-testid="progress-card"
      className="bg-[#1e1432]/80 border border-purple-800/30 rounded-2xl p-6 flex flex-col justify-between h-32 relative overflow-hidden group hover:border-purple-600/50 transition-all hover:shadow-[0_0_30px_rgba(147,51,234,0.15)]"
    >
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-purple-600/5 rounded-full -translate-y-1/2 translate-x-1/2 group-hover:bg-purple-600/10 transition-all" />

      {/* Header */}
      <div className="flex items-center gap-2 relative z-10">
        <Calendar className="h-4 w-4 text-purple-400/70" />
        <span className="text-xs font-medium uppercase tracking-wider text-purple-300/70">
          Last 7 Days
        </span>
      </div>

      {/* Progress section */}
      <div className="relative z-10 space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-sm text-purple-300/80">Progress</span>
          <span className="text-sm font-medium text-white">{progress}%</span>
        </div>
        <div className="h-2 bg-purple-950/50 rounded-full overflow-hidden">
          <div
            data-testid="progress-bar-fill"
            className="h-full bg-gradient-to-r from-purple-500 via-pink-500 to-purple-400 rounded-full transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  );
};

export default ProgressCard;
