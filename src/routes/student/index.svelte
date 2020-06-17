<script context="module">
  import {ROLE} from '../../service/liven-service'

  export function preload({query}, session) {
    // TODO blackpet: set {namespace, userId} to session
    session.ns = !!query.ns ? query.ns : 'ON1234'
    session.userId = !!query.userId ? query.userId : 'user01'
    session.role = ROLE.STUDENT

    // TODO blackpet: DB Select~!
    session.course = {
      subjCd: session.ns,
      seqCd: '12',
      type: '집합교육',
      title: `[${query.ns}] [${query.userId}]누구나~! 따라하면 유통이 원활해지는 핵공감 유통 마스터 과정`,
      cnt: 10,
      start: '2020.01.04',
      end: '2020.01.07'
    }
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

      console.log('goto > replaceState: true!!')
      goto(`student/${data.act}`, { replaceState: true })
    })
  }

</script>

<svelte:head>
  <title>Live.N</title>
</svelte:head>

<h1>Student (index)</h1>

<List />
