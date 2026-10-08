import { useState } from "react";
import DefaultMenu from "../assets/menu/DefaultMenu";
import DefaultNotepad from "../assets/Notepad/DefaultNotepad";
import DefaultSearchbar from "../assets/Searchbar/default";
import DefaultChecklist from "../assets/checklist/Default";
import { useDashboard } from "../context/DashboardContext";

const WorkBoard = () => {
  const { uiMode, setUiMode, widgets, setWidgets, setSelectedWidget } =
    useDashboard();

  // Local state for the drawing engine
  const [isDrawing, setIsDrawing] = useState(false);
  const [startPos, setStartPos] = useState({ x: 0, y: 0 });
  const [drawBox, setDrawBox] = useState(null);

  const handleMouseDown = (e) => {
    if (uiMode === "default") return;

    if (uiMode === "edit") {
      if (e.target === e.currentTarget) {
        setSelectedWidget("background");
      }
      return;
    }
    setIsDrawing(true);
    setStartPos({ x: e.clientX, y: e.clientY });
    setDrawBox({ x: e.clientX, y: e.clientY, w: 0, h: 0 });
  };

  const handleMouseMove = (e) => {
    if (!isDrawing) return;

    setDrawBox({
      x: Math.min(startPos.x, e.clientX),
      y: Math.min(startPos.y, e.clientY),
      w: Math.abs(e.clientX - startPos.x),
      h: Math.abs(e.clientY - startPos.y),
    });
  };

  const handleMouseUp = () => {
    if (!isDrawing) return;

    if (drawBox && drawBox.w > 50 && drawBox.h > 50) {
      const newWidget = {
        id: Date.now(),
        type: uiMode,
        x: drawBox.x,
        y: drawBox.y,
        w: drawBox.w,
        h: drawBox.h,
      };
      setWidgets([...widgets, newWidget]);
    }

    setIsDrawing(false);
    setDrawBox(null);
    setUiMode("default");
  };

  const getCursorClass = () => {
    if (uiMode === "default") return "cursor-default";
    if (uiMode === "edit") return "cursor-crosshair";
    return "cursor-crosshair";
  };

  return (
    <div
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      className={`relative w-screen h-screen overflow-hidden bg-slate-950 ${getCursorClass()}`}
    >
      {widgets.map((widget) => {
        if (widget.type === "notepad") {
          return (
            <DefaultNotepad
              key={widget.id}
              id={widget.id}
              initialX={widget.x}
              initialY={widget.y}
              initialW={widget.w}
              initialH={widget.h}
              content={widget.content}
            />
          );
        }
        if (widget.type === "checklist") {
          return (
            <DefaultChecklist
              key={widget.id}
              id={widget.id}
              initialX={widget.x}
              initialY={widget.y}
              initialW={widget.w}
              initialH={widget.h}
              content={widget.content}
            />
          );
        }
        if (widget.type === "searchbar") {
          return (
            <DefaultSearchbar
              key={widget.id}
              id={widget.id}
              initialX={widget.x}
              initialY={widget.y}
            />
          );
        }
        return null;
      })}

      <DefaultMenu />

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
