import { useState } from 'react';
import { useBedStore } from '../../store/useBedStore';
import { CommandParser } from '../../simulation/CommandParser';
import { ChevronDown, ChevronUp, Info } from 'lucide-react';

export function VoiceCommandList() {
  const [expanded, setExpanded] = useState(false);
  const voiceLanguage = useBedStore(s => s.voiceLanguage);
  const commands = CommandParser.getCommands(voiceLanguage);
  const uniqueCommands = [...new Set(commands)].slice(0, 20);

  const categoryLabels: Record<string, string> = {
    moveUp: '上升',
    moveDown: '下降',
    stopMovement: '停止',
    emergencyStop: '紧急停止',
    alarmEnable: '开启报警',
    alarmDisable: '关闭报警',
    increaseSpeed: '加速',
    decreaseSpeed: '减速',
    increaseHeight: '升高',
    decreaseHeight: '降低',
  };

  // Group by action
  const grouped: Record<string, string[]> = {};
  uniqueCommands.forEach(cmd => {
    const parsed = CommandParser.parse(cmd, voiceLanguage);
    const action = parsed?.action || 'other';
    if (!grouped[action]) grouped[action] = [];
    grouped[action].push(cmd);
  });

  return (
    <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full flex items-center justify-between"
      >
        <div className="flex items-center gap-2">
          <Info size={16} className="text-primary" />
          <h3 className="text-sm font-semibold text-text">支持的语言指令</h3>
        </div>
        {expanded ? <ChevronUp size={16} className="text-text-secondary" /> : <ChevronDown size={16} className="text-text-secondary" />}
      </button>

      {expanded && (
        <div className="mt-3 space-y-2 max-h-52 overflow-y-auto">
          {Object.entries(grouped).map(([action, words]) => (
            <div key={action} className="p-2 rounded-lg bg-gray-50">
              <span className="text-xs font-semibold text-primary">{categoryLabels[action] || action}</span>
              <p className="text-xs text-text-secondary mt-0.5">{words.join(' · ')}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
