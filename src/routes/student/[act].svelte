<script context="module">
  export function preload({params}) {
    console.log('student [act]', params)
    return {act: params.act};
  }
</script>

<script>
  export let act;

  import {ROLE} from '../../service/liven-service'
  import LivenService from '../../service/liven-service'
  import {action, LivenSocket} from '../../store/action'

  import Standby from '../../components/Standby'

  let componentAct = act
  let standbyMessage

  // [제출하기]btn 제어용 / 학생전용
  const submitStatus = {
    can: false,
    show: true
  }

  // 공유받은 데이터가 없으면 대기모드다!
  if ($action[act] === undefined) {
    componentAct = 'standby';
  }

  function standby(e) {
    // Quiz: [student] 제출 후에는 [tutor]의 "결과 공유하기"를 대기하자!
    standbyMessage = {
      message: '답안이 정상적으로 제출됐습니다.<br>집계하는 동안 잠시만 기다려 주세요.',
      label: '집계중'
    }
    // 대기 화면으로 전환!
    componentAct = 'standby'
  }

  // [tutor] quiz 결과 보러가자!
  function share() {
    componentAct = 'quiz-result'
  }

</script>

<h1>Student: {act}</h1>

{#if componentAct === 'standby'}
  <Standby {...standbyMessage}/>
{:else}
  <svelte:component this="{LivenService.actionComponent(componentAct)}"
                    data={$action[act]} role="{ROLE.STUDENT}" {act} {submitStatus}
                    on:standby={standby} on:share={share}/>
{/if}
