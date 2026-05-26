import { DirectionPad } from './DirectionPad';
import { StopButton } from './StopButton';
import { SpeedSlider } from './SpeedSlider';
import { HeightControl } from './HeightControl';

export function BedControlPanel() {
  return (
    <div className="space-y-4 slide-up">
      <DirectionPad />
      <StopButton />
      <div className="grid grid-cols-2 gap-3">
        <SpeedSlider />
        <HeightControl />
      </div>
    </div>
  );
}
