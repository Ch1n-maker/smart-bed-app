import { useBedStore } from '../../store/useBedStore';
import { OctagonAlert } from 'lucide-react';

export function StopButton() {
  const emergencyStop = useBedStore(s => s.emergencyStop);

  return (
    <button
      onClick={emergencyStop}
      className="w-full h-16 bg-danger hover:bg-red-700 active:scale-95 rounded-2xl flex items-center justify-center gap-3 shadow-lg shadow-red-200 transition-all duration-150"
    >
      <OctagonAlert size={28} className="text-white" />
      <span className="text-white text-lg font-bold">紧急停止</span>
    </button>
  );
}
