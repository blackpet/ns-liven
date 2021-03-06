import io from 'socket.io-client';
import * as _ from 'lodash';
import {goto} from '@sapper/app'

/**** action components ****/
import Quiz from '../components/Quiz.svelte'
import QuizResult from '../components/QuizResult.svelte'
import PollList from '../components/PollList.svelte'

const acts = [
  {act: 'quiz', component: Quiz},
  {act: 'quiz-result', component: QuizResult},
  {act: 'poll', component: PollList},
  {act: 'poll-result', component: PollList},
]

let socket;

function createService() {

  // Live.N 서버 접속
  const connectServer = (namespace, userId, role) => {
    socket = io(`/liven-${namespace}?userId=${userId}&role=${role}`);
    console.log(`[client] ${userId} (${role}) connected!!`, socket);
    listenOnEveryone();

    return socket;
  };

  // action 에 맞는 Component 를 가져오자!
  const actionComponent = (act) => {
    return (acts.find(c => c.act === act)).component;
  }





  ///////////////////////////////////////////////////////

  // 설문 조회
  const serveSurvey = () => {
    return fetch('tutor/survey-items.json').then((res) => {
      if (res.ok) {
        const data = res.json();
        console.log('serveSurvey', data);
        return data;
      }
      return null; // error
    });
  };

  // 설문 시작 (request to server for broadcast survey)
  const startSurvey = (type, data) => {
    console.log("tutor > socket.emit('startSurvey')", type, data);
    data.type = type;
    socket.emit(EVENT.STUDENT_START_LIVEN, data);
  };

  // 설문 출력 (설문모드 | 결과모드)
  const renderSurvey = (el, data) => {
    const mode = data.mode === 'vote' ? 'vote' : 'result';
    const tmplHtml = mode === 'result' ? surveyResultTmpl : surveyVoteTmpl;
    // const tmpl = $.templates(tmplHtml);
    // $(el).html(tmpl.render(data));
  }

  // 투표!
  const vote = (voteId) => {
    socket.emit('vote', voteId);
  };

  return {
    connectServer,
    actionComponent,



    serveSurvey,
    startSurvey,
    renderSurvey,
    vote
  }
}

// listen on server
function listenOnEveryone() {
  console.log('listenOnServer >> common');
}

const LivenService = new createService();
export default LivenService;

export function goList(role) {
  goto(role)
}

export const EVENT = {
  'EVERYONE_CONNECT': 'everyone:connect',
  'EVERYONE_DISCONNECT': 'everyone:disconnect',
  'TUTOR_START_LIVEN': 'tutor:start-liven',
  'TUTOR_SHARE_RESULT': 'tutor:show-result', // 결과 공유하기
  'TUTOR_END_LIVEN': 'tutor:end-liven', // 종료하기
  'STUDENT_SUBMIT_QUIZ': 'student:submit-quiz', // quiz [제출하기]
  'STUDENT_SUBMIT_POLL': 'student:submit-poll' // poll [제출하기]
};

export const ROLE = {
  'STUDENT': 'student',
  'TUTOR': 'tutor'
}
