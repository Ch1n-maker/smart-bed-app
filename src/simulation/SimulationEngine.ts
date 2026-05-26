import type { SensorData, DetectedPosition, MovingDirection } from '../store/types';
import { defaultParams } from './defaultParams';
import {
  BACK_ANGLE_MIN, BACK_ANGLE_MAX, LEG_ANGLE_MIN, LEG_ANGLE_MAX,
  BED_HEIGHT_MIN, BED_HEIGHT_MAX,
} from '../utils/constants';

export type SensorCallback = (data: SensorData) => void;

export class SimulationEngine {
  private intervalId: number | null = null;
  private callback: SensorCallback | null = null;
  private startTime = 0;

  backAngle = 0;
  legAngle = 0;
  bedHeight = 50;
  bedHeightTarget = 50;
  movingDirection: MovingDirection = 'stop';
  movingSpeed = 2;

  private pressureBase = [...defaultParams.initialPressureBase];
  private heartRate = defaultParams.initialHeartRate;
  private respirationRate = defaultParams.initialRespirationRate;

  start(callback: SensorCallback, intervalMs = 200): void {
    this.callback = callback;
    this.startTime = performance.now();
    this.intervalId = window.setInterval(() => this.tick(), intervalMs);
  }

  stop(): void {
    if (this.intervalId !== null) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }

  setMovement(direction: MovingDirection, speed: number): void {
    this.movingDirection = direction;
    this.movingSpeed = speed;
  }

  setTargetHeight(height: number): void {
    this.bedHeightTarget = height;
  }

  private noise(amplitude: number): number {
    return (Math.random() - 0.5) * 2 * amplitude;
  }

  private clamp(value: number, min: number, max: number): number {
    return Math.max(min, Math.min(max, value));
  }

  private tick(): void {
    const elapsed = (performance.now() - this.startTime) / 1000;

    // Update back angle based on movement direction
    if (this.movingDirection === 'up') {
      this.backAngle += (defaultParams.angleStepPerTick * this.movingSpeed) + this.noise(defaultParams.angleNoise);
    } else if (this.movingDirection === 'down') {
      this.backAngle -= (defaultParams.angleStepPerTick * this.movingSpeed) + this.noise(defaultParams.angleNoise);
    }
    this.backAngle = this.clamp(this.backAngle, BACK_ANGLE_MIN, BACK_ANGLE_MAX);

    // Leg angle follows back angle slightly
    if (this.backAngle > 20) {
      const targetLeg = (this.backAngle - 20) * 0.6;
      this.legAngle += (targetLeg - this.legAngle) * 0.1 + this.noise(0.1);
    } else {
      this.legAngle += (0 - this.legAngle) * 0.1 + this.noise(0.05);
    }
    this.legAngle = this.clamp(this.legAngle, LEG_ANGLE_MIN, LEG_ANGLE_MAX);

    // Update bed height toward target
    const heightDiff = this.bedHeightTarget - this.bedHeight;
    if (Math.abs(heightDiff) > 0.1) {
      this.bedHeight += Math.sign(heightDiff) * defaultParams.heightStepPerTick * this.movingSpeed + this.noise(0.1);
      this.bedHeight = this.clamp(this.bedHeight, BED_HEIGHT_MIN, BED_HEIGHT_MAX);
    }

    // Update pressure points based on angles
    this.pressureBase = defaultParams.initialPressureBase.map((base, i) => {
      const backFactor = this.backAngle / BACK_ANGLE_MAX;
      const legFactor = this.legAngle / LEG_ANGLE_MAX;
      // Upper body sensors (0-2) increase with back angle, lower (3-5) increase with leg angle
      const factor = i < 3 ? backFactor * 15 : legFactor * 10;
      return base + factor + this.noise(defaultParams.pressureNoise);
    });

    // Heart rate with slow sinusoidal variation
    this.heartRate = defaultParams.initialHeartRate
      + Math.sin(elapsed / defaultParams.heartRateVariationPeriod * Math.PI * 2) * defaultParams.heartRateVariationAmplitude
      + this.noise(1);

    // Respiration rate
    this.respirationRate = defaultParams.initialRespirationRate
      + Math.sin(elapsed / defaultParams.respirationVariationPeriod * Math.PI * 2) * defaultParams.respirationVariationAmplitude
      + this.noise(0.3);

    // Position detection
    const detectedPosition = this.detectPosition();

    if (this.callback) {
      this.callback({
        backAngle: Math.round(this.backAngle * 10) / 10,
        legAngle: Math.round(this.legAngle * 10) / 10,
        bedHeight: Math.round(this.bedHeight * 10) / 10,
        pressurePoints: this.pressureBase.map(p => Math.round(p * 10) / 10),
        heartRate: Math.round(this.heartRate * 10) / 10,
        respirationRate: Math.round(this.respirationRate * 10) / 10,
        detectedPosition,
      });
    }
  }

  private detectPosition(): DetectedPosition {
    if (this.backAngle < -5) return 'trendelenburg';
    if (this.backAngle >= 45 && this.legAngle >= 20) return 'fowlers';
    if (this.backAngle >= 30) return 'sitting';
    if (this.backAngle < 10 && this.legAngle < 10) return 'lying_flat';
    return 'unknown';
  }
}
