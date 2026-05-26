export const BACK_ANGLE_MIN = 0;
export const BACK_ANGLE_MAX = 85;
export const LEG_ANGLE_MIN = 0;
export const LEG_ANGLE_MAX = 45;
export const BED_HEIGHT_MIN = 30;
export const BED_HEIGHT_MAX = 80;
export const SPEED_MIN = 1;
export const SPEED_MAX = 5;

export const SIMULATION_INTERVAL_MS = 200;

export const PRESSURE_SENSOR_COUNT = 6;

export const DEFAULT_THRESHOLDS = {
  maxPressure: 60,
  minHeartRate: 50,
  maxHeartRate: 120,
  maxBackAngle: 85,
};

export const PRESSURE_HISTORY_MAX = 150; // 30 seconds at 5Hz

export const POSITION_RULES = {
  lyingFlat: { maxBackAngle: 10, maxLegAngle: 10 },
  sitting: { minBackAngle: 30, maxLegAngle: 15 },
  fowlers: { minBackAngle: 45, minLegAngle: 0 },
  trendelenburg: { maxBackAngle: -5 },
};

export const ALARM_AUTO_DISMISS_MS = 30000;
