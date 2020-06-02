import {EVENT} from './liven-service';
import {goto} from '@sapper/app';

/**
 *  student Service
 */
let _socket
let _$action

export function listenOnStudent(socket, action) {
  _socket = socket;
  _$action = action;

  console.log('student > listenOnServer', EVENT);

  // standby for start
  _socket.on(EVENT.TUTOR_START_LIVEN, data => {
    console.log(`student on ${EVENT.TUTOR_START_LIVEN}`, data, _$action);
    // store action data
    _$action[data.act] = data.data

    goto(`student/${data.act}`)
  });

  // [student] submit quiz/poll/survey data!
  _socket.on(EVENT.STUDENT_SUBMIT_QUIZ, (actData) => {
    console.log(EVENT.STUDENT_SUBMIT_QUIZ, actData)

    _$action[actData.act] = actData.data
  })

}

// [student] submit quiz/poll/survey data!
export function submitQuiz(actId, itemId) {
  console.log('service > studentSubmit', actId, itemId)

  // TODO blackpet: DB에 저장하자!

  _socket.emit(EVENT.STUDENT_SUBMIT_QUIZ, {actId, itemId});
}
