<script context="module">
  export async function preload({params, query}) {
    // TODO blackpet: 실서버에 연결할 것! ?id=query.id
    const api = '//localhost:4004'
    let data;

    // Action Data 조회하자!
    const res = await this.fetch(`${api}/${params.act}`)
    if (res.ok) {
      data = await res.json();
    } else {
      data = [];
    }

    return {act: params.act, data};
  }
</script>

<script>
  export let act, data;

  import {stores} from '@sapper/app'
  import LivenService, {ROLE, EVENT} from '../../service/liven-service'
  import {listenOnTutor} from '../../service/tutor-service'
  import {action} from '../../store/action'

  const {session} = stores()

  // [출제하기]btn real-time Live.N 시작!
  function start(e) {
    const socket = LivenService.connectServer($session.ns, $session.userId, ROLE.TUTOR)

    // store action
    $action[e.detail.act] = data

    console.log('tutor start', $action)

    // send action data to server
    socket.emit(EVENT.TUTOR_START_LIVEN, {
      act: e.detail.act,
      data: data
    })

    listenOnTutor(socket)

    // 결과 페이지로 화면 전환하자!
    act = 'quiz-result'
  }

</script>

<h1>Tutor : {act}</h1>

<svelte:component this="{LivenService.actionComponent(act)}" {data} role="{ROLE.TUTOR}" on:start={start} />

