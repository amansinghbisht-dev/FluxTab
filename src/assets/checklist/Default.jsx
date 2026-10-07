import { useState } from "react";
import DraggableWrapper from "../../components/DraggableWrapper";
import ResizableWrapper from "../../components/ResizableWrapper";
import { useDashboard } from "../../context/DashboardContext";
import { Check, Circle } from "lucide-react";
const DefaultChecklist = ({
  id,
  initialX,
  initialY,
  initialW,
  initialH,
  content,
}) => {
  // 1. Ensure content is always an array to prevent .map() from crashing on fresh spawn
  const tasks = Array.isArray(content) ? content : [];

  const [size, setSize] = useState({
    width: initialW || 300,
    height: initialH || 400,
  });
  const [newTask, setNewTask] = useState("");
  const { updateWidget } = useDashboard();

  // 2. Handle adding a new task when Enter is pressed
  const handleKeyDown = (e) => {
    if (e.key === "Enter" && newTask.trim() !== "") {
      e.preventDefault(); // Prevents a new line from forming

      const newTaskObj = {
        taskId: Date.now(), // Generate a unique ID for the task itself
        task: newTask.trim(),
        refresh: "Daily",
        done: false,
      };

      // Spread the existing tasks, then add the new one
      updateWidget(id, { content: [...tasks, newTaskObj] });
      setNewTask(""); // Clear the input field
    }
  };

  // 3. Handle toggling the "done" status
  const toggleTask = (taskId) => {
    const updatedTasks = tasks.map((t) =>
      t.taskId === taskId ? { ...t, done: !t.done } : t,
    );
    updateWidget(id, { content: updatedTasks });
  };

  const handleResizeStop = (event, { size: newSize }) => {
    setSize(newSize);
    updateWidget(id, { w: newSize.width, h: newSize.height });
  };

  const handleDragStop = (event, data) => {
    updateWidget(id, { x: data.x, y: data.y });
  };

  return (
    <DraggableWrapper
      defaultPosition={{ x: initialX, y: initialY }}
      onStop={handleDragStop}
      bounds="parent"
    >
      <div
        className="absolute top-0 left-0"
        style={{ width: size.width, height: size.height }}
      >
        <ResizableWrapper
          width={size.width}
          height={size.height}
          minConstraints={[250, 200]} // Minimum size for a checklist
          onResizeStop={handleResizeStop}
          // Removed onResize to stop the textarea height conflict; let the user drag to resize freely
        >
          <div className="flex flex-col w-full h-full bg-slate-900/50 backdrop-blur-xl border border-slate-700/50 rounded-2xl shadow-2xl overflow-hidden transition-colors duration-300 focus-within:bg-slate-900/70 focus-within:border-slate-500/50">
            {/* Drag Handle */}
            <div className="flex items-center justify-center h-6 w-full bg-slate-800/50 border-b border-slate-700/50 shrink-0 cursor-grab active:cursor-grabbing">
              <div className="w-10 h-1 bg-slate-600 rounded-full" />
            </div>

            {/* Task List Container (Scrollable) */}
            <div className="flex-1 overflow-y-auto p-3 no-drag flex flex-col gap-2">
              {tasks.length === 0 && (
                <div className="text-slate-500 text-sm text-center mt-4 italic">
                  No tasks yet. Type below to add one!
                </div>
              )}

              {tasks.map((element) => (
                <div
                  key={element.taskId}
                  className="flex items-center justify-between p-2 bg-slate-800/40 border border-slate-700/50 rounded-lg group hover:bg-slate-800/70 transition-colors"
                >
                  <div
                    className="flex items-center gap-3 cursor-pointer overflow-hidden"
                    onClick={() => toggleTask(element.taskId)}
                  >
                    {/* Custom Checkbox UI */}
                    <div
                      className={`flex shrink-0 items-center justify-center w-5 h-5 rounded border ${element.done ? "bg-blue-500 border-blue-500" : "border-slate-500"}`}
                    >
                      {element.done && (
                        <Check
                          className="w-3.5 h-3.5 text-white"
                          strokeWidth={3}
                        />
                      )}
                    </div>

                    {/* Task Text with Strikethrough logic */}
                    <span
                      className={`text-sm font-medium truncate ${element.done ? "line-through text-slate-500" : "text-slate-200"}`}
                    >
                      {element.task}
                    </span>
                  </div>

                  {/* Refresh Tag */}
                  <span className="text-[10px] text-slate-400 px-2 py-1 bg-slate-900/50 rounded shrink-0">
                    {element.refresh}
                  </span>
                </div>
              ))}
            </div>

            {/* Input Area */}
            <div className="p-3 border-t border-slate-700/50 bg-slate-800/30 shrink-0">
              <input
                type="text"
                value={newTask}
                onChange={(e) => setNewTask(e.target.value)}
                onKeyDown={handleKeyDown}
                className="w-full bg-transparent no-drag outline-none text-slate-200 placeholder:text-slate-500 text-sm font-medium"
                placeholder="Add a task & press Enter..."
                spellCheck="false"
              />
            </div>
          </div>
        </ResizableWrapper>
      </div>
    </DraggableWrapper>
  );
};

export default DefaultChecklist;
