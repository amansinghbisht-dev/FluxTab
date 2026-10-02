import { useState } from "react";
import DefaultMenu from "../assets/menu/DefaultMenu";
import DefaultNotepad from "../assets/Notepad/DefaultNotepad";
import DefaultSearchbar from "../assets/Searchbar/default";
import { useDashboard } from "../context/DashboardContext";


const WorkBoard = () => {
  // Grab widgets and setWidgets from your context
  const { uiMode, setUiMode, widgets, setWidgets } = useDashboard();
  
  // Local state for the drawing engine
  const [isDrawing, setIsDrawing] = useState(false);
  const [startPos, setStartPos] = useState({ x: 0, y: 0 });
  const [drawBox, setDrawBox] = useState(null);

  const handleMouseDown = (e) => {
    if (uiMode !== "draw") return;
    
    setIsDrawing(true);
    setStartPos({ x: e.clientX, y: e.clientY });
    setDrawBox({ x: e.clientX, y: e.clientY, w: 0, h: 0 });
  };

  const handleMouseMove = (e) => {
    if (!isDrawing) return;
    
    // The Math: Calculate origin and absolute size dynamically
    setDrawBox({
      x: Math.min(startPos.x, e.clientX),
      y: Math.min(startPos.y, e.clientY),
      w: Math.abs(e.clientX - startPos.x),
      h: Math.abs(e.clientY - startPos.y),
    });
  };

  const handleMouseUp = () => {
    if (!isDrawing) return;
    
    // Anti-click safeguard: Only spawn if the box is actually drawn (e.g., larger than 50x50 pixels)
    if (drawBox && drawBox.w > 50 && drawBox.h > 50) {
      const newWidget = {
        id: Date.now(), // Generate a unique ID
        type: "notepad", 
        x: drawBox.x,
        y: drawBox.y,
        w: drawBox.w,
        h: drawBox.h
      };
      
      // Add the new widget to your global context array
      setWidgets([...widgets, newWidget]);
    }
    
    // Reset the drawing state and return to default cursor mode
    setIsDrawing(false);
    setDrawBox(null);
    setUiMode("default");
  };

  return (
    <div
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      className={`relative w-screen h-screen overflow-hidden bg-slate-950 ${
        uiMode === "draw" ? "cursor-crosshair" : "cursor-default"
      }`}
    >
      {widgets.map((widget) => (
        <DefaultNotepad 
          key={widget.id}
          id={widget.id}
          initialX={widget.x} 
          initialY={widget.y} 
          initialW={widget.w} 
          initialH={widget.h} 
          content={widget.content}
        />
      ))}
      <DefaultMenu />

      {/* 2. The real-time visual "drawing box" */}
      {isDrawing && drawBox && (
        <div
          className="absolute border-2 border-blue-500 bg-blue-500/20 rounded z-40 pointer-events-none"
          style={{
            left: `${drawBox.x}px`,
            top: `${drawBox.y}px`,
            width: `${drawBox.w}px`,
            height: `${drawBox.h}px`,
          }}
        />
      )}
    </div>
  );
};

export default WorkBoard;
