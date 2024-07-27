// import { io } from 'socket.io-client';
//
// export const socket = io(import.meta.env.VITE_BACKEND_URL, {
//   autoConnect: false,
//   withCredentials: true
// });
import { io } from 'socket.io-client';

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
// console.log("Backend URL:", BACKEND_URL); // Debug log

export const socket = io(BACKEND_URL, {
  autoConnect: true, // Change this to true
  withCredentials: true,
  transports: ['websocket', 'polling'] // Explicitly set transports
});

socket.on('connection', () => {
  console.log('Socket connected!');
});

socket.on('connect_error', (error) => {
  console.error('Connection error:', error);
});
