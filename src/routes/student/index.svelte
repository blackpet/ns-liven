<script context="module">
  export function preload({query}, session) {
    // TODO blackpet: set {namespace, userId} to session
    session.ns = !!query.ns ? query.ns : 'ON1234';
    session.userId = !!query.userId ? query.userId : 'user01';
  }
</script>

<script>
  import {onMount} from 'svelte'
  import {goto, stores} from '@sapper/app'
  import LivenService, {ROLE, EVENT} from '../../service/liven-service'
  import LivenStorage from '../../store/liven-store'

  const {session} = stores()
  let socket;

  onMount(() => {
    socket = LivenService.connectServer($session.ns, $session.userId, ROLE.STUDENT)
    console.log($session)

    socket.on(EVENT.TUTOR_START_LIVEN, data => {
      console.log(`student on ${EVENT.TUTOR_START_LIVEN}`, data);
      // store action data
      LivenStorage.put(data.act, data.data)

      goto(`student/${data.act}`)
    });
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
