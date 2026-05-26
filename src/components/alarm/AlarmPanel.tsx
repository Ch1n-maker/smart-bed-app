import { useBedStore } from '../../store/useBedStore';
import { AlarmToggle } from './AlarmToggle';
import { AlarmThresholdSetting } from './AlarmThresholdSetting';
import { AlarmLog } from './AlarmLog';

export function AlarmPanel() {
  const alarmActive = useBedStore(s => s.alarmActive);
  const dismissAlarm = useBedStore(s => s.dismissAlarm);

  return (
    <div className="space-y-4 slide-up">
      {alarmActive && (
        <button
          onClick={dismissAlarm}
          className="w-full p-4 bg-red-50 border-2 border-danger rounded-2xl flex items-center justify-center gap-2 alarm-flash"
        >
          <span className="text-danger font-bold text-base">报警触发中 - 点击解除</span>
        </button>
      )}
      <AlarmToggle />
      <AlarmThresholdSetting />
      <AlarmLog />
    </div>
  );
}
