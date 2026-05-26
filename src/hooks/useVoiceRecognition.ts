import { useRef, useCallback, useState } from 'react';
import { useBedStore } from '../store/useBedStore';
import { CommandParser } from '../simulation/CommandParser';
import type { VoiceLanguage } from '../store/types';

interface SpeechRecognitionEvent extends Event {
  resultIndex: number;
  results: {
    [index: number]: {
      isFinal: boolean;
      [index: number]: { transcript: string; confidence: number };
    };
    length: number;
  };
}

interface SpeechRecognitionErrorEvent extends Event {
  error: string;
  message: string;
}

interface SpeechRecognition extends EventTarget {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  onresult: ((event: SpeechRecognitionEvent) => void) | null;
  onerror: ((event: SpeechRecognitionErrorEvent) => void) | null;
  onend: (() => void) | null;
  start: () => void;
  stop: () => void;
  abort: () => void;
}

declare global {
  interface Window {
    SpeechRecognition?: new () => SpeechRecognition;
    webkitSpeechRecognition?: new () => SpeechRecognition;
  }
}

export function useVoiceRecognition() {
  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const [isSupported, setIsSupported] = useState(true);
  const timeoutRef = useRef<number | null>(null);

  const stopListening = useCallback(() => {
    const recognition = recognitionRef.current;
    if (recognition) {
      recognition.stop();
    }
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    useBedStore.getState().setVoiceListening(false);
  }, []);

  const processCommand = useCallback((text: string, language: VoiceLanguage) => {
    const store = useBedStore.getState();
    const parsed = CommandParser.parse(text, language);

    if (parsed) {
      store.setVoiceResult(text, parsed.action);

      switch (parsed.action) {
        case 'moveUp':
          store.moveUp();
          break;
        case 'moveDown':
          store.moveDown();
          break;
        case 'stopMovement':
          store.stopMovement();
          break;
        case 'emergencyStop':
          store.emergencyStop();
          break;
        case 'alarmEnable':
          if (!store.alarmEnabled) store.toggleAlarm();
          break;
        case 'alarmDisable':
          if (store.alarmEnabled) store.toggleAlarm();
          break;
        case 'increaseSpeed':
          store.setSpeed(store.movingSpeed + 1);
          break;
        case 'decreaseSpeed':
          store.setSpeed(store.movingSpeed - 1);
          break;
        case 'increaseHeight':
          store.setHeightTarget(store.bedHeightTarget + 10);
          break;
        case 'decreaseHeight':
          store.setHeightTarget(store.bedHeightTarget - 10);
          break;
        default:
          break;
      }
    } else {
      store.setVoiceResult(text, '未能识别指令');
    }
  }, []);

  const startListening = useCallback(() => {
    const SpeechRecognitionCtor = window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognitionCtor) {
      setIsSupported(false);
      return;
    }

    const store = useBedStore.getState();
    const recognition = new SpeechRecognitionCtor();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = store.voiceLanguage;

    recognition.onresult = (event: SpeechRecognitionEvent) => {
      let finalTranscript = '';
      let interimTranscript = '';

      for (let i = event.resultIndex; i < event.results.length; i++) {
        const result = event.results[i];
        if (result.isFinal) {
          finalTranscript += result[0]?.transcript ?? '';
        } else {
          interimTranscript += result[0]?.transcript ?? '';
        }
      }

      if (finalTranscript) {
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
        }
        processCommand(finalTranscript, store.voiceLanguage);
        stopListening();
      }
    };

    recognition.onerror = (event: SpeechRecognitionErrorEvent) => {
      console.warn('Speech recognition error:', event.error);
      if (event.error === 'not-allowed') {
        setIsSupported(false);
      }
      stopListening();
    };

    recognition.onend = () => {
      useBedStore.getState().setVoiceListening(false);
    };

    recognitionRef.current = recognition;
    recognition.start();
    useBedStore.getState().setVoiceListening(true);

    // Auto-stop after 10 seconds of silence
    timeoutRef.current = window.setTimeout(() => {
      stopListening();
    }, 10000);
  }, [processCommand, stopListening]);

  const toggleLanguage = useCallback(() => {
    const store = useBedStore.getState();
    store.setVoiceLanguage(store.voiceLanguage === 'zh-CN' ? 'en-US' : 'zh-CN');
  }, []);

  return { startListening, stopListening, toggleLanguage, isSupported };
}
