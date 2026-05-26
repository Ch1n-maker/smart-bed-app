import { useVoiceRecognition } from '../../hooks/useVoiceRecognition';
import { useBedStore } from '../../store/useBedStore';
import { VoiceCommandFeedback } from './VoiceCommandFeedback';
import { VoiceCommandList } from './VoiceCommandList';
import { Mic, MicOff, Languages } from 'lucide-react';

export function VoiceControlWidget() {
  const voiceListening = useBedStore(s => s.voiceListening);
  const voiceLanguage = useBedStore(s => s.voiceLanguage);
  const { startListening, stopListening, toggleLanguage, isSupported } = useVoiceRecognition();

  return (
    <div className="space-y-4 slide-up">
      {!isSupported && (
        <div className="p-3 bg-warning/10 border border-warning/30 rounded-xl text-sm text-warning text-center">
          您的浏览器不支持语音识别，请使用 Chrome 或 Edge 浏览器。
        </div>
      )}

      <div className="flex flex-col items-center gap-4">
        <div className="flex items-center gap-2">
          <button
            onClick={toggleLanguage}
            className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-primary-light text-primary text-sm font-medium hover:bg-blue-200 transition-colors"
          >
            <Languages size={14} />
            {voiceLanguage === 'zh-CN' ? '中文' : 'English'}
          </button>
        </div>

        <button
          onClick={voiceListening ? stopListening : startListening}
          disabled={!isSupported}
          className={`w-24 h-24 rounded-full flex items-center justify-center transition-all duration-300 ${
            voiceListening
              ? 'bg-danger pulse-animation'
              : 'bg-primary hover:bg-primary-dark shadow-lg shadow-blue-200'
          } ${!isSupported ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          {voiceListening ? (
            <MicOff size={36} className="text-white" />
          ) : (
            <Mic size={36} className="text-white" />
          )}
        </button>

        <p className="text-sm text-text-secondary text-center">
          {voiceListening
            ? '正在聆听... 请说出指令'
            : '点击麦克风开始语音控制'}
        </p>
      </div>

      <VoiceCommandFeedback />
      <VoiceCommandList />
    </div>
  );
}
