<script context="module">
  import {ROLE} from '../../service/liven-service'
  import db from '../../service/firebase-data'

  export async function preload({query}, session) {
    // 이미 session 생성 이후이면 초기화 할 필요 없다!
    if (session.userId) {
      return;
    }
    // TODO blackpet: set {namespace, userId} to session
    const ns = session.ns = query.ns
    const seq = query.seq
    session.userId = query.userId
    session.role = ROLE.TUTOR

    // TODO blackpet: DB Select~!
    let course = await db.getCourseInfo(ns, seq)
    console.log('tutor/index', course)
    if (!course) {
      course = {
        subjCd: 'ON1234',
        subjSeq: '12',
        type: '집합교육',
        title: '없는 과정이네요? 걱정마세요. 제가 임의로 생성해 줄게요~',
        cnt: '10',
        start: '2020.01.04',
        end: '2020.01.07'
      }
    }
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

<h1>Tutor (index)</h1>

<List />
