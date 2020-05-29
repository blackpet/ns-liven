import {EVENT} from './liven-service';
import Storage from '../routes/student/student-store';

/**
 *  student Service
 */
export function listenOnServer(socket) {
  console.log('student > listenOnServer');

  // standby for start
  socket.on(EVENT.STUDENT_START_LIVEN, res => {
    Storage.set(res.type, res.data);

    location.href = `student/${res.type}`;
  });
}
