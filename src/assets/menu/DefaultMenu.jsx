import { useState } from "react";
import { ChevronDown, Plus, Pencil, StickyNote, ListTodo } from "lucide-react";
import { useDashboard } from "../../context/DashboardContext";

const DefaultMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isAddMenuOpen, setIsAddMenuOpen] = useState(false); // New state for the sub-menu
  const { uiMode, setUiMode } = useDashboard(); // Fixed capitalization

  const toggleDrawMode = (widgetType) => {
    // We will eventually pass the specific widgetType (e.g., 'notepad') to the context here
    setUiMode(uiMode === widgetType ? "default" : widgetType);
    console.log(`Draw mode activated for: ${widgetType}`);

    // Optional: Close the menus after selecting an option
    setIsAddMenuOpen(false);
    setIsOpen(false);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col-reverse items-center gap-3">
      {/* Main Toggle Button */}
      <button
        onClick={() => {
          setIsOpen(!isOpen);
          if (isOpen) setIsAddMenuOpen(false); // Close sub-menu if main menu closes
        }}
        className="w-14 h-14 rounded-full bg-slate-900/80 backdrop-blur-xl border border-slate-700/50 shadow-2xl flex items-center justify-center text-slate-300 hover:text-white hover:bg-slate-800/80 transition-colors duration-300"
      >
        <ChevronDown
          className={`w-6 h-6 transition-transform duration-300 ${
            isOpen ? "rotate-180" : "rotate-0"
          }`}
        />
      </button>

      <div
        className={`flex flex-col gap-3 transition-all duration-300 origin-bottom ${
          isOpen
            ? "opacity-100 scale-100 translate-y-0"
            : "opacity-0 scale-90 translate-y-4 pointer-events-none"
        }`}
      >
        {/* Edit Button */}
        <button className="w-11 h-11 rounded-full bg-slate-900/80 backdrop-blur-xl border border-slate-700/50 shadow-xl flex items-center justify-center text-slate-400 hover:text-white hover:bg-slate-800/80 transition-colors duration-300">
          <Pencil className="w-4 h-4" />
        </button>

        {/* Add Button Container (Relative for horizontal sub-menu positioning) */}
        <div className="relative flex items-center justify-end">
          {/* Sub-menu (Horizontal Flyout to the left) */}
          <div
            className={`absolute right-full mr-3 flex gap-2 transition-all duration-300 origin-right ${
              isAddMenuOpen
                ? "opacity-100 scale-100 translate-x-0"
                : "opacity-0 scale-50 translate-x-4 pointer-events-none"
            }`}
          >
            {/* Notepad Option */}
            <button
              onClick={() => toggleDrawMode("notepad")}
              className="w-10 h-10 rounded-full bg-slate-900/80 backdrop-blur-xl border border-slate-700/50 shadow-xl flex items-center justify-center text-amber-200 hover:text-amber-100 hover:bg-slate-800/80 transition-colors duration-300"
              title="Add Notepad"
            >
              <StickyNote className="w-4 h-4" />
            </button>

            {/* Checklist Option */}
            <button
              onClick={() => toggleDrawMode("checklist")}
              className="w-10 h-10 rounded-full bg-slate-900/80 backdrop-blur-xl border border-slate-700/50 shadow-xl flex items-center justify-center text-emerald-200 hover:text-emerald-100 hover:bg-slate-800/80 transition-colors duration-300"
              title="Add Checklist"
            >
              <ListTodo className="w-4 h-4" />
            </button>
          </div>

          {/* Actual Plus Button */}
          <button
            onClick={() => setIsAddMenuOpen(!isAddMenuOpen)}
            className={`w-11 h-11 rounded-full backdrop-blur-xl border shadow-xl flex items-center justify-center transition-colors duration-300 z-10 ${
              isAddMenuOpen
                ? "bg-blue-600 border-blue-500 text-white hover:bg-blue-500"
                : "bg-slate-900/80 border-slate-700/50 text-slate-400 hover:text-white hover:bg-slate-800/80"
            }`}
          >
            <Plus
              className={`w-5 h-5 transition-transform duration-300 ${
                isAddMenuOpen ? "rotate-45" : "rotate-0"
              }`}
            />
          </button>
        </div>
      </div>
    </div>
  );
};

export default DefaultMenu;
