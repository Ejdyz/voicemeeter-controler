import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { io, Socket } from 'socket.io-client';

interface VoiceMeeterState {
  targetIp: string;
  isConnected: boolean;
  socket: Socket | null;
  
  // App state
  parameters: Record<string, number>;
  
  setTargetIp: (ip: string) => void;
  connect: () => void;
  disconnect: () => void;
  
  setParameter: (paramName: string, value: number) => void;
  receiveParameter: (paramName: string, value: number) => void;
}

export const useVoicemeeterStore = create<VoiceMeeterState>()(
  persist(
    (set, get) => ({
      targetIp: '127.0.0.1:3001',
      isConnected: false,
      socket: null,
      parameters: {},

      setTargetIp: (ip) => {
        set({ targetIp: ip });
        // Automatically reconnect if requested
        get().disconnect();
        get().connect();
      },

      connect: () => {
        const { targetIp, socket: currentSocket } = get();
        if (currentSocket) return; // already connecting/connected

        const url = targetIp.startsWith('http') ? targetIp : `http://${targetIp}`;
        console.log('Connecting to VoiceMeeter Backend at:', url);
        
        const socket = io(url, {
          reconnection: true,
          reconnectionAttempts: Infinity,
          reconnectionDelay: 1000,
        });

        socket.on('connect', () => {
          console.log('Socket connected');
          set({ isConnected: true });
        });

        socket.on('disconnect', () => {
          console.log('Socket disconnected');
          set({ isConnected: false });
        });

        socket.on('parameterChanged', (data: { parameter: string, value: number }) => {
          get().receiveParameter(data.parameter, data.value);
        });

        set({ socket });
      },

      disconnect: () => {
        const { socket } = get();
        if (socket) {
          socket.disconnect();
          set({ socket: null, isConnected: false });
        }
      },

      setParameter: (paramName, value) => {
        const { socket } = get();
        
        // Optimistically update local state
        set((state) => ({
          parameters: {
            ...state.parameters,
            [paramName]: value,
          }
        }));

        if (socket && get().isConnected) {
          socket.emit('setParameter', { parameter: paramName, value });
        }
      },

      receiveParameter: (paramName, value) => {
        set((state) => ({
          parameters: {
            ...state.parameters,
            [paramName]: value,
          }
        }));
      }
    }),
    {
      name: 'voicemeeter-config',
      partialize: (state) => ({ targetIp: state.targetIp, parameters: state.parameters }), // Save IP and UI state locally
    }
  )
);
