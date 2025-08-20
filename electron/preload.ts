import { contextBridge, ipcRenderer } from 'electron';

contextBridge.exposeInMainWorld('bridge', {
  ping: (msg: string) => ipcRenderer.invoke('ping', msg)
});

// Optionally, type declarations for the window object:
declare global {
  interface Window {
    bridge: {
      ping: (msg: string) => Promise<string>;
    };
  }
}
