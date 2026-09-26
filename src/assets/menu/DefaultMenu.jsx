import  { useState } from 'react';
import { ChevronDown, Plus, Pencil } from 'lucide-react';

const DefaultMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    // Fixed at bottom-right, flex-col-reverse stacks the menu items directly above the main button
    <div className="fixed bottom-6 right-6 z-50 flex flex-col-reverse items-center gap-3">
      
      {/* Main Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 rounded-full bg-slate-900/80 backdrop-blur-xl border border-slate-700/50 shadow-2xl flex items-center justify-center text-slate-300 hover:text-white hover:bg-slate-800/80 transition-colors duration-300"
      >
        <ChevronDown
          // Rotates 180 degrees to point upward when the menu opens
          className={`w-6 h-6 transition-transform duration-300 ${
            isOpen ? 'rotate-180' : 'rotate-0'
          }`}
        />
      </button>

      {/* Floating Menu Buttons */}
      <div
        className={`flex flex-col gap-3 transition-all duration-300 origin-bottom ${
          isOpen
            ? 'opacity-100 scale-100 translate-y-0'
            : 'opacity-0 scale-90 translate-y-4 pointer-events-none'
        }`}
      >
        {/* Edit Button */}
        <button className="w-11 h-11 rounded-full bg-slate-900/80 backdrop-blur-xl border border-slate-700/50 shadow-xl flex items-center justify-center text-slate-400 hover:text-white hover:bg-slate-800/80 transition-colors duration-300">
          <Pencil className="w-4 h-4" />
        </button>
        
        {/* Add Button */}
        <button className="w-11 h-11 rounded-full bg-slate-900/80 backdrop-blur-xl border border-slate-700/50 shadow-xl flex items-center justify-center text-slate-400 hover:text-white hover:bg-slate-800/80 transition-colors duration-300">
          <Plus className="w-5 h-5" />
        </button>
      </div>

      

    </div>
  );
};

export default DefaultMenu;