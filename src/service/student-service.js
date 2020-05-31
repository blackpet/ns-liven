import {EVENT} from './liven-service';
import Storage from '../liven-store';
import {goto} from '@sapper/app';

/**
 *  student Service
 */
export function listenOnServer(socket) {
  console.log('student > listenOnServer');

  // standby for start
  socket.on(EVENT.STUDENT_START_LIVEN, res => {
    Storage.set(res.type, res.data);

    goto(`student/${res.type}`)
  });
}
