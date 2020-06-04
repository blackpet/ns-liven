<script context="module">
  import {ROLE} from '../../service/liven-service'

  export function preload({query}, session) {
    // TODO blackpet: set {namespace, userId} to session
    session.ns = !!query.ns ? query.ns : 'ON1234'
    session.userId = !!query.userId ? query.userId : 'tutor01'
    session.role = ROLE.TUTOR

    // TODO blackpet: DB Select~!
    session.course = {
      subjCd: 'ON1234',
      seqCd: '12',
      type: '집합교육',
      title: '누구나~! 따라하면 유통이 원활해지는 핵공감 유통 마스터 과정',
      cnt: 10,
      start: '2020.01.04',
      end: '2020.01.07'
    }
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
