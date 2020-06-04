import _ from "lodash";
import {EVENT} from '../service/liven-service';
import ServerStorage from './server-store'

let users = {}
let survey
let io;

let namespaceStorage

/**
 * TODO blackpet:
 * 1. namespace 에 마지막 접속자가 접속이 끊기면 자료구조에서 삭제하자!
 *
 */

function createLivenServer(server) {

  // socket listening for namespace [subject]
  const listenOnNsp = (socket) => {
    console.log(`a user connected on [namespace: ${socket.nsp.name}] (socket.id: ${socket.id}`)
    const ns = ServerStorage.parseNamespace(socket.nsp)
    console.log(`real namespace ${ns}`)

    // [student] broadcast active data to all student (강사가 시작 후 접속한 수강생이 있으면 즉시 시작하자!)
    const data = ServerStorage.activeActionData(ns)
    if (!!data) {
      socket.nsp.emit(EVENT.TUTOR_START_LIVEN, data)
    }

    ////////////////////////////////////////////// listen

    // [tutor] Live.N 공유 시작!
    socket.on(EVENT.TUTOR_START_LIVEN, data => {
      console.log(EVENT.TUTOR_START_LIVEN, data);

      // generate namespace data structure
      ServerStorage.namespace(ns, data)

      socket.nsp.emit(EVENT.TUTOR_START_LIVEN, data);
    })

    // [student] submit quiz/poll/survey
    socket.on(EVENT.STUDENT_SUBMIT_QUIZ, userData => {
      console.log(EVENT.STUDENT_SUBMIT_QUIZ, ns, userData)

      /**
       * Action Data
       * @full {act, data}
       * @data [...quiz] or {quiz}
       * @quiz {id, subject, items[]}
       * @items {id, subject, vote, answer?}
       */
      const act = ServerStorage.activeActionData(ns)
      let actData
      if (act.data.length && act.data.length > 1) {
        actData = act.data.find(d => d.id == userData.actId);
      } else {
        actData = act.data;
      }
      const item = actData.items.find(i => i.id == userData.itemId)
      item.vote++

      // ns의 모든 사용자(강사, 학습자)에 broadcast!!
      socket.nsp.emit(EVENT.STUDENT_SUBMIT_QUIZ, act)
    });

    // [tutor] "결과 공유하기"
    socket.on(EVENT.TUTOR_SHARE_RESULT, () => {
      // ns의 모든 사용자(강사, 학습자)에 broadcast!!
      socket.nsp.emit(EVENT.TUTOR_SHARE_RESULT, ServerStorage.activeActionData(ns))
    });

    // [tutor] "종료하기"
    socket.on(EVENT.TUTOR_END_LIVEN, () => {
      // ns의 모든 사용자(강사, 학습자)에 broadcast!!
      socket.nsp.emit(EVENT.TUTOR_END_LIVEN)
    });

    ////////////////////////////////////////////// end of listen
  }

  const middlewareNs = (socket, next) => {
    const {userId, role} = socket.handshake.query
    const ns = ServerStorage.parseNamespace(socket.nsp)

    return next()
  }

  // global socket listening
  const listenOnDefault = (socket) => {
    console.log('a user connected', socket.id, socket.nsp.name);


    // 접속한 수강생에게 설문을 전송하자!
    // socket.server.to(socket.id).emit('broadcast.startSurvey', survey);

    socket.on('disconnect', () => {
      console.log('user disconnected', socket.id);

      // disconnect user
      evt.disconnectUser(socket.id);
    });

    // [tutor] 모든 수강생에 설문 시작 알림
    socket.on('startSurvey', (_survey) => {
      console.log('startSurvey1231231231');
      survey = _survey;
      // start survey by tutor, broadcast to all students
      survey.user = 'student';

      // [tutor]를 제외한 모든 수강생만 대상이다! (cf: sio.sockets.emit() )
      socket.broadcast.emit('broadcast.startSurvey', survey);
    });

    socket.on('vote', (voteId) => {
      console.log(`${findUserIdBySocketId(socket.id)} vote: ${voteId}`);

      const voteItem = surveyService.increaseVoteCount(voteId);

      // 투표 결과를 위해 다시 설문 데이터를 내려주자!
      io.sockets.emit('broadcast.updateVote', survey.surveyItems, voteItem);
    });
  };

  const middlewareDefault = (socket, next) => {
    let userId = socket.handshake.query.userId;
    console.log('io.use', socket.id, socket.nsp.name, `userId: ${userId}`);
    if (!userId) {
      return next(new Error('Not Authorized'))
    }

    users[userId] = socket.id
    console.log(users)

    return next()
  };


  ///////////////////// initialize socket.io /////////////////////////
  io = require('socket.io')(server);

  /**
   * namespace!!!!!!!!!
   */
  // listen on /liven-{namespace}
  const nsp = io.of(/^\/liven-.*$/).on('connection', listenOnNsp);
  // namespace middleware
  nsp.use(middlewareNs);


  // listen on globally
  io.on('connection', listenOnDefault);
  // default middleware
  io.use(middlewareDefault);

  return io;
}

export default createLivenServer;




// events....
const evt = {
  disconnectUser: (socketId) => {
    const userId = findUserIdBySocketId(socketId);
    delete users[userId];

    io.sockets.emit(EVENT.EVERYONE_DISCONNECT, userId);
  }
};

// [{userId: socketId}] 구조를 뒤집자! -> [{socketId: userId}]
function findUserIdBySocketId(socketId) {
  console.log(users, socketId);
  return _.invert(users)[socketId];
}

const surveyService = {
  increaseVoteCount: (voteId) => {
    const item = _.find(survey.surveyItems, {id: parseInt(voteId)});
    ++item.vote;
    console.log(survey);

    return item;
  },

  decreaseVoteCount: (voteId) => {
    const item = _.find(survey.surveyItems, {id: voteId});
    ++item.vote;

    return item;
  }
};

