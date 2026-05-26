export function formatAngle(angle: number): string {
  return `${angle.toFixed(1)}°`;
}

export function formatHeight(height: number): string {
  return `${height.toFixed(1)} cm`;
}

export function formatHeartRate(bpm: number): string {
  return `${Math.round(bpm)} bpm`;
}

export function formatRespiration(rate: number): string {
  return `${rate.toFixed(1)} /min`;
}

export function formatTimestamp(ts: number): string {
  const d = new Date(ts);
  return d.toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
}

export function formatPressure(value: number): string {
  return `${value.toFixed(1)} kPa`;
}
