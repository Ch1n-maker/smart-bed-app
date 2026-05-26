import { useBedStore } from '../../store/useBedStore';
import type { ConnectionStatus } from '../../store/types';

const statusConfig: Record<ConnectionStatus, { label: string; color: string; dot: string }> = {
  connected: { label: '已连接', color: 'text-success', dot: 'bg-success' },
  connecting: { label: '连接中...', color: 'text-warning', dot: 'bg-warning animate-pulse' },
  disconnected: { label: '未连接', color: 'text-text-secondary', dot: 'bg-gray-400' },
};

export function ConnectionBadge() {
  const connectionStatus = useBedStore(s => s.connectionStatus);
  const config = statusConfig[connectionStatus];

  return (
    <div className={`flex items-center gap-1.5 text-xs ${config.color}`}>
      <span className={`w-2 h-2 rounded-full ${config.dot}`} />
      <span>{config.label}</span>
    </div>
  );
}
