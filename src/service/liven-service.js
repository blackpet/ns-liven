// import './realtime-survey.scss';

import io from 'socket.io-client';
import * as _ from 'lodash';

// 투표모드 template
const surveyVoteTmpl = `
  <form name="surveyFrm">
    <ol>
      {{for surveyItems}}
      <li id="survey{{:id}}">
        <span><input type="radio" name="surveyId" id="surveyItem{{:id}}" value="{{:id}}"></span>
        <label for="surveyItem{{:id}}">{{>subject}}</label> (<span class="vote-count">{{:vote}}</span>)
      </li>
      {{/for}}
    </ol>
  </form>
`;
// 결과모드 template
const surveyResultTmpl = `
  <ol>
    {{for surveyItems}}
    <li id="survey{{:id}}">
      <label for="survey{{:id}}">{{>subject}}</label>
      <div class="graph"><div style="width:{{:vote*10}}%">&nbsp;<span class="vote-count">0</span></div></div>
    </li>
    {{/for}}
  </ol>
`;

let socket;
const role = {
  'ROLE_STUDENT': 'student',
  'ROLE_TUTOR': 'tutor'
}

function createService() {

  // Live.N 서버 접속
  const connectServer = (namespace, userId, role) => {
    socket = io(`/liven-${namespace}?userId=${userId}`);
    console.log(`[client] ${userId} connected!!`, socket);
    listenOnServer();

    return socket;
  };

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
  const startSurvey = (survey) => {
    console.log("tutor > socket.emit('startSurvey')", survey);
    socket.emit(EVENT.STUDENT_START_LIVEN, survey);
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
    serveSurvey,
    startSurvey,
    renderSurvey,
    vote,
    role
  }
}

// listen on server
function listenOnServer() {
  console.log('listenOnServer >> common');

  // 투표결과 갱신
  socket.on('broadcast.updateVote', (items, voteItem) => {
    console.log(voteItem);

    // 투표 총 합계를 구하자!
    var total = _.map(items, 'vote').reduce((sum, cur) => sum + cur);
    console.log('total', total);

    // 전체 투표수를 백분율로 width를 표시하자!
    items.map((item) => {
      const percent = item.vote / (total || 1) * 100;
      // $(`#survey${item.id} .graph div`).css('width', `${percent}%`);
      // $(`#survey${item.id} .vote-count`).text(item.vote);
    });

    // $(`#survey${voteItem.id} .graph div`).css('width', `${voteItem.vote*10}%`);
  });
}

const LivenService = new createService();
export default LivenService;

export const EVENT = {
  'STUDENT_START_LIVEN': 'student:start-liven'
};
