import {EVENT} from './liven-service';
import {goto} from '@sapper/app';

/**
 *  student Service
 */
export function listenOnStudent(socket, action) {
  console.log('student > listenOnServer', EVENT);

  // standby for start
  socket.on(EVENT.TUTOR_START_LIVEN, data => {
    console.log(`student on ${EVENT.TUTOR_START_LIVEN}`, data, action);
    // store action data
    action[data.act] = data.data

    goto(`student/${data.act}`)
  });

}
