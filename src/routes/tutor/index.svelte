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
    session.role = ROLE.TUTOR

    const course = await LivenService.retrieveSubjSummaryInfo(query.ns, query.seq)

    session.course = course
  }
</script>

<script>

  import {stores} from '@sapper/app'
  import LivenService from '../../service/liven-service'
  import {LivenSocket} from '../../store/action'

  import List from '../../components/List.svelte'

  const {session} = stores()

  // 최초 접속, socket 연결이 안되어 있는 경우만 연결하자!
  if (!LivenSocket.get()) {
    // connect to node server
    const socket = LivenService.connectServer($session.ns, $session.userId, ROLE.TUTOR);

    // store socket
    LivenSocket.set(socket)
  }

</script>

<svelte:head>
  <title>Live.N</title>
</svelte:head>

<List />
