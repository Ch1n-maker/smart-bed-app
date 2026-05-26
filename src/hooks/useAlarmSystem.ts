import { useEffect, useRef } from 'react';
import { useBedStore } from '../store/useBedStore';

export function useAlarmSystem() {
  const lastCheckRef = useRef(0);

  useEffect(() => {
    const unsub = useBedStore.subscribe((state) => {
      if (!state.alarmEnabled) return;

      const now = Date.now();
      if (now - lastCheckRef.current < 1000) return; // Check max once per second
      lastCheckRef.current = now;

      const { alarmThresholds: t, pressurePoints, heartRate, backAngle } = state;

      const avgPressure = pressurePoints.reduce((a, b) => a + b, 0) / pressurePoints.length;

      let triggeredType = '';
      let triggeredValue = 0;
      let triggeredThreshold = 0;

      if (avgPressure > t.maxPressure) {
        triggeredType = 'high_pressure';
        triggeredValue = avgPressure;
        triggeredThreshold = t.maxPressure;
      } else if (heartRate < t.minHeartRate) {
        triggeredType = 'low_heart_rate';
        triggeredValue = heartRate;
        triggeredThreshold = t.minHeartRate;
      } else if (heartRate > t.maxHeartRate) {
        triggeredType = 'high_heart_rate';
        triggeredValue = heartRate;
        triggeredThreshold = t.maxHeartRate;
      } else if (backAngle > t.maxBackAngle) {
        triggeredType = 'excessive_angle';
        triggeredValue = backAngle;
        triggeredThreshold = t.maxBackAngle;
      }

      if (triggeredType) {
        const store = useBedStore.getState();
        const messageMap: Record<string, string> = {
          high_pressure: `压力过高: ${avgPressure.toFixed(1)} kPa (阈值: ${t.maxPressure} kPa)`,
          low_heart_rate: `心率过低: ${Math.round(heartRate)} bpm (阈值: ${t.minHeartRate} bpm)`,
          high_heart_rate: `心率过高: ${Math.round(heartRate)} bpm (阈值: ${t.maxHeartRate} bpm)`,
          excessive_angle: `角度过大: ${backAngle.toFixed(1)}° (阈值: ${t.maxBackAngle}°)`,
        };

        const event = {
          id: Date.now().toString(),
          timestamp: Date.now(),
          type: triggeredType,
          message: messageMap[triggeredType],
          value: triggeredValue,
          threshold: triggeredThreshold,
        };

        useBedStore.setState({
          alarmActive: true,
          alarmLog: [event, ...store.alarmLog].slice(0, 50),
        });
      }
    });

    return unsub;
  }, []);
}
