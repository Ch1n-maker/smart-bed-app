import { useEffect, useRef } from 'react';
import { useBedStore } from '../store/useBedStore';
import { SimulationEngine } from '../simulation/SimulationEngine';
import { SIMULATION_INTERVAL_MS } from '../utils/constants';

export function useBedSimulation() {
  const engineRef = useRef<SimulationEngine | null>(null);

  useEffect(() => {
    const engine = new SimulationEngine();
    engineRef.current = engine;

    engine.start((data) => {
      useBedStore.getState().updateSensorData(data);
    }, SIMULATION_INTERVAL_MS);

    return () => {
      engine.stop();
    };
  }, []);

  // Sync store movement commands to engine
  useEffect(() => {
    const unsub = useBedStore.subscribe((state) => {
      const engine = engineRef.current;
      if (!engine) return;
      engine.setMovement(state.movingDirection, state.movingSpeed);
      engine.setTargetHeight(state.bedHeightTarget);
    });
    return unsub;
  }, []);

  return engineRef;
}
