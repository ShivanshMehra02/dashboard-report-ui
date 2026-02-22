import { Settings, User, HelpCircle, Calendar, AlertTriangle, TrendingUp, Clock, Search, Plus, ChevronLeft, ChevronRight, Check, X } from 'lucide-react';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, ArcElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar, Doughnut } from 'react-chartjs-2';
import { useState, useMemo } from 'react';
import { useReports } from './hooks/useReports';
import './index.css';

ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Title, Tooltip, Legend);

// Navbar Component
const Navbar = () => (
  <nav className="sticky top-0 z-50 border-b border-[#2e2e4a]/50 bg-gradient-to-r from-[#1a1a2e] to-[#0f0f1f]">
    <div className="px-6 py-4 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className="h-8 w-8 rounded-lg bg-[#4a4aff] flex items-center justify-center">
          <span className="text-white font-bold text-sm">U</span>
        </div>
        <h1 className="text-lg font-semibold text-white">Uptime AI</h1>
      </div>
      <div className="flex items-center gap-2">
        {[HelpCircle, Settings, User].map((Icon, i) => (
          <button key={i} className="h-9 w-9 rounded-full bg-[#2e2e4a]/50 flex items-center justify-center text-[#a0a0c0] hover:text-white hover:bg-[#3e3e6a]/50 transition-all">
            <Icon className="h-4 w-4" />
          </button>
        ))}
      </div>
    </div>
  </nav>
);

// Metric Card Component
const MetricCard = ({ title, value, suffix = '', type = 'default' }) => {
  const colors = { danger: 'text-[#e06a8a]', success: 'text-[#80e0ff]', default: 'text-white' };
  const icons = { 'Open Alerts': AlertTriangle, 'Closing Rate': TrendingUp, 'Oldest': Clock };
  const Icon = Object.entries(icons).find(([k]) => title.includes(k))?.[1] || AlertTriangle;
  
  return (
    <div className="bg-[#2e2e4a]/60 rounded-[10px] p-5 flex flex-col justify-between h-[120px]">
      <div className="flex items-center gap-2">
        <Icon className="h-4 w-4 text-[#a0a0c0]" />
        <span className="text-xs font-medium uppercase tracking-wider text-[#a0a0c0]">{title}</span>
      </div>
      <div>
        <span className={`text-4xl font-bold ${colors[type]}`}>{value}</span>
        {suffix && <span className={`text-xl ml-1 ${colors[type]}`}>{suffix}</span>}
      </div>
    </div>
  );
};

// Progress Card Component
const ProgressCard = ({ progress = 65 }) => (
  <div className="bg-[#2e2e4a]/60 rounded-[10px] p-5 flex flex-col justify-between h-[120px]">
    <div className="flex items-center gap-2">
      <Calendar className="h-4 w-4 text-[#a0a0c0]" />
      <span className="text-xs font-medium uppercase tracking-wider text-[#a0a0c0]">Last 7 Days</span>
    </div>
    <div className="space-y-2">
      <div className="flex justify-between">
        <span className="text-sm text-[#c0c0e0]">Progress</span>
        <span className="text-sm font-medium text-white">{progress}%</span>
      </div>
      <div className="h-[12px] bg-[#1f1f33] rounded-full overflow-hidden">
        <div className="h-full bg-gradient-to-r from-[#5a87ff] to-[#80e0ff] rounded-full" style={{ width: `${progress}%` }} />
      </div>
    </div>
  </div>
);

// Report Item Component
const ReportItem = ({ report, isSelected, onSelect }) => (
  <button
    onClick={() => onSelect(report.id)}
    className={`w-full text-left p-3 rounded-lg transition-all flex items-center gap-3 ${isSelected ? 'bg-[#3e3e6a]/70' : 'hover:bg-[#2e2e4a]/50'}`}
  >
    <div className={`w-5 h-5 rounded flex items-center justify-center border ${isSelected ? 'bg-[#4a4aff] border-[#4a4aff]' : 'border-[#4e4e6a]'}`}>
      {isSelected && <Check className="h-3 w-3 text-white" />}
    </div>
    <div className="flex-1 min-w-0">
      <h3 className="text-sm font-medium text-white truncate">{report.title}</h3>
      <p className="text-xs text-[#a0a0c0] truncate">{report.subtitle}</p>
    </div>
  </button>
);

// Report List Component
const ReportList = ({ reports, selectedReportId, searchQuery, currentPage, totalPages, onSearch, onSelect, onPageChange, onAddClick }) => (
  <div className="bg-[#2e2e4a]/60 rounded-[10px] overflow-hidden flex flex-col h-full">
    <div className="p-5 border-b border-[#3e3e6a]/50">
      <h2 className="text-base font-semibold text-white mb-4">Select Report Dashboard</h2>
      <div className="flex gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#a0a0c0]" />
          <input
            type="text"
            placeholder="Search reports..."
            value={searchQuery}
            onChange={(e) => onSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-[#1f1f33] border border-[#3e3e6a]/50 rounded-lg text-white placeholder-[#6e6e8a] focus:border-[#4a4aff] focus:outline-none"
          />
        </div>
        <button onClick={onAddClick} className="bg-[#4a4aff] text-white hover:bg-[#5a5aff] font-medium rounded-lg px-4 py-2 flex items-center gap-1">
          <Plus className="h-4 w-4" /> ADD
        </button>
      </div>
    </div>
    <div className="flex-1 overflow-y-auto p-3 space-y-1">
      {reports.length > 0 ? reports.map((r) => (
        <ReportItem key={r.id} report={r} isSelected={r.id === selectedReportId} onSelect={onSelect} />
      )) : (
        <div className="text-center py-12 text-[#6e6e8a]">No reports found</div>
      )}
    </div>
    {totalPages > 1 && (
      <div className="p-4 border-t border-[#3e3e6a]/50 flex items-center justify-center gap-2">
        <button onClick={() => onPageChange(currentPage - 1)} disabled={currentPage === 1} className="h-8 w-8 rounded-full bg-transparent border border-[#4e4e6a] text-[#a0a0c0] disabled:opacity-30">
          <ChevronLeft className="h-4 w-4 mx-auto" />
        </button>
        {[...Array(Math.min(totalPages, 5))].map((_, i) => (
          <button key={i + 1} onClick={() => onPageChange(i + 1)} className={`h-8 w-8 rounded-full text-sm ${currentPage === i + 1 ? 'bg-[#4a4aff] text-white' : 'border border-[#4e4e6a] text-[#a0a0c0]'}`}>
            {i + 1}
          </button>
        ))}
        <button onClick={() => onPageChange(currentPage + 1)} disabled={currentPage === totalPages} className="h-8 w-8 rounded-full bg-transparent border border-[#4e4e6a] text-[#a0a0c0] disabled:opacity-30">
          <ChevronRight className="h-4 w-4 mx-auto" />
        </button>
      </div>
    )}
  </div>
);

// Bar Chart Component
const BarChartComponent = ({ data }) => {
  const chartData = useMemo(() => ({
    labels: data?.labels || ['Unit 1', 'Unit 2', 'Unit 3', 'Unit 4', 'Unit 5', 'Unit 6'],
    datasets: [
      { label: 'In Process', data: data?.inProcess || [28, 22, 15, 18, 25, 12], backgroundColor: '#8a8aff', borderRadius: 3, barThickness: 14 },
      { label: 'Unacknowledged', data: data?.unacknowledged || [18, 15, 20, 12, 10, 16], backgroundColor: '#e06a8a', borderRadius: 3, barThickness: 14 },
      { label: 'On Watch', data: data?.onWatch || [10, 12, 8, 14, 6, 11], backgroundColor: '#4a4aff', borderRadius: 3, barThickness: 14 },
    ],
  }), [data]);

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: 'bottom', labels: { color: '#a0a0c0', usePointStyle: true, pointStyle: 'circle', padding: 16 } },
      tooltip: { backgroundColor: '#2e2e4a', titleColor: '#fff', bodyColor: '#c0c0e0', borderColor: '#4e4e6a', borderWidth: 1 },
    },
    scales: {
      x: { grid: { color: '#2e2e4a' }, ticks: { color: '#a0a0c0' } },
      y: { grid: { color: '#2e2e4a' }, ticks: { color: '#a0a0c0' }, beginAtZero: true },
    },
  };

  return (
    <div className="bg-[#2e2e4a]/60 rounded-[10px] p-5 flex flex-col">
      <h3 className="text-sm font-medium text-white mb-4">Best Unit Operations with Latest Number of Alerts</h3>
      <div className="flex-1 min-h-[280px]"><Bar data={chartData} options={options} /></div>
    </div>
  );
};

