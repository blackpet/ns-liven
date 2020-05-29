import polka from 'polka'
import http from 'http'
import io from 'socket.io'
import _ from 'lodash'

const { PORT = 4040 } = process.env;

const server = http.createServer();

polka({server})
  .listen(PORT, err => {
    if (err) throw err;

    console.log(`> Running on localhost:${PORT}`);
  });


/**
 * socket.io configuration
 */

let users = {}
let survey


const sio = io(server)

// middleware
sio.use((socket, next) => {
  let userId = socket.handshake.query.userId;
  if (!userId) {
    return next(new Error('Not Authorized'))
  }

  users[userId] = socket.id
  console.log(users)

  return next()
});


sio.on('connection', (socket) => {
  console.log('a user connected', socket.id);

  // [student] 수강생의 접속을 알리자!
  sio.sockets.emit('broadcast.connectUser', findUserIdBySocketId(socket.id));

  // 접속한 수강생에게 설문을 전송하자!
  sio.to(socket.id).emit('broadcast.startSurvey', survey);

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
    sio.sockets.emit('broadcast.updateVote', survey.surveyItems, voteItem);
  });
});

// events....
const evt = {
  disconnectUser: (socketId) => {
    const userId = findUserIdBySocketId(socketId);
    delete users[userId];

    sio.sockets.emit('broadcast.disconnectUser', userId);
  }
};

function findUserIdBySocketId(socketId) {
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


