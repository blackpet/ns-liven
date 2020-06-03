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

  // action data를 실시간 갱신하자!
  function refresh(e) {
    const actData = e.detail.actData
    $action[actData.act] = actData.data

    console.log('student refresh', $action)
  }

  // Quiz: [student] 제출 후에는 [tutor]의 "결과 공유하기"를 대기하자!
  const standbyMessage = {
    message: '답안이 정상적으로 제출됐습니다.<br>집계하는 동안 잠시만 기다려 주세요.',
    label: '집계중'
  }
  function standby(e) {
    // 대기 화면으로 전환!
    componentAct = 'standby'
  }

  // [tutor] quiz 결과 보러가자!
  function share() {
    componentAct = 'quiz-result'
  }

</script>

<h1>Student Action</h1>

{#if componentAct === 'standby'}
  <Standby {...standbyMessage}/>
{:else}
  <svelte:component this="{LivenService.actionComponent(componentAct)}"
                    data={$action[act]} role="{ROLE.STUDENT}"
                    on:refresh={refresh} on:standby={standby} on:share={share}/>
{/if}
