import { createContext, useContext, useState } from "react";

const DashboardContext = createContext();

export function DashboardProvider({ children }) {
  const [widgets, setWidgets] = useState([]);
  const [uiMode, setUiMode] = useState("default");

  return (
    <DashboardContext.Provider
      value={{ widgets, setWidgets, uiMode, setUiMode }}
    >
      {children}
    </DashboardContext.Provider>
  );
}

// Custom hook to easily grab this data from any file
export const useDashboard = () => useContext(DashboardContext);
