import { useBedStore } from '../../store/useBedStore';

export function VoiceCommandFeedback() {
  const lastVoiceCommand = useBedStore(s => s.lastVoiceCommand);
  const lastVoiceAction = useBedStore(s => s.lastVoiceAction);

  if (!lastVoiceCommand) return null;

  const actionLabels: Record<string, string> = {
    moveUp: '上升床位',
    moveDown: '下降床位',
    stopMovement: '停止运动',
    emergencyStop: '紧急停止',
    alarmEnable: '开启报警',
    alarmDisable: '关闭报警',
    increaseSpeed: '加速',
    decreaseSpeed: '减速',
    increaseHeight: '升高高度',
    decreaseHeight: '降低高度',
    '未能识别指令': '未能识别，请重试',
  };

  const actionLabel = actionLabels[lastVoiceAction] || lastVoiceAction;

  return (
    <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 space-y-2">
      <div>
        <span className="text-xs text-text-secondary">识别结果：</span>
        <p className="text-sm font-medium text-text mt-0.5">"{lastVoiceCommand}"</p>
      </div>
      <div>
        <span className="text-xs text-text-secondary">执行动作：</span>
        <p className={`text-sm font-semibold mt-0.5 ${
          lastVoiceAction === '未能识别指令' ? 'text-warning' : 'text-success'
        }`}>
          {actionLabel}
        </p>
      </div>
    </div>
  );
}
