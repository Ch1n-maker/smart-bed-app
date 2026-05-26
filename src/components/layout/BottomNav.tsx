import { useBedStore } from '../../store/useBedStore';
import type { ActiveTab } from '../../store/types';
import { Gamepad2, Activity, Bell, Mic } from 'lucide-react';

interface TabItem {
  key: ActiveTab;
  label: string;
  icon: typeof Gamepad2;
}

const tabs: TabItem[] = [
  { key: 'control', label: '控制', icon: Gamepad2 },
  { key: 'monitor', label: '监测', icon: Activity },
  { key: 'alarm', label: '报警', icon: Bell },
  { key: 'voice', label: '语音', icon: Mic },
];

export function BottomNav() {
  const activeTab = useBedStore(s => s.activeTab);
  const setActiveTab = useBedStore(s => s.setActiveTab);

  return (
    <div className="flex items-center justify-around px-2 py-1.5 bg-white border-t border-gray-100 shrink-0">
      {tabs.map(({ key, label, icon: Icon }) => {
        const isActive = activeTab === key;
        return (
          <button
            key={key}
            onClick={() => setActiveTab(key)}
            className={`flex flex-col items-center gap-0.5 py-1 px-3 rounded-xl transition-all duration-200 min-w-[60px] ${
              isActive
                ? 'text-primary bg-primary-light'
                : 'text-text-secondary hover:text-primary hover:bg-gray-50'
            }`}
          >
            <Icon size={22} />
            <span className="text-xs font-medium">{label}</span>
          </button>
        );
      })}
    </div>
  );
}
