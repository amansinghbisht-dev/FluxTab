import { useState, useEffect } from "react";
import DraggableWrapper from "../../components/DraggableWrapper";
import ResizableWrapper from "../../components/ResizableWrapper";
import { useDashboard } from "../../context/DashboardContext";
import { Check, Trash2, Clock } from "lucide-react";

const DefaultChecklist = ({
  id,
  initialX,
  initialY,
  initialW,
  initialH,
  content,
}) => {
  const tasks = Array.isArray(content) ? content : [];

  const [size, setSize] = useState({
    width: initialW || 300,
    height: initialH || 400,
  });
  const [newTask, setNewTask] = useState("");
  const [selectedRefresh, setSelectedRefresh] = useState("Daily");
  const { updateWidget } = useDashboard();

  // --- AUTOMATIC REFRESH LOGIC (With Background Polling) ---
  useEffect(() => {
    // This function checks all tasks and un-checks them if their time is up
    const checkRefreshTimers = () => {
      if (tasks.length === 0) return;

      let hasChanges = false;
      const now = new Date();

      const updatedTasks = tasks.map((task) => {
        if (!task.done || task.refresh === "Never" || !task.lastCompleted) {
          return task;
        }

        const completedDate = new Date(task.lastCompleted);
        const diffMs = Math.abs(now - completedDate);
        const diffMinutes = diffMs / (1000 * 60);
        const diffHours = diffMs / (1000 * 60 * 60);

        let shouldReset = false;

        // Evaluate all the different time options
        if (task.refresh === "30m" && diffMinutes >= 30) shouldReset = true;
        else if (task.refresh === "1h" && diffHours >= 1) shouldReset = true;
        else if (task.refresh === "2h" && diffHours >= 2) shouldReset = true;
        else if (task.refresh === "3h" && diffHours >= 3) shouldReset = true;
        else if (task.refresh === "12h" && diffHours >= 12) shouldReset = true;
        else if (task.refresh === "Daily") {
          // Reset if the calendar day has changed
          if (
            completedDate.getDate() !== now.getDate() ||
            completedDate.getMonth() !== now.getMonth() ||
            completedDate.getFullYear() !== now.getFullYear()
          ) {
            shouldReset = true;
          }
        } else if (task.refresh === "Weekly") {
          const diffDays = Math.ceil(diffMs / (1000 * 60 * 60 * 24));
          if (diffDays >= 7) shouldReset = true;
        }

        if (shouldReset) {
          hasChanges = true;
          return { ...task, done: false, lastCompleted: null };
        }

        return task;
      });

      if (hasChanges) {
        updateWidget(id, { content: updatedTasks });
      }
    };

    // 1. Run the check immediately when the component mounts or tasks update
    checkRefreshTimers();

    // 2. Set up a background timer to run the check every 60 seconds
    const intervalId = setInterval(checkRefreshTimers, 60000);

    // Cleanup the timer when the widget is closed or re-rendered
    return () => clearInterval(intervalId);
  }, [tasks, id, updateWidget]);

  // --- ADD TASK ---
  const handleKeyDown = (e) => {
    if (e.key === "Enter" && newTask.trim() !== "") {
      e.preventDefault();

      const newTaskObj = {
        taskId: Date.now(),
        task: newTask.trim(),
        refresh: selectedRefresh,
        done: false,
        lastCompleted: null,
      };

      updateWidget(id, { content: [...tasks, newTaskObj] });
      setNewTask("");
    }
  };

  // --- TOGGLE TASK ---
  const toggleTask = (taskId) => {
    const updatedTasks = tasks.map((t) => {
      if (t.taskId === taskId) {
        const isNowDone = !t.done;
        return {
          ...t,
          done: isNowDone,
          lastCompleted: isNowDone ? new Date().toISOString() : null,
        };
      }
      return t;
    });
    updateWidget(id, { content: updatedTasks });
  };

  // --- DELETE TASK ---
  const deleteTask = (taskId, e) => {
    e.stopPropagation();
    const updatedTasks = tasks.filter((t) => t.taskId !== taskId);
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
          minConstraints={[280, 200]}
          onResizeStop={handleResizeStop}
        >
          <div className="flex flex-col w-full h-full bg-slate-900/50 backdrop-blur-xl border border-slate-700/50 rounded-2xl shadow-2xl overflow-hidden transition-colors duration-300 focus-within:bg-slate-900/70 focus-within:border-slate-500/50">
            {/* Drag Handle */}
            <div className="flex items-center justify-center h-6 w-full bg-slate-800/50 border-b border-slate-700/50 shrink-0 cursor-grab active:cursor-grabbing">
              <div className="w-10 h-1 bg-slate-600 rounded-full" />
            </div>

            {/* Task List */}
            <div className="flex-1 overflow-y-auto p-3 no-drag flex flex-col gap-2">
              {tasks.length === 0 && (
                <div className="text-slate-500 text-sm text-center mt-4 italic">
                  No tasks yet. Type below to add one!
                </div>
              )}

              {tasks.map((element) => (
                <div
                  key={element.taskId}
                  className="flex items-center justify-between p-2  rounded-lg group hover:bg-slate-800/70 transition-colors"
                >
                  <div
                    className="flex items-center gap-3 cursor-pointer overflow-hidden flex-1"
                    onClick={() => toggleTask(element.taskId)}
                  >
                    <div
                      className={`flex shrink-0 items-center justify-center w-5 h-5 rounded-full border ${
                        element.done
                          ? "bg-blue-500 border-blue-500"
                          : "border-slate-500"
                      }`}
                    >
                      {element.done && (
                        <Check
                          className="w-3.5 h-3.5 text-white"
                          strokeWidth={3}
                        />
                      )}
                    </div>

                    <span
                      className={`text-sm font-medium truncate ${
                        element.done
                          ? "line-through text-slate-500"
                          : "text-slate-200"
                      }`}
                    >
                      {element.task}
                    </span>
                  </div>

                  {/* Actions Area: Refresh Tag & Delete Button */}
                  <div className="flex items-center gap-2 shrink-0 ml-2">
                    <span className="text-[10px] text-slate-500 flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {element.refresh}
                    </span>

                    <button
                      onClick={(e) => deleteTask(element.taskId, e)}
                      className="p-1 text-slate-500 hover:text-red-400 hover:bg-red-400/10 rounded opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Input Area */}
            <div className="flex items-center p-3 border-t border-slate-700/50 bg-slate-800/30 shrink-0 gap-2">
              <input
                type="text"
                value={newTask}
                onChange={(e) => setNewTask(e.target.value)}
                onKeyDown={handleKeyDown}
                className="flex-1 bg-transparent no-drag outline-none text-slate-200 placeholder:text-slate-500 text-sm font-medium"
                placeholder="Add a task & press Enter..."
                spellCheck="false"
              />

              {/* Dropdown Selector for Refresh Timing */}
              <select
                value={selectedRefresh}
                onChange={(e) => setSelectedRefresh(e.target.value)}
                className="shrink-0 text-xs px-2 py-1.5 bg-slate-700 hover:bg-slate-600 text-slate-300 rounded border border-slate-600 transition-colors cursor-pointer no-drag outline-none"
              >
                <option value="Never">Never</option>
                <option value="30m">30m</option>
                <option value="1h">1h</option>
                <option value="2h">2h</option>
                <option value="3h">3h</option>
                <option value="12h">12h</option>
                <option value="Daily">Daily</option>
                <option value="Weekly">Weekly</option>
              </select>
            </div>
          </div>
        </ResizableWrapper>
      </div>
    </DraggableWrapper>
  );
};

export default DefaultChecklist;
