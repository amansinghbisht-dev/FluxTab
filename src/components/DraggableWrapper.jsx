import { useRef } from "react";
import Draggable from "react-draggable";
import { useDashboard } from "../context/DashboardContext";
import { X } from "lucide-react";

const DraggableWrapper = ({ children, defaultPosition, onStop, id }) => {
  const nodeRef = useRef(null);
  const { uiMode, setSelectedWidget, setWidgets } = useDashboard();
  const isEditing = uiMode === "edit";

  const handleDelete = (e) => {
    e.stopPropagation();
    console.log("delete");
    setWidgets((prevWidgets) => prevWidgets.filter((w) => w.id !== id));
  };

  return (
    <Draggable
      nodeRef={nodeRef}
      bounds="parent"
      cancel=".react-resizable-handle, .no-drag"
      defaultPosition={defaultPosition}
      onStop={onStop}
    >
      <div ref={nodeRef} className="absolute">
        {children}

        {isEditing && (
          <div
            className="absolute inset-0 z-40 cursor-pointer"
            onClick={(e) => {
              e.stopPropagation(); // Stops the drag engine from catching the click
              setSelectedWidget(id); // Selects this specific widget for the edit panel
            }}
          />
        )}

        {isEditing && (
          <button
            onClick={handleDelete}
            className="no-drag absolute -top-3 -right-3 z-50 bg-red-500 hover:bg-red-600 rounded-full p-1 shadow-lg transition-colors cursor-pointer"
          >
            <X className="w-4 h-4 text-white pointer-events-none" />
          </button>
        )}
      </div>
    </Draggable>
  );
};

export default DraggableWrapper;
