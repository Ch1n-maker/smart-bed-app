import { useBedSimulation } from './hooks/useBedSimulation';
import { useAlarmSystem } from './hooks/useAlarmSystem';
import { useBluetoothSimulation } from './hooks/useBluetoothSimulation';
import { MainLayout } from './components/layout/MainLayout';
import './App.css';

function App() {
  useBedSimulation();
  useAlarmSystem();
  useBluetoothSimulation();

  return (
    <div className="app-container">
      <MainLayout />
    </div>
  );
}

export default App;
