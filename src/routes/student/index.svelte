<script context="module">
  export function preload({query}, session) {
    // TODO blackpet: set {namespace, userId} to session
    session.ns = !!query.ns ? query.ns : 'ON1234';
    session.userId = !!query.userId ? query.userId : 'user01';
  }
</script>

<script>
  import {onMount} from 'svelte'
  import {stores} from '@sapper/app'
  import LivenService, {ROLE, EVENT} from '../../service/liven-service'
  import {listenOnStudent} from '../../service/student-service'
  import {action} from '../../store/action'

  const {session} = stores()
  let socket;

  onMount(() => {
    socket = LivenService.connectServer($session.ns, $session.userId, ROLE.STUDENT)
    console.log($session)

    listenOnStudent(socket, $action)
  });


</script>

<div class="container">
  <section class="content">

    <div class="contBox_NLive">

      <div class="cb_inner">

        <span class="txt_s18cDGray_ready">강사의 요청을 기다려 주세요.</span>
        <div class="nl_loading_w">
          <div class="nl_progress">
            <span class="txt_s18cWhite">대기중</span>
          </div>
          <i class="nlp_circle_01"></i>
          <i class="nlp_circle_02"></i>
        </div>
      </div>
    </div>

  </section>

</div>
