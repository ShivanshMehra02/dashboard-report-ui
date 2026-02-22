import { Calendar } from 'lucide-react';
import { Progress } from '../ui/progress';

// Progress card component for "Last 7 Days" display
export const ProgressCard = ({ progress = 65 }) => {
  return (
    <div
      data-testid="progress-card"
      className="bg-[#2e2e4a]/60 rounded-[10px] p-5 flex flex-col justify-between h-[120px] relative overflow-hidden group hover:bg-[#3e3e6a]/60 transition-all"
    >
      {/* Header */}
      <div className="flex items-center gap-2 relative z-10">
        <Calendar className="h-4 w-4 text-[#a0a0c0]" />
        <span className="text-xs font-medium uppercase tracking-wider text-[#a0a0c0]">
          Last 7 Days
        </span>
      </div>

      {/* Progress section */}
      <div className="relative z-10 space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-sm text-[#c0c0e0]">Progress</span>
          <span className="text-sm font-medium text-white">{progress}%</span>
        </div>
        <div className="h-[12px] bg-[#1f1f33] rounded-full overflow-hidden">
          <div
            data-testid="progress-bar-fill"
            className="h-full bg-gradient-to-r from-[#5a87ff] to-[#80e0ff] rounded-full transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  );
};

export default ProgressCard;
