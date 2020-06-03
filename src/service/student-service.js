import {EVENT} from './liven-service';

/**
 *  student Service
 */
export function listenOnStudent() {
  console.log('student > listenOnServer', EVENT);

}

// [student] submit quiz/poll/survey data!
export function submitQuiz(data) {
  console.log('service > studentSubmit', data)

  // TODO blackpet: DB에 저장하자!
}
