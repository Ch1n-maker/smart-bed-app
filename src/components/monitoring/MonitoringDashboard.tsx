import { useBedStore } from '../../store/useBedStore';
import { AngleGauge } from './AngleGauge';
import { HeightDisplay } from './HeightDisplay';
import { PressureChart } from './PressureChart';
import { VitalSignsCard } from './VitalSignsCard';
import { BedStatusCard } from './BedStatusCard';

export function MonitoringDashboard() {
  return (
    <div className="space-y-4 slide-up">
      <div className="grid grid-cols-2 gap-3">
        <AngleGauge label="背部角度" angle={useBedStore(s => s.backAngle)} maxAngle={85} />
        <AngleGauge label="腿部角度" angle={useBedStore(s => s.legAngle)} maxAngle={45} />
      </div>
      <HeightDisplay />
      <div className="grid grid-cols-2 gap-3">
        <VitalSignsCard type="heart" />
        <VitalSignsCard type="respiration" />
      </div>
      <PressureChart />
      <BedStatusCard />
    </div>
  );
}
