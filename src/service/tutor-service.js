import {EVENT} from './liven-service';

/**
 *  tutor Service
 */
export function listenOnTutor(socket) {
  console.log('tutor > listenOnServer');

  // 학습자 접속
  socket.on(EVENT.EVERYONE_CONNECT, userId => {
    console.log(EVENT.EVERYONE_CONNECT, userId)
  });

  // 학습자 접속 종료
  socket.on(EVENT.EVERYONE_DISCONNECT, userId => {
    console.log(EVENT.EVERYONE_DISCONNECT, userId)
  });
}
