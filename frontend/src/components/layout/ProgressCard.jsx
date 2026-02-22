import { Calendar } from 'lucide-react';
import { Progress } from '../ui/progress';

// Progress card component for "Last 7 Days" display
export const ProgressCard = ({ progress = 65 }) => {
  return (
    <div
      data-testid="progress-card"
      className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-6 flex flex-col justify-between h-32 relative overflow-hidden group hover:border-blue-500/30 transition-all hover:shadow-[0_0_20px_rgba(59,130,246,0.1)]"
    >
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-24 h-24 bg-blue-500/5 rounded-full -translate-y-1/2 translate-x-1/2 group-hover:bg-blue-500/10 transition-all" />

      {/* Header */}
      <div className="flex items-center gap-2 relative z-10">
        <Calendar className="h-4 w-4 text-slate-500" />
        <span className="text-xs font-medium uppercase tracking-wider text-slate-500">
          Last 7 Days
        </span>
      </div>

      {/* Progress section */}
      <div className="relative z-10 space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-sm text-slate-400">Progress</span>
          <span className="text-sm font-medium text-blue-400">{progress}%</span>
        </div>
        <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
          <div
            data-testid="progress-bar-fill"
            className="h-full bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  );
};

export default ProgressCard;
