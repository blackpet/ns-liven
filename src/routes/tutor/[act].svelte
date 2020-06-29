<script context="module">
  import LivenService from '../../service/liven-service'

  export async function preload({params, query}, session) {
    // Action Data 조회하자!
    const data = await LivenService.retrieveActionData(params.act, session.course, query.id)

    return {act: params.act, data}
  }
</script>

<script>
  export let act, data

  import {stores, goto} from '@sapper/app'
  import {ROLE, EVENT} from '../../service/liven-service'
  import {listenOnTutor} from '../../service/tutor-service'
  import {action, LivenSocket} from '../../store/action'

  const {session} = stores()

  let componentAct = act

  // [제출하기]btn 제어용 / 학생전용
  const submitStatus = {
    can: false,
    show: false
  }

  // store action
  $action[act] = data

  // [출제하기]btn real-time Live.N 시작!
  function start(e) {
    const socket = LivenSocket.get()

    // send action data to server
    socket.emit(EVENT.TUTOR_START_LIVEN, {act, data})

    // 결과 페이지로 화면 전환하자!
    componentAct = `${act}-result`
  }

</script>

<div class="container">
  <section class="content">
    <div class="contBox_NLive">

      <svelte:component this="{LivenService.actionComponent(componentAct)}"
                        data={$action[act]} role="{ROLE.TUTOR}" {act} {submitStatus}
                        on:submit={start} />

    </div>
  </section>
</div>

