import { create } from 'zustand';
import type { BedState, BedActions, ActiveTab, AlarmThresholds, SensorData, ConnectionStatus, VoiceLanguage } from './types';
import { DEFAULT_THRESHOLDS, PRESSURE_HISTORY_MAX } from '../utils/constants';

function getInitialState(): BedState {
  return {
    backAngle: 0,
    legAngle: 0,
    bedHeight: 50,
    bedHeightTarget: 50,
    movingDirection: 'stop',
    movingSpeed: 2,
    detectedPosition: 'lying_flat',
    pressurePoints: [20, 25, 30, 28, 22, 18],
    pressureHistory: [],
    heartRate: 72,
    respirationRate: 16,
    alarmEnabled: true,
    alarmActive: false,
    alarmThresholds: { ...DEFAULT_THRESHOLDS },
    alarmLog: [],
    connectionStatus: 'disconnected',
    simulationMode: true,
    voiceListening: false,
    lastVoiceCommand: '',
    lastVoiceAction: '',
    voiceLanguage: 'zh-CN',
    activeTab: 'control',
    settingsOpen: false,
  };
}

export const useBedStore = create<BedState & BedActions>((set, get) => ({
  ...getInitialState(),

  moveUp: () => {
    const { movingDirection } = get();
    if (movingDirection !== 'up') {
      set({ movingDirection: 'up' });
    }
  },

  moveDown: () => {
    const { movingDirection } = get();
    if (movingDirection !== 'down') {
      set({ movingDirection: 'down' });
    }
  },

  stopMovement: () => {
    set({ movingDirection: 'stop' });
  },

  emergencyStop: () => {
    set({
      movingDirection: 'stop',
      alarmActive: true,
    });
    const { alarmLog } = get();
    const event = {
      id: Date.now().toString(),
      timestamp: Date.now(),
      type: 'emergency_stop',
      message: '紧急停止已触发',
      value: 0,
      threshold: 0,
    };
    set({ alarmLog: [event, ...alarmLog].slice(0, 50) });
  },

  setSpeed: (speed: number) => {
    set({ movingSpeed: Math.max(1, Math.min(5, speed)) });
  },

  setHeightTarget: (height: number) => {
    set({ bedHeightTarget: Math.max(30, Math.min(80, height)) });
  },

  updateSensorData: (data: SensorData) => {
    const state = get();
    const newPoint = {
      time: Date.now(),
      value: data.pressurePoints.reduce((a, b) => a + b, 0) / data.pressurePoints.length,
    };
    const pressureHistory = [...state.pressureHistory, newPoint].slice(-PRESSURE_HISTORY_MAX);

    set({
      backAngle: data.backAngle,
      legAngle: data.legAngle,
      bedHeight: data.bedHeight,
      pressurePoints: data.pressurePoints,
      pressureHistory,
      heartRate: data.heartRate,
      respirationRate: data.respirationRate,
      detectedPosition: data.detectedPosition,
    });
  },

  toggleAlarm: () => {
    set(s => ({ alarmEnabled: !s.alarmEnabled, alarmActive: false }));
  },

  setAlarmThreshold: (key: keyof AlarmThresholds, value: number) => {
    set(s => ({ alarmThresholds: { ...s.alarmThresholds, [key]: value } }));
  },

  dismissAlarm: () => {
    set({ alarmActive: false });
  },

  setConnectionStatus: (status: ConnectionStatus) => {
    set({ connectionStatus: status });
  },

  setVoiceListening: (listening: boolean) => {
    set({ voiceListening: listening });
  },

  setVoiceResult: (command: string, action: string) => {
    set({ lastVoiceCommand: command, lastVoiceAction: action });
  },

  setVoiceLanguage: (lang: VoiceLanguage) => {
    set({ voiceLanguage: lang });
  },

  setActiveTab: (tab: ActiveTab) => {
    set({ activeTab: tab });
  },

  toggleSettings: () => {
    set(s => ({ settingsOpen: !s.settingsOpen }));
  },

  resetState: () => {
    set(getInitialState());
  },
}));
