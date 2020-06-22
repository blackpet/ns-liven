<script context="module">
  import {ROLE} from '../../service/liven-service'

  export async function preload({query}, session) {
    // 이미 session 생성 이후이면 초기화 할 필요 없다!
    if (session.userId && session.course.subjCd) {
      return;
    }

    session.ns = query.ns
    session.seq = query.seq
    session.userId = query.userId
    session.comp = query.comp
    session.role = ROLE.STUDENT

    const course = await LivenService.retrieveSubjSummaryInfo(query.ns, query.seq)

    session.course = course
  }
</script>

<script>

  import {stores, goto} from '@sapper/app'
  import LivenService, {EVENT} from '../../service/liven-service'
  import {LivenSocket} from '../../store/action'
  import {action} from '../../store/action'

  import List from '../../components/List.svelte'

  const {session} = stores()

  // 최초 접속, socket 연결이 안되어 있는 경우만 연결하자!
  if (!LivenSocket.get()) {
    // connect to node server
    const socket = LivenService.connectServer($session.ns, $session.userId, ROLE.STUDENT)

    // store socket
    LivenSocket.set(socket)

    // standby for [tutor] start
    socket.on(EVENT.TUTOR_START_LIVEN, data => {
      console.log(`student on ${EVENT.TUTOR_START_LIVEN}`, data, $action);
      // store action data
      $action[data.act] = data.data

      goto(`student/${data.act}`, { replaceState: true })
    })
  }

</script>

<svelte:head>
  <title>Live.N</title>
</svelte:head>

<List />
