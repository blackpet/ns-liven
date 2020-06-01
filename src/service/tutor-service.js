import {EVENT} from './liven-service';
import LivenStorage from '../store/liven-store';

/**
 *  tutor Service
 */
export function listenOnServer(socket) {
  console.log('tutor > listenOnServer');

  // standby for start
  // tutor-service.js
  socket.on(EVENT.STUDENT_START_LIVEN, res => {
    LivenStorage.set(res.type, res.data);

    location.href = `student/${res.type}`;
  });
}
