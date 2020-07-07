<script context="module">
  import LivenService from '../../service/liven-service'

  export async function preload({params, query}, session) {
    let data = null
    console.log('quizForm preload', query.id)
    if (query.id) {
      // Action Data 조회하자!
      data = await LivenService.retrieveActionData('quiz', session.course, query.id);
    }

    return {act: 'quiz', data}
  }
</script>

<script>


  export let act, data

  import {goto} from '@sapper/app'
  import Quiz from "../../components/Quiz.svelte";
  import Standby from '../../components/Standby.svelte'
  import {EVENT} from '../../service/liven-service'
  import {LivenSocket} from '../../store/action'

  const socket = LivenSocket.get()
  // listen on 다음 문제
  socket.on(EVENT.TUTOR_NEXT_QUIZ, async nextId => {
    await goto(`student/quizForm?id=${nextId}`)
  });
  // listen on 퀴즈 종료


  let standbyMessage = {
    message: '강사의 진행을 기다리고 있습니다.',
    label: '대기중'
  }

  function submit(e) {
    // Quiz: [student] 제출 후에는 [tutor]의 "결과 공유하기"를 대기하자!
    standbyMessage = {
      message: '답안이 정상적으로 제출됐습니다.<br>강사의 다음 진행을 기다리고 있습니다.<br>잠시만 기다려 주세요.',
      label: '집계중'
    }
    data = null
    // 제출용 대기 화면으로 전환!
    // componentAct = 'submit'
    // console.log('standby after submit', componentAct)
  }

  // [tutor] quiz 결과 보러가자!
  function share() {
    // componentAct = 'quiz-result'
  }
</script>


<div class="container">
  <section class="content">
    <div class="contBox_NLive">

      {#if !data}
        <Standby {...standbyMessage} />
      {:else}
        <Quiz {act} {data} on:submit={submit} />
      {/if}

    </div>
  </section>
</div>

