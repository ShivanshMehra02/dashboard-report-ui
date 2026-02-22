import { FileText, Check } from 'lucide-react';

// Individual report item in the list
export const ReportItem = ({ report, isSelected, onSelect }) => {
  return (
    <button
      data-testid={`report-item-${report.id}`}
      onClick={() => onSelect(report.id)}
      className={`w-full text-left p-3 rounded-lg transition-all flex items-center gap-3 ${
        isSelected
          ? 'bg-[#3e3e6a]/70'
          : 'bg-transparent hover:bg-[#2e2e4a]/50'
      }`}
    >
      {/* Checkbox */}
      <div
        className={`w-5 h-5 rounded flex items-center justify-center flex-shrink-0 border ${
          isSelected
            ? 'bg-[#4a4aff] border-[#4a4aff]'
            : 'bg-transparent border-[#4e4e6a]'
        }`}
      >
        {isSelected && <Check className="h-3 w-3 text-white" />}
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <h3 className="text-sm font-medium text-white truncate">
          {report.title}
        </h3>
        <p className="text-xs text-[#a0a0c0] truncate mt-0.5">
          {report.subtitle}
        </p>
      </div>
    </button>
  );
};

export default ReportItem;
