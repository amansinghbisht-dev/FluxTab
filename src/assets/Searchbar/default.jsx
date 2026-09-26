import { Search, Command } from "lucide-react";
import { forwardRef } from "react";

const DefaultSearchbar = forwardRef(({ style, className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={`flex items-center w-3/7 px-4 py-3 bg-slate-900/50 backdrop-blur-xl border border-slate-700/50 rounded-2xl shadow-2xl transition-colors duration-300 focus-within:bg-slate-900/70 focus-within:border-slate-500/50 ${className || ""}`}
      style={style}
      {...props}
    >
      <Search className="w-5 h-5 text-slate-400 mr-3 shrink-0" />

      <input
        type="text"
        placeholder="Search"
        className="w-full h-full bg-transparent border-none outline-none text-slate-200 placeholder:text-slate-500 text-lg font-medium no-drag"
        autoComplete="off"
        spellCheck="false"
        autoFocus
      />

      <div className="hidden sm:flex items-center justify-center px-2 py-1 ml-3 bg-slate-800/80 rounded-md border border-slate-700 shrink-0">
        <Command className="w-3 h-3 text-slate-400" />
      </div>
    </div>
  );
});

// React requires a display name when using forwardRef for debugging purposes
DefaultSearchbar.displayName = "DefaultSearchbar";

export default DefaultSearchbar;
