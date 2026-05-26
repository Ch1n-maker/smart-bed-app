import type { ConnectionStatus } from '../store/types';

export type ConnectionCallback = (status: ConnectionStatus) => void;

export class BluetoothSimulator {
  private connected = false;

  connect(callback: ConnectionCallback): void {
    callback('connecting');
    setTimeout(() => {
      this.connected = true;
      callback('connected');
    }, 1500);
  }

  disconnect(callback: ConnectionCallback): void {
    this.connected = false;
    callback('disconnected');
  }

  isConnected(): boolean {
    return this.connected;
  }
}
