import io from 'socket.io-client';
import * as _ from 'lodash';
import {goto} from '@sapper/app'
import {env} from '../env'
import * as util from './utils'

/**** action components ****/
import Quiz from '../components/Quiz.svelte'
import QuizResult from '../components/QuizResult.svelte'
import PollPaper from '../components/PollPaper.svelte'

const acts = [
  {act: 'quiz', component: Quiz},
  {act: 'quiz-result', component: QuizResult},
  {act: 'poll', component: PollPaper},
  {act: 'poll-result', component: PollPaper},
]

let socket;

function createService() {

  // Live.N 서버 접속
  const connectServer = (namespace, userId, role) => {
    socket = io(`/liven-${namespace}?userId=${userId}&role=${role}`);
    listenOnEveryone();

    return socket;
  };

  // action 에 맞는 Component 를 가져오자!
  const actionComponent = (act) => {
    return (acts.find(c => c.act === act)).component;
  }


  ///////////////////////////////// Live.N 데이터 조회 (from nsedu)
  // TODO blackpet: 실 서버에 연결할 것!

  // 과정 정보 조회
  const retrieveSubjSummaryInfo = async (ns, seq) => {
    let data = {}
    const query = util.objectToQuerystring({ns, seq})

    try {
      const url = `${env.api}/subjSummaryInfo.do${query}`
      const param = {
        mode: 'cors'
      }
      const res = await fetch(url, param)
      if (res.ok) {
        data = await res.json()
      }
    } catch (e) {
      console.error('retrieveSubjSummaryInfo error occur!')
    }
    console.log('retrieveSubjSummaryInfo', data)

    return data
  };


  // Action data 조회
  const retrieveActionData = async (act, course, id) => {
    const {subjCd, subjSeq} = course
    let data = []
    const query = util.objectToQuerystring({subjCd, subjSeq, id})

    try {
      const res = await fetch(`${env.api}/${act}.do${query}`)
      if (res.ok) {
        data = await res.json()
      }
    } catch (e) {
      console.error('retrieveActionData error occur!')
    }

    return data
  }


  // Q&A 목록 조회
  const retrieveQnaList = async (course) => {
    const {subjCd, subjSeq} = course
    let data = []

    try {
      const res = await fetch(`${env.api}/qna`)
      if (res.ok) {
        data = await res.json()
      }
    } catch (e) {
      console.error('retrieveQnaList error occur!')
    }

    return data
  };



  return {
    connectServer,
    actionComponent,

    retrieveActionData,
    retrieveQnaList,
    retrieveSubjSummaryInfo,
  }
}

// listen on server
function listenOnEveryone() {
  // TODO blackpet: 공통으로 Listen 할게 있으면 요기요기~
}


const LivenService = new createService();
export default LivenService;

// 목록으로 가기
export async function goList(role) {
  return await goto(role)
}

// Event Type
export const EVENT = {
  'EVERYONE_CONNECT': 'everyone:connect',
  'EVERYONE_DISCONNECT': 'everyone:disconnect',
  'TUTOR_START_LIVEN': 'tutor:start-liven',
  'TUTOR_SHARE_RESULT': 'tutor:show-result', // 결과 공유하기
  'TUTOR_END_LIVEN': 'tutor:end-liven', // 종료하기
  'STUDENT_SUBMIT_QUIZ': 'student:submit-quiz', // quiz [제출하기]
  'STUDENT_SUBMIT_POLL': 'student:submit-poll', // poll [제출하기]

  'TUTOR_NAVIGATE_SHARE': 'tutor:navigate-share', // share [페이지 이동]
};

// User Role
export const ROLE = {
  'STUDENT': 'student',
  'TUTOR': 'tutor'
}
