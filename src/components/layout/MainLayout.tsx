import type { ReactNode } from 'react';
import { useBedStore } from '../../store/useBedStore';
import { TopBar } from './TopBar';
import { BottomNav } from './BottomNav';
import { BedControlPanel } from '../bed-control/BedControlPanel';
import { MonitoringDashboard } from '../monitoring/MonitoringDashboard';
import { AlarmPanel } from '../alarm/AlarmPanel';
import { VoiceControlWidget } from '../voice/VoiceControlWidget';
import { BodyPositionDisplay } from '../body-position/BodyPositionDisplay';
import { SettingsPanel } from '../settings/SettingsPanel';

function ActivePanel(): ReactNode {
  const activeTab = useBedStore(s => s.activeTab);

  switch (activeTab) {
    case 'control':
      return <BedControlPanel />;
    case 'monitor':
      return <MonitoringDashboard />;
    case 'alarm':
      return <AlarmPanel />;
    case 'voice':
      return <VoiceControlWidget />;
    default:
      return <BedControlPanel />;
  }
}

export function MainLayout() {
  const settingsOpen = useBedStore(s => s.settingsOpen);

  return (
    <div className="app-phone">
      <TopBar />
      <div className="flex-1 overflow-y-auto bg-gray-50">
        <div className="p-4">
          <BodyPositionDisplay />
        </div>
        <div className="px-4 pb-4">
          <ActivePanel />
        </div>
      </div>
      <BottomNav />
      {settingsOpen && <SettingsPanel />}
    </div>
  );
}
