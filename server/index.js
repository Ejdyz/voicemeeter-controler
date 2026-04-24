import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import { VBANServer, VBANTEXTPacket, EFormatBit, ETextEncoding } from 'vban';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(cors());

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST']
  }
});

const VOICEMEETER_IP = process.env.VOICEMEETER_IP || '127.0.0.1';
const VBAN_PORT = parseInt(process.env.VOICEMEETER_VBAN_PORT || '6980');

// Initialize VBAN Server
const vbanServer = new VBANServer();

vbanServer.on('error', (err) => {
  console.error(`VBAN server error:\n${err.stack}`);
});

vbanServer.on('listening', () => {
  console.log(`VBAN UDP Protocol sender active!`);
  console.log(`Targeting VoiceMeeter at ${VOICEMEETER_IP}:${VBAN_PORT} [Stream: Command1]`);
});

vbanServer.bind(); // bind UDP socket

function sendVoiceMeeterCommand(script) {
  try {
    const textPacket = new VBANTEXTPacket(
      {
        streamName: 'Command1',
        formatBit: EFormatBit.VBAN_DATATYPE_BYTE8,
        streamType: ETextEncoding.VBAN_TXT_ASCII
      },
      script
    );
    vbanServer.send(textPacket, VBAN_PORT, VOICEMEETER_IP);
    console.log(`Sent VBAN UDP Command -> ${script}`);
  } catch (err) {
    console.error('Failed to send VBAN packet:', err);
  }
}

io.on('connection', (socket) => {
  console.log('A client connected via WebSocket:', socket.id);

  socket.on('getSettings', () => {
    // VBAN is one-way (Push). Bi-directional sync requires RTIA stream setup.
    // For now we rely on the state persisted in the frontend's localStorage and broadcast updates!
    socket.emit('vbanMode', { active: true });
  });

  socket.on('setParameter', (data) => {
    try {
      const { parameter, value } = data;

      if (parameter === 'Command.Restart') {
        sendVoiceMeeterCommand('Command.Restart=1;');
      } else {
        let floatValue = typeof value === 'boolean' ? (value ? 1.0 : 0.0) : Number(value);
        if (isNaN(floatValue) || !isFinite(floatValue)) floatValue = 0.0;
        
        sendVoiceMeeterCommand(`${parameter}=${floatValue};`);
      }
      
      // Broadcast change to all other matching UI clients so they move perfectly in sync!
      socket.broadcast.emit('parameterChanged', data);
    } catch (e) {
      console.error('Error handling parameter socket event:', e);
    }
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected:', socket.id);
  });
});

const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
  console.log(`Voicemeeter Node Backend running on http://localhost:${PORT}`);
});
