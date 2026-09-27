import DraggableWrapper from "../../components/DraggableWrapper";
import ResizableWrapper from "../../components/ResizableWrapper";

const DefaultNotepad = () => {
  return (
    <DraggableWrapper defaultPosition={{ x: 100, y: 100 }}>
      {/* Ensure absolute positioning is here so bounds work properly */}
      <div className="absolute">
        {/* IMPORTANT: Make sure ResizableWrapper has no bg colors applied to it! */}
        <ResizableWrapper>
          {/* Frosted Glass Container matching the Searchbar */}
          <div className="flex flex-col w-full h-full bg-slate-900/50 backdrop-blur-xl border border-slate-700/50 rounded-2xl shadow-2xl overflow-hidden transition-colors duration-300 focus-within:bg-slate-900/70 focus-within:border-slate-500/50">
            {/* Header / Drag Handle */}
            <div className="flex items-center justify-center h-6 w-full bg-slate-800/50 border-b border-slate-700/50 shrink-0 cursor-grab active:cursor-grabbing">
              <div className="w-10 h-1 bg-slate-600 rounded-full" />
            </div>

            {/* Text Area */}
            <textarea
              className="w-full h-full p-4 bg-transparent resize-none outline-none text-slate-200 placeholder:text-slate-500 font-medium"
              placeholder="Jot down some notes..."
              spellCheck="false"
            />
          </div>
        </ResizableWrapper>
      </div>
    </DraggableWrapper>
  );
};

export default DefaultNotepad;
