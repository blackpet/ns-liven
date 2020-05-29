// import './realtime-survey.scss';

import io from 'socket.io-client';
import * as _ from 'lodash';

let socket;

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

// public API
const LivenSurvey = {
  // 설문 조회
  serveSurvey: () => {
    return fetch('tutor/survey-items.json').then((res) => {
      if (res.ok) {
        const data = res.json();
        console.log('serveSurvey', data);
        return data;
      }
      return null; // error
    });
  },

  // 실시간 설문 서버 접속
  connectServer: (userId) => {
    socket = io(`//localhost:4004?userId=${userId}`);
    console.log(`[client] ${userId} connected!!`, socket);
    listenOnServer();

    return socket;
  },

  // 설문 시작 (request to server for broadcast survey)
  startSurvey: (survey) => {
    console.log("socket.emit('startSurvey')", survey);
    socket.emit('startSurvey', survey);
  },

  // 설문 출력 (설문모드 | 결과모드)
  renderSurvey: (el, data) => {
    const mode = data.mode === 'vote' ? 'vote' : 'result';
    const tmplHtml = mode === 'result' ? surveyResultTmpl : surveyVoteTmpl;
    // const tmpl = $.templates(tmplHtml);
    // $(el).html(tmpl.render(data));
  },

  // 투표!
  vote: (voteId) => {
    socket.emit('vote', voteId);
  },
};

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


export default LivenSurvey;

