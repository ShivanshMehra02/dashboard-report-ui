import { Settings, User, HelpCircle } from 'lucide-react';

// Top navigation bar component
export const Navbar = () => {
  return (
    <nav
      data-testid="navbar"
      className="sticky top-0 z-50 border-b border-purple-900/30 bg-[#1a1025]/90 backdrop-blur-xl"
    >
      <div className="px-6 py-4 flex items-center justify-between">
        {/* Left side - Logo and Title */}
        <div className="flex items-center gap-3">
          <div
            data-testid="navbar-logo"
            className="h-8 w-8 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center"
          >
            <span className="text-white font-bold text-sm">T</span>
          </div>
          <h1
            data-testid="navbar-title"
            className="text-lg font-semibold tracking-tight text-white"
          >
            Dashboard
          </h1>
        </div>

        {/* Right side - Action icons */}
        <div className="flex items-center gap-2">
          <button
            data-testid="help-button"
            className="h-9 w-9 rounded-full bg-purple-900/30 border border-purple-800/30 flex items-center justify-center text-purple-300 hover:text-purple-200 hover:border-purple-600/50 hover:bg-purple-800/30 transition-all"
            title="Help"
          >
            <HelpCircle className="h-4 w-4" />
          </button>
          <button
            data-testid="settings-button"
            className="h-9 w-9 rounded-full bg-purple-900/30 border border-purple-800/30 flex items-center justify-center text-purple-300 hover:text-purple-200 hover:border-purple-600/50 hover:bg-purple-800/30 transition-all"
            title="Settings"
          >
            <Settings className="h-4 w-4" />
          </button>
          <button
            data-testid="user-button"
            className="h-9 w-9 rounded-full bg-purple-900/30 border border-purple-800/30 flex items-center justify-center text-purple-300 hover:text-purple-200 hover:border-purple-600/50 hover:bg-purple-800/30 transition-all"
            title="User Profile"
          >
            <User className="h-4 w-4" />
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
