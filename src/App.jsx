import { DashboardProvider } from "./context/DashboardContext";
import WorkBoard from "./components/WorkBoard"; // Assuming this renders DefaultSearchbar

function App() {
  return (
    <DashboardProvider>
      <WorkBoard />
    </DashboardProvider>
  );
}

export default App;
