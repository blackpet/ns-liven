<script context="module">
  export function preload({query}, session) {
    // TODO blackpet: set {namespace, userId} to session
    session.ns = !!query.ns ? query.ns : 'ON1234';
    session.userId = !!query.userId ? query.userId : 'user01';
  }
</script>

<script>
  import {onMount} from 'svelte'
  import {stores, goto} from '@sapper/app'
  import LivenService, {ROLE, EVENT} from '../../service/liven-service'
  import {listenOnStudent} from '../../service/student-service'
  import {action, LivenSocket} from '../../store/action'

  import Standby from '../../components/Standby'

  const standbyMessage = {
    message: '강사의 요청을 기다려 주세요.',
    label: '대기중'
  }

  const {session} = stores()
  let socket;

  onMount(() => {
    socket = LivenService.connectServer($session.ns, $session.userId, ROLE.STUDENT)

    // store socket
    LivenSocket.set(socket)

    listenOnStudent(socket)

    // standby for [tutor] start
    socket.on(EVENT.TUTOR_START_LIVEN, data => {
      console.log(`student on ${EVENT.TUTOR_START_LIVEN}`, data, $action);
      // store action data
      $action[data.act] = data.data

      goto(`student/${data.act}`)
    })

  });


</script>

<Standby {...standbyMessage} />
