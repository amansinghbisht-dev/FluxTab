import { Search, Command } from "lucide-react";
import DraggableWrapper from "../../components/DraggableWrapper";
import { useDashboard } from "../../context/DashboardContext";

const DefaultSearchbar = ({ id, initialX, initialY }) => {
  const { searchEngines, updateWidget } = useDashboard();

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      const query = e.target.value.trim();

      if (!query) return;

      const firstWord = query.split(" ")[0].toLowerCase();
      const restOfQuery = query.substring(firstWord.length).trim();

      const matchedEngine = searchEngines.find(
        (engine) => engine.snippet === firstWord,
      );

      if (matchedEngine) {
        if (!restOfQuery) {
          window.location.href = matchedEngine.homeLink;
        } else {
          window.location.href = `${matchedEngine.homeLink}${matchedEngine.searchTag}${encodeURIComponent(restOfQuery)}`;
        }
      } else {
        window.location.href = `https://www.bing.com/search?q=${encodeURIComponent(query)}`;
      }
    }
  };

  const handleDragStop = (event, data) => {
    updateWidget(id, { x: data.x, y: data.y });
  };

  return (
    <DraggableWrapper
      defaultPosition={{ x: initialX, y: initialY }}
      onStop={handleDragStop}
    >
      <div className="flex items-center w-3/7 px-4 py-3 bg-slate-900/50 backdrop-blur-xl border border-slate-700/50 rounded-2xl shadow-2xl transition-colors duration-300 focus-within:bg-slate-900/70 focus-within:border-slate-500/50 cursor-grab active:cursor-grabbing">
        <Search className="w-5 h-5 text-slate-400 mr-3 shrink-0" />

        <input
          type="text"
          placeholder="Search"
          className="w-full h-full bg-transparent border-none outline-none text-slate-200 placeholder:text-slate-500 text-lg font-medium no-drag"
          autoComplete="off"
          spellCheck="false"
          autoFocus
          onKeyDown={handleKeyDown} // 3. Attach the handler to the input
        />

        <div className="hidden sm:flex items-center justify-center px-2 py-1 ml-3 bg-slate-800/80 rounded-md border border-slate-700 shrink-0">
          <Command className="w-3 h-3 text-slate-400" />
        </div>
      </div>
    </DraggableWrapper>
  );
};

DefaultSearchbar.displayName = "DefaultSearchbar";

export default DefaultSearchbar;
