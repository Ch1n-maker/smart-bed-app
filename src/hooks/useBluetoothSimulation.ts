import { useEffect, useRef } from 'react';
import { useBedStore } from '../store/useBedStore';
import { BluetoothSimulator } from '../simulation/BluetoothSimulator';

export function useBluetoothSimulation() {
  const btRef = useRef<BluetoothSimulator | null>(null);

  useEffect(() => {
    const bt = new BluetoothSimulator();
    btRef.current = bt;
    bt.connect((status) => {
      useBedStore.getState().setConnectionStatus(status);
    });
    return () => {
      bt.disconnect(() => {});
    };
  }, []);

  return btRef;
}
