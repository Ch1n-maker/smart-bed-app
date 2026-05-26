export type MovingDirection = 'up' | 'down' | 'stop';
export type DetectedPosition = 'lying_flat' | 'sitting' | 'fowlers' | 'trendelenburg' | 'unknown';
export type ConnectionStatus = 'connected' | 'connecting' | 'disconnected';
export type VoiceLanguage = 'zh-CN' | 'en-US';
export type ActiveTab = 'control' | 'monitor' | 'alarm' | 'voice';

export interface AlarmThresholds {
  maxPressure: number;
  minHeartRate: number;
  maxHeartRate: number;
  maxBackAngle: number;
}

export interface AlarmEvent {
  id: string;
  timestamp: number;
  type: string;
  message: string;
  value: number;
  threshold: number;
}

export interface SensorData {
  backAngle: number;
  legAngle: number;
  bedHeight: number;
  pressurePoints: number[];
  heartRate: number;
  respirationRate: number;
  detectedPosition: DetectedPosition;
}

export interface BedState {
  // Movement
  backAngle: number;
  legAngle: number;
  bedHeight: number;
  bedHeightTarget: number;
  movingDirection: MovingDirection;
  movingSpeed: number;

  // Position
  detectedPosition: DetectedPosition;

  // Monitoring
  pressurePoints: number[];
  pressureHistory: { time: number; value: number }[];
  heartRate: number;
  respirationRate: number;

  // Alarm
  alarmEnabled: boolean;
  alarmActive: boolean;
  alarmThresholds: AlarmThresholds;
  alarmLog: AlarmEvent[];

  // Connection
  connectionStatus: ConnectionStatus;
  simulationMode: boolean;

  // Voice
  voiceListening: boolean;
  lastVoiceCommand: string;
  lastVoiceAction: string;
  voiceLanguage: VoiceLanguage;

  // UI
  activeTab: ActiveTab;
  settingsOpen: boolean;
}

export interface BedActions {
  moveUp: () => void;
  moveDown: () => void;
  stopMovement: () => void;
  emergencyStop: () => void;
  setSpeed: (speed: number) => void;
  setHeightTarget: (height: number) => void;
  updateSensorData: (data: SensorData) => void;
  toggleAlarm: () => void;
  setAlarmThreshold: (key: keyof AlarmThresholds, value: number) => void;
  dismissAlarm: () => void;
  setConnectionStatus: (status: ConnectionStatus) => void;
  setVoiceListening: (listening: boolean) => void;
  setVoiceResult: (command: string, action: string) => void;
  setVoiceLanguage: (lang: VoiceLanguage) => void;
  setActiveTab: (tab: ActiveTab) => void;
  toggleSettings: () => void;
  resetState: () => void;
}

export interface ParsedCommand {
  action: string;
  params: Record<string, string>;
}