// Donut Chart Component
const DonutChartComponent = ({ data }) => {
  const total = useMemo(() => data ? data.open + data.inProcess + data.acknowledged + data.onWatch : 100, [data]);
  
  const chartData = useMemo(() => ({
    labels: ['Open', 'In Process', 'Acknowledged', 'On Watch'],
    datasets: [{
      data: data ? [data.open, data.inProcess, data.acknowledged, data.onWatch] : [25, 30, 25, 20],
      backgroundColor: ['#80e0ff', '#a070ff', '#c0a0ff', '#e070a0'],
      borderColor: '#1f1f33',
      borderWidth: 3,
    }],
  }), [data]);

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: '60%',
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          color: '#c0c0e0',
          usePointStyle: true,
          pointStyle: 'circle',
          padding: 16,
          generateLabels: (chart) => chart.data.labels.map((label, i) => ({
            text: `${label} (${((chart.data.datasets[0].data[i] / total) * 100).toFixed(1)}%)`,
            fillStyle: chart.data.datasets[0].backgroundColor[i],
            fontColor: '#c0c0e0',
            hidden: chart.getDatasetMeta(0).data[i]?.hidden,
            index: i,
            pointStyle: 'circle',
          })),
        },
      },
      tooltip: { backgroundColor: '#2e2e4a', titleColor: '#fff', bodyColor: '#c0c0e0' },
    },
  };

  return (
    <div className="bg-[#2e2e4a]/60 rounded-[10px] p-5 flex flex-col">
      <h3 className="text-sm font-medium text-white mb-4">Alert Rates Distribution</h3>
      <div className="flex-1 min-h-[280px] flex items-center justify-center">
        <div className="w-full max-w-[280px] h-[280px]"><Doughnut data={chartData} options={options} /></div>
      </div>
    </div>
  );
};

