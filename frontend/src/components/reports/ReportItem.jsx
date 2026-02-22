import { FileText } from 'lucide-react';

// Individual report item in the list
export const ReportItem = ({ report, isSelected, onSelect }) => {
  return (
    <button
      data-testid={`report-item-${report.id}`}
      onClick={() => onSelect(report.id)}
      className={`w-full text-left p-4 rounded-lg transition-all border ${
        isSelected
          ? 'bg-blue-500/10 border-blue-500/50 shadow-[0_0_20px_rgba(59,130,246,0.1)]'
          : 'bg-slate-800/30 border-slate-700/30 hover:bg-slate-800/50 hover:border-slate-600/50'
      }`}
    >
      <div className="flex items-start gap-3">
        {/* Icon */}
        <div
          className={`mt-0.5 h-8 w-8 rounded-lg flex items-center justify-center flex-shrink-0 ${
            isSelected ? 'bg-blue-500' : 'bg-slate-700'
          }`}
        >
          <FileText
            className={`h-4 w-4 ${isSelected ? 'text-white' : 'text-slate-400'}`}
          />
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <h3
            className={`text-sm font-medium truncate ${
              isSelected ? 'text-blue-400' : 'text-slate-300'
            }`}
          >
            {report.title}
          </h3>
          <p className="text-xs text-slate-500 truncate mt-0.5">
            {report.subtitle}
          </p>
        </div>

        {/* Selection indicator */}
        {isSelected && (
          <div className="w-2 h-2 rounded-full bg-blue-400 flex-shrink-0 mt-2" />
        )}
      </div>
    </button>
  );
};

export default ReportItem;
