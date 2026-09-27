import { DashboardProvider } from './context/DashboardContext'
import WorkBoard from './components/WorkBoard'

const App = () => {
  return (
    <DashboardProvider>
      <WorkBoard/>
    </DashboardProvider>
  )
}

export default App