import { createContext, useContext, useEffect, useState } from "react";

const DashboardContext = createContext();

export function DashboardProvider({ children }) {
  const [widgets, setWidgets] = useState(() => {
    const savedWidgets = localStorage.getItem("fluxtab_widgets");
    // If data exists, parse it back into an array. If not, start with an empty array.
    return savedWidgets ? JSON.parse(savedWidgets) : [];
  });

  const [uiMode, setUiMode] = useState("default");

  useEffect(() => {
    localStorage.setItem("fluxtab_widgets", JSON.stringify(widgets));
  }, [widgets]);

  const updateWidget = (id, newProps) => {
  setWidgets((prevWidgets) =>
    prevWidgets.map((widget) =>
      widget.id === id ? { ...widget, ...newProps } : widget
    )
  );
};
  return (
    <DashboardContext.Provider
      value={{ widgets, setWidgets, uiMode, setUiMode, updateWidget }}
    >
      {children}
    </DashboardContext.Provider>
  );
}

// Custom hook to easily grab this data from any file
export const useDashboard = () => useContext(DashboardContext);
