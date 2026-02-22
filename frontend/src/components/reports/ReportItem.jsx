import { FileText } from 'lucide-react';

// Individual report item in the list
export const ReportItem = ({ report, isSelected, onSelect }) => {
  return (
    <button
      data-testid={`report-item-${report.id}`}
      onClick={() => onSelect(report.id)}
      className={`w-full text-left p-4 rounded-xl transition-all border ${
        isSelected
          ? 'bg-purple-600/20 border-purple-500/50 shadow-[0_0_20px_rgba(147,51,234,0.2)]'
          : 'bg-purple-900/10 border-purple-800/20 hover:bg-purple-800/20 hover:border-purple-700/30'
      }`}
    >
      <div className="flex items-start gap-3">
        {/* Icon */}
        <div
          className={`mt-0.5 h-8 w-8 rounded-lg flex items-center justify-center flex-shrink-0 ${
            isSelected ? 'bg-gradient-to-br from-purple-500 to-pink-500' : 'bg-purple-900/50'
          }`}
        >
          <FileText
            className={`h-4 w-4 ${isSelected ? 'text-white' : 'text-purple-400'}`}
          />
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <h3
            className={`text-sm font-medium truncate ${
              isSelected ? 'text-white' : 'text-purple-100'
            }`}
          >
            {report.title}
          </h3>
          <p className="text-xs text-purple-400/70 truncate mt-0.5">
            {report.subtitle}
          </p>
        </div>

        {/* Selection indicator */}
        {isSelected && (
          <div className="w-2 h-2 rounded-full bg-pink-400 flex-shrink-0 mt-2" />
        )}
      </div>
    </button>
  );
};

export default ReportItem;
