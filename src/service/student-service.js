import {EVENT} from './liven-service';
import LivenStorage from '../store/liven-store';
import {goto} from '@sapper/app';

/**
 *  student Service
 */
export function listenOnServer(socket) {
  console.log('student > listenOnServer');

  // standby for start
  socket.on(EVENT.STUDENT_START_LIVEN, res => {
    LivenStorage.set(res.type, res.data);

    goto(`student/${res.type}`)
  });
}
