<script context="module">
  export function preload({params}) {
    console.log('student [act]', params)
    return {act: params.act};
  }
</script>

<script>
  export let act;

  import {goto, stores} from '@sapper/app'
  import {beforeUpdate} from 'svelte'
  import LivenService, {ROLE} from '../../service/liven-service'
  import {action, LivenSocket} from '../../store/action'

  import Standby from '../../components/Standby.svelte'

  const {session} = stores()

  let componentAct = act
  let standbyMessage

  beforeUpdate(() => {
    // 공유받은 데이터가 있으면 시작하자!
    if (componentAct === 'standby' && $action[act] !== undefined) {
      componentAct = act
    }
    console.log('beforeUpdate', componentAct)
  });

  // [제출하기]btn 제어용 / 학생전용
  const submitStatus = {
    can: false,
    show: true
  }

  console.log(act, $action)
  // 공유받은 데이터가 없으면 대기모드다!
  if ($action[act] === undefined) {
    componentAct = 'standby';
  }

  function submit(e) {
    // Quiz: [student] 제출 후에는 [tutor]의 "결과 공유하기"를 대기하자!
    standbyMessage = {
      message: '답안이 정상적으로 제출됐습니다.<br>집계하는 동안 잠시만 기다려 주세요.',
      label: '집계중'
    }
    // 제출용 대기 화면으로 전환!
    componentAct = 'submit'
    console.log('standby after submit', componentAct)
  }

  // [tutor] quiz 결과 보러가자!
  function share() {
    componentAct = 'quiz-result'
  }

</script>

{#if componentAct === 'standby' || componentAct === 'submit'}
  <Standby {...standbyMessage}/>

{:else if componentAct !== 'standby'}
  <div class="container">
    <section class="content">
      <div class="contBox_NLive">

        <svelte:component this="{LivenService.actionComponent(componentAct)}"
                          data={$action[act]} role="{ROLE.STUDENT}" {act} {submitStatus}
                          on:submit={submit} on:share={share} />

      </div>
    </section>
  </div>

{/if}
