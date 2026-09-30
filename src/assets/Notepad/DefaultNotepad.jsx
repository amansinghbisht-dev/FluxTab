import { useRef, useState, useEffect } from "react";
import DraggableWrapper from "../../components/DraggableWrapper";
import ResizableWrapper from "../../components/ResizableWrapper";

const DefaultNotepad = ({initialX, initialY, initialW, initialH}) => {
  const textareaRef = useRef(null);

  const [size, setSize] = useState({ width: initialW, height: initialH });
  const [minHeight, setMinHeight] = useState(150);

  const adjustSize = () => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    textarea.style.height = "0px";
    const requiredTextHeight = textarea.scrollHeight;
    textarea.style.height = "100%";

    const totalRequired = requiredTextHeight + 24;

    setMinHeight(Math.max(150, totalRequired));

    setSize((prev) => ({
      width: prev.width,
      height: Math.max(prev.height, totalRequired),
    }));
  };

  const handleResize = (event, { size: newSize }) => {
    setSize(newSize);
    adjustSize();
  };

  useEffect(() => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const observer = new ResizeObserver(() => adjustSize());
    observer.observe(textarea);

    return () => observer.disconnect();
  }, []);

  return (
    <DraggableWrapper defaultPosition={{ x: initialX, y: initialY }}>
      <ResizableWrapper
        width={size.width}
        height={size.height}
        minConstraints={[150, minHeight]}
        onResize={handleResize}
      >
        <div className="flex flex-col w-full h-full bg-slate-900/50 backdrop-blur-xl border border-slate-700/50 rounded-2xl shadow-2xl overflow-hidden transition-colors duration-300 focus-within:bg-slate-900/70 focus-within:border-slate-500/50">
          <div className="flex items-center justify-center h-6 w-full bg-slate-800/50 border-b border-slate-700/50 shrink-0 cursor-grab active:cursor-grabbing">
            <div className="w-10 h-1 bg-slate-600 rounded-full" />
          </div>

          <textarea
            ref={textareaRef}
            onInput={adjustSize}
            className="w-full h-full p-4 bg-transparent resize-none no-drag outline-none text-slate-200 placeholder:text-slate-500 font-medium overflow-hidden block"
            placeholder="Jot down some notes..."
            spellCheck="false"
          />
        </div>
      </ResizableWrapper>
    </DraggableWrapper>
  );
};

export default DefaultNotepad;
