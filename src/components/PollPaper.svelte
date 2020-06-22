<script>
  export let data, role, act

  import {createEventDispatcher} from 'svelte'
  import {fly} from 'svelte/transition'
  import {stores} from '@sapper/app'
  import {ROLE, EVENT} from '../service/liven-service'
  import PollService from '../service/poll-service'
  import {action, LivenSocket} from '../store/action'

  import Quiz from './Quiz.svelte'
  import QuizResult from './QuizResult.svelte'

  const {session} = stores()
  const dispatch = createEventDispatcher()
  const socket = LivenSocket.get()

  let componentAct = act
  let idx = 0
  let direction = 1

  let answers = []

  // [제출하기]btn 제어용 / 학생전용
  const submitStatus = {
    can: false,
    show: true
  }


  // [이전]btn
  function prev(e) {
    if (idx > 0) {
      --idx
      direction = -1
    }
  }

  // [다음]btn
  function next(e) {
    if (idx < data.length) {
      ++idx;
      direction = 1
    }
  }

  function checkAnswer(e) {
    // 정답을 저장하자!
    data[idx].myAnswer = parseInt(e.detail.itemId)
  }

  // 모든 답을 입력했니?
  $: allAnswers = () => {
    console.log('allAnswers', data.filter(d => !!d.myAnswer).length, data.length)
    return data.filter(d => !!d.myAnswer).length === data.length
  }

  // [tutor] Live.N 시작!
  function start() {
    dispatch('submit')

    // 결과 페이지로 화면 전환하자!
    componentAct = `${act}-result`
    idx = 0 // 결과 페이지는 1번 문항부터 보여주자~

    // listen!
    socket.on(EVENT.STUDENT_SUBMIT_POLL, actData => {
      $action[actData.act] = actData.data
    })
  }

  // [tutor] [종료하기]
  function end() {
    socket.emit(EVENT.TUTOR_END_LIVEN, act)
  }

  // [student] [제출하기]
  function submit() {
    const {subjCd, subjSeq} = $session.course
    const {userId, comp} = $session

    const allAnswers = data.map(p => {
      return {
        subjCd, subjSeq, userId, comp,
        pageId: p.pageId,
        pollId: p.id,
        myAnswer: p.myAnswer
      }
    })

    console.log('allAnswers', allAnswers)

    // DB에 저장하자!
    PollService.submitPollAnswer(allAnswers);

    // listen! (제출 후 결과화면부터 실시간 반영을 시작하자!)
    socket.on(EVENT.STUDENT_SUBMIT_POLL, actData => {
      $action[actData.act] = actData.data
    })

    // submit
    socket.emit(EVENT.STUDENT_SUBMIT_POLL, allAnswers)

    // 결과화면으로 이동!
    componentAct = 'poll-result'
    idx = 0 // 결과 페이지는 1번 문항부터 보여주자~
  }

  //////////////////////////////////////// listen socket

  // [종료하기] 시작 페이지로 이동하자!
  socket.on(EVENT.TUTOR_END_LIVEN, (act) => {
    // 데이터 제거하자!
    $action[act] = {}

    location.replace(`/${$session.role}`)
  });

</script>


<ul>
  {#each data as poll, i (poll.id)}
    {#if idx === i}
      <li in:fly={{ x: direction * 300, duration: 500 }}>

        {#if componentAct === 'poll-result'}
          <QuizResult data="{poll}" role="{$session.role}" {act}/>
        {:else}
          <Quiz data={poll} role="{$session.role}" {act} {submitStatus}
                on:submit={start} on:checkAnswer={checkAnswer}/>
        {/if}

      </li>
    {/if}
  {/each}
</ul>

{#if componentAct === 'poll'}
  <!-- poll paper -->
  {#if role === ROLE.TUTOR}
    <!-- tutor only -->
    <div class="items_btn_single">
      <button type="button" class="btn_brownh50" on:click={start}>
        <span class="txt_s18">출제하기</span>
      </button>
    </div>

  {:else}
    <!-- student only -->
    <div class="items_btn_single">
      <button type="button" class="btn_brownh50" on:click={submit} disabled="{!allAnswers()}">
        <span class="txt_s18">제출하기</span>
      </button>
    </div>
  {/if}

{:else}
  <!-- poll-result paper -->
  {#if role === ROLE.TUTOR}
    <!-- tutor only -->
    <div class="items_btn_single">
      <button type="button" class="btn_brownh50" on:click={end}>
        <span class="txt_s18">종료하기</span>
      </button>
    </div>
  {/if}
{/if}

<ul class="items_btn_double">
  <li class="item_list">
    <button type="button" class="btn_lineGrayh50" on:click={prev} disabled="{idx === 0}">
      <span class="txt_s16">이전</span>
    </button>
  </li>
  <li class="item_list">
    <button type="button" class="btn_grayh50" on:click={next} disabled="{idx === (data.length-1)}">
      <span class="txt_s16">다음</span>
    </button>
  </li>
</ul>

<style>
  .items_btn_single {
    margin-bottom: 20px;
  }
</style>
