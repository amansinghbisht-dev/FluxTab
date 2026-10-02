import { createContext, useContext, useEffect, useState } from "react";

const DashboardContext = createContext();

export function DashboardProvider({ children }) {
  const [widgets, setWidgets] = useState(() => {
    const savedWidgets = localStorage.getItem("fluxtab_widgets");
    // If data exists, parse it back into an array. If not, start with an empty array.
    return savedWidgets ? JSON.parse(savedWidgets) : [];
  });

  const [searchEngines, setSearchEngines] = useState(() => {
    const savedEngines = localStorage.getItem("Fluxtab_searchEngines");
    return savedEngines
      ? JSON.parse(savedEngines)
      : [
          {
            snippet: "yt",
            homeLink: "https://www.youtube.com",
            searchTag: "/results?search_query=",
          },
          {
            snippet: "g",
            homeLink: "https://www.google.com",
            searchTag: "/search?q=",
          },
          {
            snippet: "b",
            homeLink: "https://www.bing.com",
            searchTag: "/search?q=",
          },
          {
            snippet: "wk",
            homeLink: "https://en.wikipedia.org",
            searchTag: "/wiki/Special:Search?search=",
          },
        ];
  });

  const [uiMode, setUiMode] = useState("default");

  useEffect(() => {
    localStorage.setItem("fluxtab_widgets", JSON.stringify(widgets));
  }, [widgets]);

  useEffect(() => {
    localStorage.setItem(
      "fluxtab_searchEngines",
      JSON.stringify(searchEngines),
    );
  }, [searchEngines]);

  const updateWidget = (id, newProps) => {
    setWidgets((prevWidgets) =>
      prevWidgets.map((widget) =>
        widget.id === id ? { ...widget, ...newProps } : widget,
      ),
    );
  };
  return (
    <DashboardContext.Provider
      value={{
        widgets,
        setWidgets,
        uiMode,
        setUiMode,
        updateWidget,
        searchEngines,
        setSearchEngines,
      }}
    >
      {children}
    </DashboardContext.Provider>
  );
}

// Custom hook to easily grab this data from any file
export const useDashboard = () => useContext(DashboardContext);
