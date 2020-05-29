import _ from "lodash";
import {EVENT} from '../service/liven-service';

let users = {}
let survey
let namespaces = [];
let io;

function createLivenServer(server) {

  const listenOnNsp = (socket) => {
    console.log(`a user connected on namespace ${socket.nsp.name} (socket.id: ${socket.id}`);
    const ns = socket.nsp.name.replace(/^\/liven-/, '');
    console.log(`real namespace ${ns}`);

    // TODO blackpet: 과정별 listen 설정할 것!
    // [student] 수강생의 접속을 알리자!
    socket.nsp.emit('broadcast.connectUser', findUserIdBySocketId(socket.client.id));

    socket.on(EVENT.STUDENT_START_LIVEN, (survey) => {
      console.log(`${EVENT.STUDENT_START_LIVEN}`, survey);
      socket.nsp.emit(EVENT.STUDENT_START_LIVEN, survey);
    });
  }

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


  io = require('socket.io')(server);

  /**
   * namespace!!!!!!!!!
   */
  // listen on /liven-{namespace}
  const nsp = io.of(/^\/liven-.*$/).on('connection', listenOnNsp);


  // middleware
  io.use(middlewareDefault);

  // listen on globally
  io.on('connection', listenOnDefault);

  return io;
}

export default createLivenServer;




// events....
const evt = {
  disconnectUser: (socketId) => {
    const userId = findUserIdBySocketId(socketId);
    delete users[userId];

    io.sockets.emit('broadcast.disconnectUser', userId);
  }
};

function findUserIdBySocketId(socketId) {
  console.log('1111111111111111111111111111111111111111');
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

