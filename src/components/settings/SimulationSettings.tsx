import { useBedStore } from '../../store/useBedStore';
import { AlertTriangle } from 'lucide-react';

export function SimulationSettings() {
  const emergencyStop = useBedStore(s => s.emergencyStop);
  const resetState = useBedStore(s => s.resetState);

  const triggerPressureAlarm = () => {
    // Set threshold very low to trigger alarm immediately
    const store = useBedStore.getState();
    useBedStore.setState({
      alarmThresholds: { ...store.alarmThresholds, maxPressure: 15 },
    });
  };

  return (
    <div className="space-y-3">
      <h3 className="text-sm font-semibold text-text">模拟调试</h3>

      <div className="grid grid-cols-2 gap-2">
        <button
          onClick={triggerPressureAlarm}
          className="flex items-center justify-center gap-1.5 p-3 rounded-xl bg-warning/10 text-warning text-sm font-medium hover:bg-warning/20 transition-colors"
        >
          <AlertTriangle size={14} />
          触发压力报警
        </button>

        <button
          onClick={emergencyStop}
          className="flex items-center justify-center gap-1.5 p-3 rounded-xl bg-danger/10 text-danger text-sm font-medium hover:bg-danger/20 transition-colors"
        >
          紧急停止
        </button>

        <button
          onClick={resetState}
          className="col-span-2 flex items-center justify-center gap-1.5 p-3 rounded-xl bg-gray-100 text-text-secondary text-sm font-medium hover:bg-gray-200 transition-colors"
        >
          重置所有状态
        </button>
      </div>

      <p className="text-xs text-text-secondary text-center">
        模拟模式：不依赖真实硬件，使用虚拟数据运行
      </p>
    </div>
  );
}