// Add Report Modal Component
const AddReportModal = ({ isOpen, onClose, onSubmit }) => {
  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [errors, setErrors] = useState({});

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};
    if (!title.trim()) newErrors.title = 'Title is required';
    if (!subtitle.trim()) newErrors.subtitle = 'Subtitle is required';
    setErrors(newErrors);
    if (Object.keys(newErrors).length === 0) {
      onSubmit(title.trim(), subtitle.trim());
      setTitle(''); setSubtitle(''); setErrors({});
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50" onClick={onClose}>
      <div className="bg-[#2e2e4a] border border-[#4e4e6a] rounded-[10px] p-6 w-full max-w-[400px]" onClick={(e) => e.stopPropagation()}>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-base font-semibold text-white">Add Dashboard Report</h2>
          <button onClick={onClose} className="text-[#a0a0c0] hover:text-white"><X className="h-5 w-5" /></button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-sm text-[#c0c0e0] block mb-1">Title <span className="text-[#e06a8a]">*</span></label>
            <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Enter report title"
              className={`w-full px-4 py-2 bg-[#1f1f33] border ${errors.title ? 'border-[#e06a8a]' : 'border-[#4e4e6a]'} rounded-lg text-white placeholder-[#6e6e8a] focus:border-[#4a4aff] focus:outline-none`} />
            {errors.title && <p className="text-xs text-[#e06a8a] mt-1">{errors.title}</p>}
          </div>
          <div>
            <label className="text-sm text-[#c0c0e0] block mb-1">Subtitle <span className="text-[#e06a8a]">*</span></label>
            <input type="text" value={subtitle} onChange={(e) => setSubtitle(e.target.value)} placeholder="Enter report subtitle"
              className={`w-full px-4 py-2 bg-[#1f1f33] border ${errors.subtitle ? 'border-[#e06a8a]' : 'border-[#4e4e6a]'} rounded-lg text-white placeholder-[#6e6e8a] focus:border-[#4a4aff] focus:outline-none`} />
            {errors.subtitle && <p className="text-xs text-[#e06a8a] mt-1">{errors.subtitle}</p>}
          </div>
          <div className="flex justify-end gap-3 pt-2">
            <button type="button" onClick={onClose} className="bg-[#4e4e6a] text-[#c0c0e0] hover:bg-[#5e5e7a] rounded-lg px-4 py-2">Cancel</button>
            <button type="submit" className="bg-[#4a4aff] text-white hover:bg-[#5a5aff] rounded-lg px-4 py-2">Create</button>
          </div>
        </form>
      </div>
    </div>
  );
};

// Main App Component
function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { reports, selectedReport, selectedReportId, searchQuery, currentPage, totalPages, addReport, selectReport, handleSearch, goToPage } = useReports();
  const metrics = selectedReport?.metrics || { openAlerts: 0, closingRate: 0, oldestAlert: 0 };

  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="p-5 md:p-6">
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <ProgressCard progress={Math.min(Math.round(metrics.closingRate), 100)} />
          <MetricCard title="Open Alerts" value={metrics.openAlerts} />
          <MetricCard title="Closing Rate" value={metrics.closingRate} suffix="%" type="success" />
          <MetricCard title="Oldest Unacknowledged Alert" value={metrics.oldestAlert} suffix=" Days" type="danger" />
        </section>
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-5">
          <div className="lg:col-span-4 xl:col-span-3">
            <ReportList reports={reports} selectedReportId={selectedReportId} searchQuery={searchQuery} currentPage={currentPage} totalPages={totalPages}
              onSearch={handleSearch} onSelect={selectReport} onPageChange={goToPage} onAddClick={() => setIsModalOpen(true)} />
          </div>
          <div className="lg:col-span-8 xl:col-span-9">
            {selectedReport ? (
              <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">
                <BarChartComponent data={selectedReport.barChartData} />
                <DonutChartComponent data={selectedReport.donutChartData} />
              </div>
            ) : (
              <div className="bg-[#2e2e4a]/60 rounded-[10px] p-12 flex flex-col items-center justify-center min-h-[380px]">
                <span className="text-2xl mb-4">📊</span>
                <h3 className="text-base font-medium text-white mb-2">No Report Selected</h3>
                <p className="text-sm text-[#a0a0c0]">Select a report from the list to view charts.</p>
              </div>
            )}
          </div>
        </section>
      </main>
      <AddReportModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onSubmit={addReport} />
    </div>
  );
}

export default App;
